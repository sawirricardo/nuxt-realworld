// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	typescript: {
		shim: false,
	},
	runtimeConfig: {
		public: {
			API_BASE_URL: process.env.API_BASE_URL,
		},
	},
	app: {
		head: {
			title: "Conduit | Nuxt Realworld - Ricardo Sawir",
			meta: [
				{ name: "description", content: "Nuxt Realworld - Ricardo Sawir" },
			],
			link: [
				{
					rel: "stylesheet",
					type: "text/css",
					href: "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css",
				},
				{
					rel: "stylesheet",
					type: "text/css",
					href: "https://fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic",
				},
				{ rel: "stylesheet", href: "https://demo.productionready.io/main.css" },
			],
		},
	},
});
