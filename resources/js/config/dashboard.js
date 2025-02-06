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
						{ key: "forms:list", title: "List forms", href: '#', },
						{ key: "forms:create", title: "Create form", href: '#' },
					],
				},
				
			]
		},
		{
			key: "declaration",
			title: "Declarations",
			items: [
				{ key: "status", title: "Status", href: '#', icon : "hourglass" },
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
						{ key: "staff:list", title: "List staff", href: '#' },
						{ key: "staff:add", title: "Create Staff", href: '#' },
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
