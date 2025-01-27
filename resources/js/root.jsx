"use client";

import * as React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "@/styles/global.css";
import "nprogress/nprogress.css";

import { appConfig } from "@/config/app";
import { getSettings as getPersistedSettings } from "@/lib/settings";

import { ThemeProvider } from "@/components/core//theme-provider";
import { Analytics } from "@/components/core/analytics";
import { I18nProvider } from "@/components/core/i18n-provider";
import { LocalizationProvider } from "@/components/core/localization-provider";
import { Rtl } from "@/components/core/rtl";

import DrawerSlider from '@/components/drawer';
import Modal from '@/components/modal';
import CustomDialog from '@/components/dialog';
import { Toaster } from "@/components/core/toaster";

import { AuthProvider } from './contexts/auth-context.jsx';
import { AppProvider } from "@/contexts/app-context"; 
import { DataProvider } from '@/contexts/data-context';
import { SettingsProvider } from "@/contexts/settings-context";

const metadata = { title: appConfig.name };


export function Root({ children }) {
	const settings = getPersistedSettings();

	return (
		<HelmetProvider>
			<Helmet>
				<title>{metadata.title}</title>
				<meta content={appConfig.themeColor} name="theme-color" />
			</Helmet>
			<AuthProvider>
			  <AppProvider>
				<DataProvider>
					<Analytics>
							<LocalizationProvider>
								<SettingsProvider settings={settings}>
									<I18nProvider>
										<Rtl>
											<ThemeProvider>
												{children}
												<Toaster position="bottom-right" />
												<DrawerSlider />
												<Modal />
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
	);
}
