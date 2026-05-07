import type { SmsSender, SendSmsResult } from "./types"

// 开发环境模拟短信发送
export class MockSmsSender implements SmsSender {
  async sendLoginCode(
    phone: string,
    code: string
  ): Promise<SendSmsResult> {
    const shouldLog =
      process.env.SMS_MOCK_LOG_CODE === "true"
    if (shouldLog) {
      // 仅在开发机终端可见；不要把 code 返回给前端生产环境
      console.info(`[SMS MOCK] phone=${phone} code=${code}`)
    }
    return { ok: true }
  }
}
