import type { SmsSender, SendSmsResult } from "./types"

/**
 * 生产环境在此调用具体厂商 HTTP/SDK。
 * 不同厂商参数不同，保持「对外只有 sendLoginCode」即可便于替换。
 */
export class RealSmsSender implements SmsSender {
  async sendLoginCode(
    phone: string,
    code: string
  ): Promise<SendSmsResult> {
    // TODO: 调用阿里云 / 腾讯云 / 创蓝 等
    void phone
    void code
    return {
      ok: false,
      message: "SMS provider not configured",
    }
  }
}
