# Auth\.js v5（next\-auth@beta）API 速查表

**核心说明**：基于 next\-auth@beta（v5），适配 Next\.js 16 App Router \+ TS，重点标注高频用法、返回值和关键参数，冗余内容省略。

## 一、服务端 API（最常用）

适用场景：Server Component、Route Handler、Server Action、Middleware

### 1\. auth\(\) —— 万能会话查询（核心）

```typescript
import { auth } from "@/lib/auth"; // 自己配置导出的auth

// 用法
const session = await auth(); 
// 返回值：Promise<Session | null>
// 已登录：{ user: { id, name, email, ...自定义字段 }, expires: string }
// 未登录：null
```

**示例**：Server Component 中路由保护

```typescript
const session = await auth();
if (!session) redirect("/login");
```

### 2\. signIn\(\) —— 服务端触发登录

```typescript
import { signIn } from "@/lib/auth";

// 用法1：Credentials登录（手机号/验证码/密码）
await signIn("phone-code", { phone: "138xxxx8888", code: "123456" });

// 用法2：OAuth登录（github/google等）
await signIn("github");

// 关键参数（可选）
await signIn("phone-code", { phone, code }, { 
  redirect: true, // 是否自动跳转（默认true）
  callbackUrl: "/home" // 登录成功后跳转地址
});
```

### 3\. signOut\(\) —— 服务端触发登出

```typescript
import { signOut } from "@/lib/auth";

// 用法
await signOut({
  redirect: true,
  callbackUrl: "/login" // 登出后跳转地址
});
```

### 4\. handlers —— API 路由入口（必写）

```typescript
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
// 自动提供：/api/auth/signin、/api/auth/signout 等接口
```

## 二、客户端 API（Client Component）

前提：必须包裹在 \&lt;SessionProvider\&gt; 中（根布局配置）

### 1\. useSession\(\) —— 客户端查询会话（高频）

```typescript
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();
// data: Session | null（同服务端返回）
// status: "loading" | "authenticated" | "unauthenticated"
```

**示例**：判断登录状态

```typescript
if (status === "loading") return <div>加载中...</div>;
if (!session) return <div>请先登录</div>;
```

### 2\. signIn\(\) —— 客户端发起登录

```typescript
import { signIn } from "next-auth/react";

// 用法1：Credentials登录（手机号验证码，不自动跳转）
const result = await signIn("phone-code", { 
  phone: "138xxxx8888", 
  code: "123456" 
}, { redirect: false });

// 结果判断
if (result?.error) {
  alert("登录失败：" + result.error);
}
```

### 3\. signOut\(\) —— 客户端登出

```typescript
import { signOut } from "next-auth/react";

signOut({
  redirect: true,
  callbackUrl: "/login"
});
```

### 4\. getProviders\(\) —— 获取所有登录方式

```typescript
import { getProviders } from "next-auth/react";

const providers = await getProviders();
// 返回：{ 登录方式id: { id, name, type }, ... }
// 示例：{ "phone-code": { id: "phone-code", name: "Phone Code Login" } }
```

## 三、核心配置项（NextAuthConfig）

写在 lib/auth\.ts 中，关键配置必写，其余可选

```typescript
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  // 1. 登录策略（必写）
  providers: [
    Credentials({
      id: "phone-code", // 唯一标识（和signIn的第一个参数一致）
      name: "手机号验证码登录",
      credentials: { // 表单字段定义
        phone: { label: "手机号", type: "text" },
        code: { label: "验证码", type: "text" },
      },
      // 登录校验逻辑（核心）
      async authorize(credentials) {
        // 校验手机号、验证码，返回用户信息（成功）/ null（失败）
        return { id: "123", phone: credentials?.phone };
      }
    })
  ],

  // 2. 自定义页面（可选，推荐）
  pages: {
    signIn: "/login", // 自定义登录页，替代默认页
    error: "/auth/error" // 登录错误页
  },

  // 3. 会话配置（必写）
  session: {
    strategy: "jwt", // 无数据库用jwt（推荐），有数据库用database
    maxAge: 7 * 24 * 60 * 60, // 会话有效期（7天）
  },

  // 4. 钩子回调（高频，必学）
  callbacks: {
    // JWT 生成/更新时触发
    async jwt({ token, user }) {
      if (user) token.phone = user.phone; // 把自定义字段存入jwt
      return token;
    },
    // 会话生成时触发（把jwt数据映射到session）
    async session({ session, token }) {
      session.user.phone = token.phone as string;
      return session;
    }
  },

  // 5. 其他可选配置
  debug: process.env.NODE_ENV === "development", // 开发环境调试
  basePath: "/api/auth" // API前缀（默认，可修改）
} satisfies NextAuthConfig;
```

## 四、常用类型（TS 必备）

```typescript
import type {
  Session,        // 会话类型
  User,           // 用户类型
  Account,        // 第三方账号类型（OAuth用）
  NextAuthConfig, // 配置类型
  CredentialsConfig // Credentials策略类型
} from "next-auth";
```

## 五、内置 REST API（直接调用）

- **GET /api/auth/providers** —— 获取所有登录方式

- **POST /api/auth/signin/:provider** —— 发起登录（provider为登录方式id）

- **POST /api/auth/signout** —— 登出（参数：callbackUrl）

- **GET /api/auth/csrf** —— 获取CSRF token（防跨站请求）

## 六、高频备注（避坑）

- v5 核心变化：auth\(\) 取代 v4 的 getServerSession、getToken 等方法

- 客户端 signIn 用 redirect: false 时，需手动处理跳转和错误

- 自定义用户字段（如phone），必须通过 jwt \+ session 回调注入

- middleware 路由保护，直接导出 auth 即可（export \{ auth as middleware \}）

> （注：文档部分内容可能由 AI 生成）
