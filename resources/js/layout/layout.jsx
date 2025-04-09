"use client";

import * as React from "react";

import { dashboardConfig } from "@/config/dashboard";
import { useSettings } from "@/contexts/settings-context";

import { HorizontalLayout } from "./horizontal/horizontal-layout";
import { VerticalLayout } from "./vertical/vertical-layout";
import useAuth from "@/hooks/use-auth";

export function Layout(props) {
	const { settings } = useSettings();
	const { is } = useAuth();

	const layout = settings.dashboardLayout ?? dashboardConfig.layout;
	
	if (is('Staff')) {
		return <HorizontalLayout {...props} />;
	}

	return <VerticalLayout {...props} />;
}
