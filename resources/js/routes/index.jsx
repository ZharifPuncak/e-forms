import * as React from "react";
import GuestGuard from "./utils/guest-guard";

import { Page as NotFoundPage } from "@/pages/not-found";
import { route as authRoute } from "./auth";
import { route as dashboardRoute } from "./dashboard";

export const routes = [
	{
		path: '/',
		lazy: async () => {
					const { Page } = await import("@/pages/auth/sign-in");
					return { Component: (props) => <GuestGuard><Page {...props} /></GuestGuard> };
		},
	},
	{
		path: "errors",
		children: [
			{
				path: "internal-server-error",
				lazy: async () => {
					const { Page } = await import("@/pages/errors/internal-server-error");
					return { Component: Page };
				},
			},
			{
				path: "not-authorized",
				lazy: async () => {
					const { Page } = await import("@/pages/errors/not-authorized");
					return { Component: Page };
				},
			},
			{
				path: "not-found",
				lazy: async () => {
					const { Page } = await import("@/pages/errors/not-found");
					return { Component: Page };
				},
			},
		],
	},
	authRoute,
	dashboardRoute,
	{ path: "*", element: <NotFoundPage /> },
];
