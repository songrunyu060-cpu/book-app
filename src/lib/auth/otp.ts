// 生成6位随机验证码
export function randomSixDigitCode(): string {
  // 000000 ~ 999999
  const n = Math.floor(Math.random() * 1_000_000)
  return n.toString().padStart(6, "0")
}
