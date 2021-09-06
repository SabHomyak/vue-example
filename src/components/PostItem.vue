<template>
    <div class="post">
        <div>
            <div><strong>Название:</strong>{{post.body}}</div>
            <div><strong>Описание:</strong>{{post.title}}</div>
        </div>
        <div class="post__btns">
            <my-button @click="$emit('remove',post)">Удалить</my-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PostItem",
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .post {
        padding: 15px;
        border: 2px solid teal;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>