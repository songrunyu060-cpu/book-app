import type { Config } from "drizzle-kit"
import { readFileSync } from "node:fs"

// drizzle-kit 运行时不会自动读取 Next 的 .env.local，这里显式加载（不引入额外依赖）
function loadDotEnvLocal(path = ".env.local") {
	try {
		const content = readFileSync(path, "utf8")
		for (const rawLine of content.split(/\r?\n/)) {
			const line = rawLine.trim()
			if (!line || line.startsWith("#")) continue
			const eq = line.indexOf("=")
			if (eq === -1) continue
			const key = line.slice(0, eq).trim()
			let value = line.slice(eq + 1).trim()
			if (
				(value.startsWith("'") && value.endsWith("'")) ||
				(value.startsWith('"') && value.endsWith('"'))
			) {
				value = value.slice(1, -1)
			}
			if (key && process.env[key] === undefined) {
				process.env[key] = value
			}
		}
	} catch {
		// ignore if file doesn't exist
	}
}

loadDotEnvLocal()

export default {
	schema: "./src/schema",
	out: "./src/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	strict: true,
	verbose: true,
} satisfies Config
