<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const isLoggedIn = useState("isLoggedIn", () => false);
const query = useState("query", () => route.query);
const username = useState("username", () => null);
if (process.browser) {
	isLoggedIn.value = localStorage.getItem("token") != null;
	if (isLoggedIn.value) {
		useLazyFetch(`/user`, {
			headers: { Authorization: `Token ${localStorage.getItem("token")}` },
		}).then(({ data }) => {
			username.value = data.user.username;
		});
	}
}
const { data: tags, pending: tags_pending } = useLazyFetch(`/tags`, {
	baseURL: config.public.API_BASE_URL,
});
const {
	data: articles,
	pending: articles_pending,
	refresh,
} = useLazyAsyncData(
	`/articles`,
	() =>
		$fetch(`/articles`, {
			baseURL: config.public.API_BASE_URL,
			params: query.value,
		}),
	{
		watch: [query],
	}
);
</script>
<template>
	<div class="home-page">
		<div class="banner">
			<div class="container">
				<h1 class="logo-font">conduit</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>

		<div class="container page">
			<div class="row">
				<div class="col-md-9">
					<div class="feed-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<a
									class="nav-link disabled"
									:class="[{ disabled: isLoggedIn }]"
									:disabled="!isLoggedIn"
									@click="
										() => {
											query = { ...query, favorited: username };
										}
									"
								>
									Your Feed
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link active" href="">Global Feed</a>
							</li>
						</ul>
					</div>

					<NuxtLoadingIndicator v-if="articles_pending" />
					<ArticlePreview
						v-for="article in articles?.articles"
						:article="article"
						:key="article.slug"
					/>
				</div>

				<div class="col-md-3">
					<div class="sidebar">
						<p>Popular Tags</p>

						<div class="tag-list">
							<NuxtLoadingIndicator v-if="tags_pending" />
							<a
								v-for="tag in tags?.tags ?? []"
								:key="tag"
								class="tag-pill tag-default"
								@click="
									() => {
										query = { ...query, tag: tag };
									}
								"
							>
								{{ tag }}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
