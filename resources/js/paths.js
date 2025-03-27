
export const paths = {
	home: "/",
	auth: {
		signIn: "/auth/sign-in",
		signInAdmin : "/auth/sign-in/?key=admin",
		signUp: "/auth/sign-up",
		resetPassword: "/auth/reset-password",
		updatePassword: "/auth/update-password",
	},
	dashboard: {
		overview: "/dashboard",
		manual: {
			list: "/dashboard/manual/list"
		},
		settings: {
			profile: "/dashboard/settings/profile",
			users: "/dashboard/settings/users",
			roles: "/dashboard/settings/roles",		
		},
		staff: {
			list: "/dashboard/staff",
			create: "/dashboard/staff/create",
			details: (code) => `/dashboard/staff/details/${code}`,
		},
		acknowledgements:{
			status: "/dashboard/acknowledgements",
			staff: {
				details : (code) => `/dashboard/acknowledgements/staff/details/${code}`,
			},
			form : {
				details : (code) => `/dashboard/acknowledgements/form/details/${code}`,
			}
		},
		forms : {
			list: "/dashboard/forms",
			create: "/dashboard/forms/create",
			details: (code) => `/dashboard/forms/details/${code}`,
		},
	},

	notAuthorized: "/errors/not-authorized",
	notFound: "/errors/not-found",

};
