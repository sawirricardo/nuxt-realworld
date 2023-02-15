<script setup lang="ts">
const isLoggedIn = useState("isLoggedIn", () => false);
if (process.browser) {
	isLoggedIn.value = localStorage.getItem("token") != null;
}
</script>
<template>
	<nav class="navbar navbar-light">
		<div class="container">
			<a class="navbar-brand" href="/">conduit</a>
			<ul class="nav navbar-nav pull-xs-right">
				<li class="nav-item">
					<!-- Add "active" class when you're on that page" -->
					<NuxtLink class="nav-link" active-class="active" to="/">
						Home
					</NuxtLink>
				</li>
				<li class="nav-item">
					<NuxtLink
						v-if="isLoggedIn"
						class="nav-link"
						active-class="active"
						to="/articles/create"
					>
						<i class="ion-compose"></i>&nbsp;New Article
					</NuxtLink>
				</li>
				<li class="nav-item">
					<NuxtLink
						v-if="isLoggedIn"
						class="nav-link"
						active-class="active"
						to="/settings"
					>
						<i class="ion-gear-a"></i>&nbsp;Settings
					</NuxtLink>
				</li>
				<li class="nav-item">
					<NuxtLink
						v-if="!isLoggedIn"
						class="nav-link"
						active-class="active"
						to="/login"
					>
						Sign in
					</NuxtLink>
				</li>
				<li class="nav-item">
					<NuxtLink
						v-if="!isLoggedIn"
						class="nav-link"
						active-class="active"
						to="/register"
					>
						Sign up
					</NuxtLink>
				</li>
			</ul>
		</div>
	</nav>
</template>
