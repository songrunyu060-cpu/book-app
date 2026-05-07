import { MockSmsSender } from "./mock-sms"
import { RealSmsSender } from "./real-sms"
import type { SmsSender } from "./types"

export function getSmsSender(): SmsSender {
  const provider = process.env.SMS_PROVIDER ?? "mock"
  if (provider === "mock") return new MockSmsSender()
  return new RealSmsSender()
}
