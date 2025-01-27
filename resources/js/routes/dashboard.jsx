import * as React from "react";
import { Outlet } from "react-router-dom";

import { AuthGuard } from "./utils/auth-guard";
import { Layout as DashboardLayout } from "@/layout/layout";
import { Layout as SettingsLayout } from "@/layout/setting-layout";


export const route = {
	path: "dashboard",
	element: (
		<AuthGuard>
			<DashboardLayout>
				<Outlet />
			</DashboardLayout>
		</AuthGuard>
	),
	children: [
		{
			index: true,
			lazy: async () => {
				const { Page } = await import("@/pages/dashboard/overview");
				return { Component: Page };
			},
		},
		{
			path: "settings",
			element: (
				<SettingsLayout>
					<Outlet />
				</SettingsLayout>
			),
			children: [
				{
					path: "profile",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/profile");
						return { Component: Page };
					},
				},
				{
					path: "users",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/users");
						return { Component: Page };
					},
				},
				{
					path: "roles",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/roles");
						return { Component: Page };
					},
				},
				
			],
		},
	],
};
