<script setup>
defineProps({
	article: Object,
});
</script>
<template>
	<div class="article-preview">
		<div class="article-meta">
			<NuxtLink :to="`/profiles/${article.author.username}`">
				<img :src="article.author.image" />
			</NuxtLink>
			<div class="info">
				<NuxtLink :to="`/profiles/${article.author.username}`" class="author">
					{{ article.author.username }}
				</NuxtLink>
				<span class="date" v-text="new Date(article.createdAt)"> </span>
			</div>
			<button class="btn btn-outline-primary btn-sm pull-xs-right">
				<i class="ion-heart"></i> 32
			</button>
		</div>
		<NuxtLink :to="`/articles/${article.slug}`" class="preview-link">
			<h1 v-text="article.title"></h1>
			<p v-text="article.description"></p>
			<span>Read more...</span>
			<ul class="tag-list" v-if="article.tagList.length > 0">
				<li
					v-for="tag in article.tagList"
					:key="tag"
					class="tag-default tag-pill tag-outline"
					v-text="tag"
				></li>
			</ul>
		</NuxtLink>
	</div>
</template>
