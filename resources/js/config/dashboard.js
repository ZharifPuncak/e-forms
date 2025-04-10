import { paths } from "@/paths";

export const dashboardConfig = {
	layout: "vertical",
	navColor: "evident",
	navItems: [
		{
			key: "dashboards",
			title: "Dashboards",
			permissions: ['dashboard.view_overview'],
			items: [
				{ key: "overview", title: "Overview", href: paths.dashboard.overview, icon: "house" , 	permissions: ['dashboard.view_overview']},
			],
		},
		{
			key: "forms",
			title: "Forms",
			permissions : ['form.view_form'],
			items: [
				{
					key: "forms",
					title: "Forms",
					icon: "file",
					permissions : ['form.view_form'],
					items: [
						{ key: "forms:list", title: "Form list", href: paths.dashboard.forms.list, permissions : ['form.view_form'] },
						{ key: "forms:create", title: "Create form", href: paths.dashboard.forms.create, permissions : ['form.create_form'] },
					],
				},
				
			]
		},
		{
			key: "acknowledgement",
			title: "Acknowledgements",
			permissions : ["ack.view_acknowledgement"],
			items: [
				{ key: "status", title: "Status", href: paths.dashboard.acknowledgements.status ,icon : "hourglass", permissions : ['ack.view_acknowledgement'] },
			]
		},
	
		{
			key: "general",
			title: "General",
			permissions : ['stf.view_staff'],
			items: [
				// { key: "manual", title: "Manual", href: paths.dashboard.manual.list, icon: "file" , permissions: ['all']},
				{
					key: "staff",
					title: "Staff",
					icon: "users",
					permissions : ['stf.view_staff'],
					items: [
						{ key: "staff:list", title: "Staff List", href: paths.dashboard.staff.list, permissions : ['stf.view_staff'] },
						{ key: "staff:create", title: "Create Staff", href: paths.dashboard.staff.create, permissions : ['stf.create_staff'] },
					],
				},
				{
					key: "settings",
					title: "Settings",
					permissions : ['all'],
					href: paths.dashboard.settings.users,
					icon: "gear",
					matcher: { type: "startsWith", href: "/dashboard/settings" },
				},
			]
		},
	]
};



