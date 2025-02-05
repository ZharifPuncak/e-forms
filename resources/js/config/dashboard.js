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
			key: "acknowledgement",
			title: "Acknowledgements",
			items: [
				{
					key: "forms",
					title: "Forms",
					icon: "forms",
					items: [
						{ key: "forms:list", title: "List forms", href: '#' },
						{ key: "forms:create", title: "Create form", href: '#' },
					],
				},
				{
					key: "status",
					title: "Status",
					icon: "forms",
					items: [
						{ key: "status:pending", title: "Pending", href: '#' },
						{ key: "status:completed", title: "Completed", href: '#' },
					],
				},
				{
					key: "staff",
					title: "Staff",
					icon: "staff",
					items: [
						{ key: "staff:list", title: "List staff", href: '#' },
						{ key: "staff:add", title: "Create Staff", href: '#' },
					],
				},
			
			]
		},
	
		{
			key: "general",
			title: "General",
			items: [
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
