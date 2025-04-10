"use client";

import * as React from "react";

import { dashboardConfig } from "@/config/dashboard";
import { useSettings } from "@/contexts/settings-context";

import { HorizontalLayout } from "./horizontal/horizontal-layout";
import { VerticalLayout } from "./vertical/vertical-layout";

export function Layout(props) {
	const { settings } = useSettings();
	const layout = settings.dashboardLayout ?? dashboardConfig.layout;

	if (layout === "horizontal") {
		return <HorizontalLayout {...props} />;
	}

	return <VerticalLayout {...props} />;
}
