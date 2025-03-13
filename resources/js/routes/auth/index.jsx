import GuestGuard from "../utils/guest-guard";
export const route = {
	path: "auth",
	children: [
		{
			path: "reset-password",
			lazy: async () => {
				const { Page } = await import("@/pages/auth/reset-password");
				return { Component: (props) => <GuestGuard><Page {...props} /></GuestGuard> };
			},
		},
		{
			path: "sign-in",
			lazy: async () => {
				const { Page } = await import("@/pages/auth/sign-in");
				return { Component: (props) => <GuestGuard><Page {...props} /></GuestGuard> };
			},
		},
		
		{
			path: "update-password",
			lazy: async () => {
				const { Page } = await import("@/pages/auth/update-password");
				return { Component: (props) => <GuestGuard><Page {...props} /></GuestGuard> };
			},
		},
		{
			path: "verify-code",
			lazy: async () => {
				const { Page } = await import("@/pages/auth/verify-code");
				return { Component: (props) => <GuestGuard><Page {...props} /></GuestGuard> };
			},
		},
	],
};
