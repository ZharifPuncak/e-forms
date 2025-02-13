import { paths } from "@/paths";

export const dashboardConfig = {
	layout: "vertical",
	navColor: "evident",
	navItems: [
		{
			key: "dashboards",
			title: "Dashboards",
			items: [
				{ key: "overview", title: "Overview", href: paths.dashboard.overview, icon: "house" },
			],
		},
		{
			key: "forms",
			title: "Forms",
			items: [
				{
					key: "forms",
					title: "Forms",
					icon: "file",
					items: [
						{ key: "forms:list", title: "List forms", href: paths.dashboard.forms.list, },
						{ key: "forms:create", title: "Create form", href: paths.dashboard.forms.create },
					],
				},
				
			]
		},
		{
			key: "acknowledgement",
			title: "Acknowledgements",
			items: [
				{ key: "status", title: "Status", href: paths.dashboard.acknowledgements.status ,icon : "hourglass" },
			]
		},
	
		{
			key: "general",
			title: "General",
			items: [
				{
					key: "staff",
					title: "Staff",
					icon: "users",
					items: [
						{ key: "staff:list", title: "List staff", href: paths.dashboard.staff.list },
						{ key: "staff:create", title: "Create Staff", href: paths.dashboard.staff.create },
					],
				},
				{
					key: "settings",
					title: "Settings",
					href: paths.dashboard.settings.profile,
					icon: "gear",
					matcher: { type: "startsWith", href: "/dashboard/settings" },
				},
			]
		},
	]
};
