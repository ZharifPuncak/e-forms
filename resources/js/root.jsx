"use client";

import * as React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "@fontsource/poppins/100.css"
import "@fontsource/poppins/200.css"
import "@fontsource/poppins/300.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import "@fontsource/poppins/800.css"
import "@fontsource/poppins/900.css"


import "@/styles/global.css";
import "nprogress/nprogress.css";

import { appConfig } from "@/config/app";
import { getSettings as getPersistedSettings } from "@/lib/settings";

import { ThemeProvider } from "@/components/core//theme-provider";
import { Analytics } from "@/components/core/analytics";
import { I18nProvider } from "@/components/core/i18n-provider";
// import { LocalizationProvider } from "@/components/core/localization-provider";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Rtl } from "@/components/core/rtl";

import DrawerSlider from '@/components/drawer';
import CustomDialog from '@/components/dialog';
import { Toaster } from "@/components/core/toaster";

import { AuthProvider } from './contexts/auth-context.jsx';
import { AppProvider } from "@/contexts/app-context"; 
import { DataProvider } from '@/contexts/data-context';
import { SettingsProvider } from "@/contexts/settings-context";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const metadata = { title: appConfig.name };


export function Root({ children }) {
	const settings = getPersistedSettings();

	return (
		<QueryClientProvider client={queryClient}>
			<HelmetProvider>
				<Helmet>
					<title>{metadata.title}</title>
					<meta content={appConfig.themeColor} name="theme-color" />
				</Helmet>
				<AuthProvider>
				<AppProvider>
					<DataProvider>
						<Analytics>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<SettingsProvider settings={settings}>
										<I18nProvider>
											<Rtl>
												<ThemeProvider>
													{children}
													<Toaster position="bottom-right" />
													<DrawerSlider />
													<CustomDialog />
												</ThemeProvider>
											</Rtl>
										</I18nProvider>
									</SettingsProvider>
								</LocalizationProvider>
							</Analytics>
						</DataProvider>
					</AppProvider>
				</AuthProvider>
			</HelmetProvider>
		</QueryClientProvider>
	);
}
