<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
const config = useRuntimeConfig();
const router = useRouter();
const { data: user } = useFetch("user", {
	baseURL: config.public.API_BASE_URL,
	server: false,
	headers: {
		Authorization: `Token ${localStorage.getItem("token")}`,
	},
});
const form = useState("settings", () => {
	return {
		username: user.value.user.username,
		email: user.value.user.email,
		password: null,
		bio: user.value.user.bio,
		image: user.value.user.image,
	};
});
const logout = async () => {
	localStorage.removeItem("token");
	navigateTo("/login");
};

const updateUser = async () => {
	const { data, pending, error } = await useFetch(`/user`, {
		method: "put",
		baseURL: config.public.API_BASE_URL,
		body: {
			user: form.value,
		},
	});
	if (data.value) {
		form.value = data.value.user;
	}
};
</script>
<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>

					<form @submit.prevent="updateUser">
						<fieldset>
							<fieldset class="form-group">
								<input
									class="form-control"
									type="text"
									placeholder="URL of profile picture"
									v-model="form.image"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Your Name"
									v-model="form.username"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control form-control-lg"
									rows="8"
									placeholder="Short bio about you"
									v-model="form.bio"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Email"
									v-model="form.email"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="password"
									placeholder="Password"
									v-model="form.password"
								/>
							</fieldset>
							<button class="btn btn-lg btn-primary pull-xs-right">
								Update Settings
							</button>
						</fieldset>
					</form>
					<hr />
					<button @click="logout" class="btn btn-outline-danger">
						Or click here to logout.
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
