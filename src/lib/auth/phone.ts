/** 仅示例：中国大陆 11 位，1 开头 */
export function isCnMobile(phone: string): boolean {
  return /^1\d{10}$/.test(phone)
}

export function normalizePhone(input: string): string {
  return input.trim()
}
