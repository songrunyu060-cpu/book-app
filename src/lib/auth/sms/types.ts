export type SendSmsResult =
  | { ok: true }
  | { ok: false; message: string }

export interface SmsSender {
  sendLoginCode(
    phone: string,
    code: string
  ): Promise<SendSmsResult>
}
