type OtpRecord = {
  code: string
  expireAt: number
  attempts: number
}

const OTP_STORE_KEY = "__book_app_otp_store__" as const

function getStore(): Map<string, OtpRecord> {
  const g = globalThis as typeof globalThis & {
    [OTP_STORE_KEY]?: Map<string, OtpRecord>
  }
  if (!g[OTP_STORE_KEY]) g[OTP_STORE_KEY] = new Map()
  return g[OTP_STORE_KEY]
}

const TTL_MS = 5 * 60 * 1000
const MAX_ATTEMPTS = 5

export function saveOtp(phone: string, code: string) {
  getStore().set(phone, {
    code,
    expireAt: Date.now() + TTL_MS,
    attempts: 0,
  })
}

export function verifyOtp(
  phone: string,
  code: string
): "ok" | "bad" | "expired" {
  const row = getStore().get(phone)
  if (!row) return "bad"

  if (Date.now() > row.expireAt) {
    getStore().delete(phone)
    return "expired"
  }

  if (row.attempts >= MAX_ATTEMPTS) {
    getStore().delete(phone)
    return "bad"
  }

  if (row.code !== code) {
    row.attempts += 1
    getStore().set(phone, row)
    return "bad"
  }

  getStore().delete(phone)
  return "ok"
}
