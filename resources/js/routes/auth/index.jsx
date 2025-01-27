
export const route = {
	path: "auth",
	children: [
		{
			path: "reset-password",
			lazy: async () => {
				const { Page } = await import("@/pages/auth/reset-password");
				return { Component: Page };
			},
		},
		{
			path: "sign-in",
			lazy: async () => {
				const { Page } = await import("@/pages/auth/sign-in");
				return { Component: Page };
			},
		},
		{
			path: "sign-up",
			lazy: async () => {
				const { Page } = await import("@/pages/auth/sign-up");
				return { Component: Page };
			},
		},
		{
			path: "update-password",
			lazy: async () => {
				const { Page } = await import("@/pages/auth/update-password");
				return { Component: Page };
			},
		},
		{
			path: "verify-code",
			lazy: async () => {
				const { Page } = await import("@/pages/auth/verify-code");
				return { Component: Page };
			},
		},
	],
};
