<script setup lang="ts">
defineProps({
	comment: Object,
});
</script>
<template>
	<div class="card">
		<div class="card-block">
			<p class="card-text" v-text="comment?.body"></p>
		</div>
		<div class="card-footer">
			<NuxtLink
				:to="`/profiles/${comment?.author.username}`"
				class="comment-author"
			>
				<img :src="comment?.author.image" class="comment-author-img" />
			</NuxtLink>
			&nbsp;
			<NuxtLink
				:to="`/profiles/${comment?.author.username}`"
				class="comment-author"
				v-text="comment?.author.username"
			></NuxtLink>
			<span class="date-posted" v-text="new Date(comment?.createdAt)"></span>
			<span class="mod-options">
				<i class="ion-edit"></i>
				<i class="ion-trash-a"></i>
			</span>
		</div>
	</div>
</template>
