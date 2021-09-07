<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <my-input
                v-focus
                v-model="post.title"
                placeholder="Название"/>
        <my-input
                v-model="post.body"
                placeholder="Описание"/>
        <my-button
                class="btn"
                @click="createPost"
                style="margin-top: 15px;align-self: flex-end;"
        >
            Создать
        </my-button>
    </form>
</template>

<script>

    import MyInput from "@/components/UI/MyInput";

    export default {
        name: "PostForm",
        components: {MyInput},
        data() {
            return {
                post: {
                    id: '',
                    title: '',
                    body: ''
                }
            }
        },
        methods: {
            createPost() {
                this.post.id = Date.now();
                this.$emit('create', this.post)
                this.title = '';
                this.body = '';
                this.post = {
                    id: '',
                    title: '',
                    body: ''
                }
            }
        },
    }
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
    }
</style>