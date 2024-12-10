declare module '#auth-utils' {
	interface User {
		discordId: string;
		token: string;
	}

	interface UserSession {
		// Add your own fields
	}

	interface SecureSessionData {}
}

export {};
