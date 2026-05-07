type OtpRecord = {
  code: string
  expireAt: number
  attempts: number
}

const store = new Map<string, OtpRecord>()

const TTL_MS = 5 * 60 * 1000
const MAX_ATTEMPTS = 5

export function saveOtp(phone: string, code: string) {
  store.set(phone, {
    code,
    expireAt: Date.now() + TTL_MS,
    attempts: 0,
  })
}

export function verifyOtp(
  phone: string,
  code: string
): "ok" | "bad" | "expired" {
  const row = store.get(phone)
  if (!row) return "bad"

  if (Date.now() > row.expireAt) {
    store.delete(phone)
    return "expired"
  }

  if (row.attempts >= MAX_ATTEMPTS) {
    store.delete(phone)
    return "bad"
  }

  if (row.code !== code) {
    row.attempts += 1
    store.set(phone, row)
    return "bad"
  }

  store.delete(phone)
  return "ok"
}
