import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { routes } from "@/routes";
import { Root } from "@/root";
import { ScrollRestoration } from "@/components/core/scroll-restoration";

import axios from 'axios';
axios.defaults.withCredentials = true;

const root = createRoot(document.querySelector("#root"));
const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Root>
				<ScrollRestoration />
				<Outlet />
			</Root>
		),
		children: [...routes],
	},
],{basename : "/e-forms"});

root.render(
	<React.StrictMode>
		<React.Suspense fallback={<h1>Loading...</h1>}>
				<RouterProvider router={router} />
		</React.Suspense>
	</React.StrictMode>
);
