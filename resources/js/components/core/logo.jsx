"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useColorScheme } from "@mui/material/styles";

import PuncakLogo from "@/assets/images/logo/logo-puncak.png";
import { NoSsr } from "@/components/core/no-ssr";

const HEIGHT = 60;
const WIDTH = 60;

export function Logo({ color = "dark", emblem, height = HEIGHT, width = WIDTH, isSignInPage = false }) {
	
	return <Box alt="logo" component="img" height={height} src={PuncakLogo} width={width} />;
}

export function DynamicLogo({ colorDark = "light", colorLight = "dark", height = HEIGHT, width = WIDTH, ...props }) {
	const { colorScheme } = useColorScheme();
	const color = colorScheme === "dark" ? colorDark : colorLight;

	return (
		<NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
			<Logo color={color} height={height} width={width} {...props} />
		</NoSsr>
	);
}
