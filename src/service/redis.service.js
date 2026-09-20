const redis = require("../config/redis");
const crypto = require('crypto');
const {sendotpemail}=require("./otp.service")
const OTP_TTL = 300; 
const COOLDOWN_TTL = 60; 
const MAX_ATTEMPTS = 3;


async function sendOtp(userId) {
  const isCoolingDown = await redis.get(`cooldown:${userId}`);
  if (isCoolingDown) {
    const ttl = await redis.ttl(`cooldown:${userId}`);
    return { success: false, message: `Please wait ${ttl} seconds before requesting a new code.` };
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  await redis
    .pipeline()
    .set(`otp:${userId}`, otp, 'EX', OTP_TTL)
    .set(`cooldown:${userId}`, '1', 'EX', COOLDOWN_TTL)
    .set(`attempts:${userId}`, '0', 'EX', OTP_TTL)
    .exec();

  
  await sendotpemail(userId,otp)
  return { success: true,message: 'OTP sent successfully.' };
}

// --- 2. VERIFY OTP ---
async function verifyOtp(userId, inputOtp) {
  
const MAX_ATTEMPTS = 3;
  const storedOtp = await redis.get(`otp:${userId}`);
  if (!storedOtp) {
    return { success: false, message: 'OTP expired or not found.' };
  }
  if(storedOtp===inputOtp){
    await redis.del(
      `otp:${userId}`,
      `attempts:${userId}`
    )
  }

  // Check failed attempts limit
  const attempts = await redis.incr(`attempts:${userId}`);
  if (attempts > MAX_ATTEMPTS) {
    await redis.del(`otp:${userId}`, `attempts:${userId}`);
    return { success: false, message: 'Maximum attempts exceeded. Please request a new OTP.' };
  }
  
  // Check matching code
  if (storedOtp !== inputOtp) {
    const remaining = MAX_ATTEMPTS - attempts;
    return { success: false, message: `Incorrect OTP. ${remaining} attempt remaining.` };
  }
  await redis.set(`verified:${userId}`, 'true', 'EX', 600);
  // Success: Clean up keys
  await redis.del(`otp:${userId}`, `attempts:${userId}`);
  return { success: true, message: 'OTP verified successfully.' };
}

module.exports={sendOtp,verifyOtp}