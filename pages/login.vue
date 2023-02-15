<script setup lang="ts">
definePageMeta({
	middleware: "guess",
});
const config = useRuntimeConfig();
const router = useRouter();
const form = useState("login", () => ({
	email: "",
	password: "",
}));
const submitting = useState("submitting", () => false);
const errors = useState("errors", () => ({}));
const authenticate = async () => {
	submitting.value = true;
	useFetch(`/users/login`, {
		method: "POST",
		baseURL: config.public.API_BASE_URL,
		body: {
			user: form.value,
		},
	}).then(({ data, pending, error }) => {
		submitting.value = pending.value;
		if (error.value) {
			errors.value = error.value.data.errors;
			return;
		}
		navigateTo("/");
	});
};
</script>
<template>
	<div class="auth-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Sign in</h1>
					<p class="text-xs-center">
						<NuxtLink to="/register">Have no account?</NuxtLink>
					</p>

					<ul class="error-messages">
						<li v-for="(errs, key) in errors" :key="key">
							<span v-for="error in errs" v-text="`${key} ${error}`"></span>
						</li>
					</ul>

					<form @submit.prevent="authenticate">
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
							Sign in
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
