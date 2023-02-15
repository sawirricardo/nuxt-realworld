<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
const config = useRuntimeConfig();

const form = useState("createArticle", () => {
	return {
		title: "",
		description: "",
		body: "",
	};
});

const createArticle = async () => {
	useFetch("articles", {
		baseURL: config.public.API_BASE_URL,
		method: "post",
		body: { article: form.value },
		headers: {
			Authorization: `Token ${localStorage.getItem("token")}`,
		},
	});
};
</script>
<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<form @submit.prevent="createArticle">
						<fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control form-control-lg"
									placeholder="Article Title"
									v-model="form.title"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="What's this article about?"
									v-model="form.description"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control"
									rows="8"
									placeholder="Write your article (in markdown)"
									v-model="form.body"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="Enter tags"
								/>
								<div class="tag-list"></div>
							</fieldset>
							<button
								class="btn btn-lg pull-xs-right btn-primary"
								type="button"
							>
								Publish Article
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
