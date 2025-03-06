import * as React from "react";
import { Outlet } from "react-router-dom";

import { AuthGuard } from "./utils/auth-guard";
import { AuthorizeGuard } from "./utils/authorize-guard";
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
				return { Component: (props) => <AuthorizeGuard permission='all'><Page {...props} /></AuthorizeGuard> };
			},
		},
		{
			path: "forms",
			children: [
				{
					index: true,
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/forms/list");
						return { Component: (props) => <AuthorizeGuard permission='form.view_form'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "create",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/forms/create");
						return { Component: (props) => <AuthorizeGuard permission='form.create_form'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "details/:code",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/forms/details");
						return { Component: (props) => <AuthorizeGuard permission='form.view_form'><Page {...props} /></AuthorizeGuard> };
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
						return { Component: (props) => <AuthorizeGuard permission='stf.view_staff'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "details/:code",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/staff/details");
						return { Component: (props) => <AuthorizeGuard permission='stf.view_staff'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "create",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/staff/create");
						return { Component: (props) => <AuthorizeGuard permission='stf.create_staff'><Page {...props} /></AuthorizeGuard> };
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
						return { Component: (props) => <AuthorizeGuard permission='ack.view_acknowledgement'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "staff/details/:code",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/acknowledgements/staff-details");
						return { Component: (props) => <AuthorizeGuard permission='ack.view_acknowledgement'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "form/details/:code",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/acknowledgements/form-details");
						return { Component: (props) => <AuthorizeGuard permission='ack.view_acknowledgement'><Page {...props} /></AuthorizeGuard> };
					},
				},
			
			],
		},
		{
				path: "manual",
				children: [
					{
						path: "list",
						lazy: async () => {
							const { Page } = await import("@/pages/dashboard/manual/list");
							return { Component: (props) => <Page {...props} /> };
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
						return { Component: (props) => <AuthorizeGuard permission='profile.update_password'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "users",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/users");
						return { Component: (props) => <AuthorizeGuard permission='acl.view_user'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "roles",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/roles");
						return { Component: (props) => <AuthorizeGuard permission='acl.view_role'><Page {...props} /></AuthorizeGuard> };
					},
				},
			],
		},
	],
};

