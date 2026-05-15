"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const loginFormSchema = z.object({
  phone: z
    .string()
    .min(11, "请输入正确的手机号")
    .max(11, "请输入正确的手机号"),
  code: z
    .string()
    .min(6, "请输入正确的验证码")
    .max(6, "请输入正确的验证码"),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

// 登录页（只保留核心内容）
export default function LoginPage() {
  const [countdown, setCountdown] = useState(0)
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { phone: "", code: "" },
    mode: "onChange",
  })
  const { isSubmitting, isValid } = form.formState
  const phone = form.watch("phone")

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(
      () => setCountdown((c) => c - 1),
      1000
    )
    return () => clearTimeout(t)
  }, [countdown])

  const sendCode = () => {
    if (countdown > 0 || !phone) return
    setCountdown(60)
    // TODO: 调用发送验证码接口
  }

  const onSubmit = (_data: LoginFormValues) => {
    // TODO: 验证码登录接口
    void _data
  }
  return (
    <div className="relative rounded-3xl bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.35)] ring-1 ring-white/25 backdrop-blur-md sm:p-10">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
      <div className="relative mb-7">
        <h2 className="mb-4 font-semibold text-xl tracking-tight sm:text-3xl">
          密码登录
        </h2>
        <Form {...form}>
          <form className="space-y-4">
            {/* 手机号 */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>手机号</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={11}
                      placeholder="请输入手机号"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 验证码 */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>验证码</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        className="pe-28"
                        placeholder="请输入验证码"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="secondary"
                      className="absolute end-1 top-1/2 z-20 shrink-0 -translate-y-1/2 bg-transparent hover:bg-transparent hover:text-blue-500"
                      disabled={countdown > 0 || !phone}
                      onClick={sendCode}
                    >
                      {countdown > 0
                        ? `${countdown}s`
                        : "获取验证码"}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 独立按钮提交（重点） */}
            <Button
              className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600"
              disabled={!isValid || isSubmitting}
              onClick={() =>
                void form.handleSubmit(onSubmit)()
              }
            >
              {isSubmitting
                ? "提 交 中 …"
                : "登 录 / 注 册"}
            </Button>
          </form>
        </Form>
      </div>
      {/* 表单 */}
    </div>
  )
}
