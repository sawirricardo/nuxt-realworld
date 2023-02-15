<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

const query = useState("profile.query", () => route.query);
const { data: profile } = useFetch(`/profiles/${route.params.id}`, {
	baseURL: config.public.API_BASE_URL,
});

const { data: articles, pending } = useLazyAsyncData(
	`userarticles`,
	() =>
		$fetch(`/articles`, {
			baseURL: config.public.API_BASE_URL,
			query: query.value,
		}),
	{
		watch: [query],
	}
);
</script>
<template>
	<div class="profile-page">
		<div class="user-info">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<img :src="profile?.profile.image" class="user-img" />
						<h4 v-text="profile?.profile.username"></h4>
						<p v-text="profile?.profile.bio"></p>
						<button class="btn btn-sm btn-outline-secondary action-btn">
							<i class="ion-plus-round"></i>
							&nbsp; Follow {{ profile?.profile.username }}
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<div class="articles-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<a
									class="nav-link"
									:class="[{ active: !('favorited' in query) }]"
									@click="() => (query = {})"
								>
									My Articles
								</a>
							</li>
							<li class="nav-item">
								<a
									class="nav-link"
									:class="[{ active: 'favorited' in query }]"
									@click="
										() => {
											query = {
												...query,
												favorited: profile?.profile.username,
											};
										}
									"
								>
									Favorited Articles
								</a>
							</li>
						</ul>
					</div>

					<NuxtLoadingIndicator v-if="pending" />
					<ArticlePreview
						v-for="article in articles?.articles"
						:key="article.slug"
						:article="article"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
