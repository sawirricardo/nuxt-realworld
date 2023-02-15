<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const isLoggedIn = useState("isLoggedIn", () => false);
if (process.browser) {
	isLoggedIn.value = localStorage.getItem("token") != null;
}
const { data: article } = useFetch(`/articles/${route.params.id}`, {
	baseURL: config.public.API_BASE_URL,
});
const {
	data: comments,
	pending,
	refresh,
} = useLazyFetch<{ comments: { body: string }[] }>(
	`/articles/${route.params.id}/comments`,
	{
		baseURL: config.public.API_BASE_URL,
		server: false,
	}
);

const comment = useState("comment", () => "");
const createComment = async () => {
	useFetch(`/articles/${route.params.id}/comments`, {
		baseURL: config.public.API_BASE_URL,
		method: "POST",
		body: { comment: { body: comment.value } },
		headers: {
			Authorization: `Token ${localStorage.getItem("token")}`,
		},
	}).then(({ data, error }) => {
		refresh();
		comment.value = "";
	});
};
</script>
<template>
	<div class="article-page">
		<div class="banner">
			<div class="container">
				<h1 v-text="article?.article.title"></h1>

				<div class="article-meta">
					<NuxtLink :to="`/profiles/${article.article.author.username}`">
						<img :src="article.article.author.image" />
					</NuxtLink>
					<div class="info">
						<NuxtLink
							:to="`/profiles/${article.article.author.username}`"
							class="author"
						>
							{{ article.article.author.username }}
						</NuxtLink>
						<span
							class="date"
							v-text="new Date(article.article.createdAt)"
						></span>
					</div>
					<button class="btn btn-sm btn-outline-secondary">
						<i class="ion-plus-round"></i>
						&nbsp; Follow {{ article.article.author.username }}
						<span class="counter">(10)</span>
					</button>
					&nbsp;&nbsp;
					<button class="btn btn-sm btn-outline-primary">
						<i class="ion-heart"></i>
						&nbsp; Favorite Post
						<span class="counter">({{ article.article.favoritesCount }})</span>
					</button>
				</div>
			</div>
		</div>

		<div class="container page">
			<div class="row article-content">
				<div class="col-md-12" v-html="article.article.body"></div>
			</div>

			<hr />

			<div class="article-actions">
				<div class="article-meta">
					<NuxtLink :to="`/profiles/${article.article.author.username}`">
						<img :src="article.article.author.image" />
					</NuxtLink>
					<div class="info">
						<NuxtLink
							:to="`/profiles/${article.article.author.username}`"
							class="author"
						>
							{{ article.article.author.username }}
						</NuxtLink>
						<span
							class="date"
							v-text="new Date(article.article.createdAt)"
						></span>
					</div>

					<button class="btn btn-sm btn-outline-secondary">
						<i class="ion-plus-round"></i>
						&nbsp; Follow {{ article.article.author.username }}
					</button>
					&nbsp;
					<button class="btn btn-sm btn-outline-primary">
						<i class="ion-heart"></i>
						&nbsp; Favorite Post
						<span class="counter">({{ article.article.favoritesCount }})</span>
					</button>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12 col-md-8 offset-md-2">
					<form class="card comment-form" @submit.prevent="createComment">
						<div class="card-block">
							<textarea
								class="form-control"
								placeholder="Write a comment..."
								rows="3"
								v-model="comment"
							></textarea>
						</div>
						<div class="card-footer">
							<img
								:src="article.article.author.image"
								class="comment-author-img"
							/>
							<button class="btn btn-sm btn-primary">Post Comment</button>
						</div>
					</form>

					<NuxtLoadingIndicator v-if="pending" />
					<div v-if="comments?.comments?.length == 0">
						Comment this article!
					</div>
					<CommentCard
						v-for="comment in comments?.comments"
						:key="comment.body"
						:comment="comment"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
