export function generateOtp() {
  return Math.random().toString(36).slice(-6);
}
