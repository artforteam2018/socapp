const smsSendCode = (phone: string) => `sms_send_user_${phone}`;
const smsKeyCode = (phone: string) => `sms_key_user_${phone}`;

export {
  smsKeyCode,
  smsSendCode,
};
