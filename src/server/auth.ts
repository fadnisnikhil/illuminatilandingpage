import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "../../drizzle/schema";
import { and, eq } from "drizzle-orm";

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	trustHost: true,
	adapter: DrizzleAdapter(db),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				// Add your authentication logic here
				if (!credentials?.email || !credentials.password) return null;
				
				try {
					// In a real app, you would look up the user and verify password
					// Type safety: ensure email is string
					const email = String(credentials.email);
					
					// Use raw SQL query with prepared statement for maximum compatibility
					const result = await db
						.select()
						.from(users)
						.where(and(eq(users.email, email)));
					
					const user = result[0];
					
					// Return null if user not found
					if (!user) return null;
					
					// In a real app, you would verify the password here
					// For example: if (!await verifyPassword(user.password, credentials.password)) return null;
					
					return {
						id: user.id,
						name: user.name || null,
						email: user.email,
						image: user.image || null
					};
				} catch (error) {
					console.error("Auth error:", error);
					return null;
				}
			}
		})
	],
	session: {
		strategy: "jwt"
	},
	pages: {
		signIn: "/login"
	}
});