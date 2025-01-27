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
