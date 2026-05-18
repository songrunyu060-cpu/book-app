import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    phone?: string
  }

  interface Session {
    user: DefaultSession["user"] & {
      phone?: string
    }
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    phone?: string
  }
}
