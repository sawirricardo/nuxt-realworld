<script setup lang="ts">
definePageMeta({
	middleware: "guess",
});
const form = useState("register", () => ({
	username: "",
	email: "",
	password: "",
}));
const submitting = useState("submitting", () => false);
const config = useRuntimeConfig();
const errors = useState("errors", () => ({}));
const register = async () => {
	submitting.value = true;
	const { data, pending, error } = await useFetch(`/users`, {
		method: "POST",
		baseURL: config.public.API_BASE_URL,
		body: {
			user: {
				email: email.value,
				password: password.value,
				username: username.value,
			},
		},
	});
	if (error.value) {
		errors.value = error.value.data.errors;
	}

	submitting.value = pending.value;
};
</script>
<template>
	<div class="auth-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Sign up</h1>
					<p class="text-xs-center">
						<NuxtLink to="/login">Have an account?</NuxtLink>
					</p>

					<ul class="error-messages">
						<li v-for="(errs, key) in errors" :key="key">
							<span v-for="error in errs" v-text="`${key} ${error}`"></span>
						</li>
					</ul>

					<form @submit.prevent="register">
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="text"
								placeholder="Your Name"
								v-model="form.username"
							/>
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
						<button
							:disabled="submitting"
							class="btn btn-lg btn-primary pull-xs-right"
							type="submit"
						>
							Sign up
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
