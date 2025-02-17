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
			path: "forms",
			children: [
				{
					index: true,
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/forms/list");
						return { Component: Page };
					},
				},
				{
					path: "create",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/forms/create");
						return { Component: Page };
					},
				},
				{
					path: "details/:code",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/forms/details");
						return { Component: Page };
					},
				},
			],
		},
		{
			path: "staff",
			children: [
				{
					index: true,
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/staff/list");
						return { Component: Page };
					},
				},
				{
					path: "details/:code",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/staff/details");
						return { Component: Page };
					},
				},
				{
					path: "create",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/staff/create");
						return { Component: Page };
					},
				},
			],
		},
		{
			path: "acknowledgements",
			children: [
				{
					index: true,
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/acknowledgements/status");
						return { Component: Page };
					},
				},
				{
					path: "staff/details/:code",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/acknowledgements/staff-details");
						return { Component: Page };
					},
				},
				{
					path: "form/details/:code",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/acknowledgements/form-details");
						return { Component: Page };
					},
				},
			
			],
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
