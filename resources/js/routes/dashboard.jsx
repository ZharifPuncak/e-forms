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
			handle: {
				name : 'Overview',
				description : 'Summarize view on forms and acknowledgements'
			},
			lazy: async () => {
				const { Page } = await import("@/pages/dashboard/overview");
				return { Component: (props) => <AuthorizeGuard permission='dashboard.view_overview'><Page {...props} /></AuthorizeGuard> };
			},
		},
		{
			path: "forms",
			children: [
				{
					index: true,
					handle: {
						name : 'Form List',
						description : ' List of all available forms including pending, confirmed, ongoing and closed forms.'
					},
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/forms/list");
						return { Component: (props) => <AuthorizeGuard permission='form.view_form'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "create",
					handle: {
						name : 'Create Form',
						description : 'Make a new form based on your data input.'
					},
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/forms/create");
						return { Component: (props) => <AuthorizeGuard permission='form.create_form'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "details/:code",
					handle: {
						name : 'Form Details',
						description : 'View details on selected form'
					},
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
					handle: {
						name : 'Staff List',
						description : 'List of all staff over companies.'
					},
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/staff/list");
						return { Component: (props) => <AuthorizeGuard permission='stf.view_staff'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "details/:code",
					handle: {
						name : 'Staff Details',
						description : 'View details on selected staff.'
					},
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/staff/details");
						return { Component: (props) => <AuthorizeGuard permission='stf.view_staff'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "create",
					handle: {
						name : 'Create Staff',
						description : 'Add new staff.'
					},
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
					handle: {
						name : 'Acknowledgements List',
						description : 'List of all acknowledgements including pending, completed, incompleted and cancelled.'
					},
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/acknowledgements/status");
						return { Component: (props) => <AuthorizeGuard permission='ack.view_acknowledgement'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "staff/details/:code",
					handle: {
						name : 'Staff Acknowledgements',
						description : 'List of all acknowledgements by staff members.'
					},
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/acknowledgements/staff-details");
						return { Component: (props) => <AuthorizeGuard permission='ack.view_acknowledgement'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "form/details/:code",
					handle: {
						name : 'Form Details',
						description : 'View acknowledgements details by form.'
					},
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/acknowledgements/form-details");
						return { Component: (props) => <AuthorizeGuard permission='ack.view_acknowledgement'><Page {...props} /></AuthorizeGuard> };
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
					path: "users",
					handle: {
						name : 'Users',
						description : 'List all admin users.'
					},
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/users");
						return { Component: (props) => <AuthorizeGuard permission='acl.view_user'><Page {...props} /></AuthorizeGuard> };
					},
				},
				{
					path: "roles",
					handle: {
						name : 'Roles',
						description : 'List all roles with permissions.'
					},
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/roles");
						return { Component: (props) => <AuthorizeGuard permission='acl.view_role'><Page {...props} /></AuthorizeGuard> };
					},
				},
			],
		},
	],
};

