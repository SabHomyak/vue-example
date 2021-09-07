<template>
    <div >
        <h1>Страница с постами</h1>
        <my-input
                v-focus
                v-model="searchQuery"
                placeholder="Поиск..."
        />
        <div class="app__btns">
            <my-button @click="showDialog"
            >Создать пост
            </my-button>
            <my-select
                    v-model="selectedSort"
                    :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>
        <post-list
                :posts="sortedAndSearchedPosts"
                @remove="removePost"
                v-if="!isPoststLoading"/>
        <div v-else>Идет загрузка...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!--        <div class="page__wrapper">-->
        <!--            <div-->
        <!--                    v-for="pageNumber in totalPages"-->
        <!--                    :key="pageNumber"-->
        <!--                    class="page"-->
        <!--                    :class="{-->
        <!--                        'current-page':page === pageNumber-->
        <!--                    }"-->
        <!--                    @click="changePage(pageNumber)"-->
        <!--            >-->
        <!--                {{pageNumber}}-->
        <!--            </div>-->
        <!--        </div>-->
    </div>
</template>

<script>
    import PostList from "@/components/PostList";
    import PostForm from "@/components/PostForm";
    import MyDialog from "@/components/UI/MyDialog";
    import MyButton from "@/components/UI/MyButton";
    import axios from "axios";
    import MySelect from "@/components/UI/MySelect";
    import MyInput from "@/components/UI/MyInput";

    export default {
        components: {
            MyInput,
            MySelect,
            MyButton,
            MyDialog,
            PostList,
            PostForm,
        },
        data() {
            return {
                posts: [],
                dialogVisible: false,
                isPoststLoading: false,
                selectedSort: '',
                searchQuery: '',
                page: 1,
                limit: 10,
                totalPages: 0,
                sortOptions: [
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'},
                ]
            };
        },
        methods: {
            createPost(post) {
                this.posts.push(post);
                this.dialogVisible = false;
            },
            removePost(post) {
                this.posts = this.posts.filter((filterPost) => filterPost !== post);
            },
            showDialog() {
                this.dialogVisible = true;
            },
            // changePage(pageNumber) {
            //     this.page = pageNumber;
            // },
            async fetchPosts() {
                try {
                    this.isPoststLoading = true;
                    const response = await axios.get(
                        "https://jsonplaceholder.typicode.com/posts", {
                            params: {
                                _page: this.page,
                                _limit: this.limit
                            }
                        }
                    );
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = response.data;
                } catch (e) {
                    alert("Ошибка");
                } finally {
                    this.isPoststLoading = false;
                }
            },
            async loadMorePosts() {
                try {
                    this.page += 1;
                    const response = await axios.get(
                        "https://jsonplaceholder.typicode.com/posts", {
                            params: {
                                _page: this.page,
                                _limit: this.limit
                            }
                        }
                    );
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = [...this.posts, ...response.data];
                } catch (e) {
                    alert("Ошибка");
                }
            }
        },
        mounted() {
            this.fetchPosts();

        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(postik => {
                    return postik.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase())
                })
            }
        },
        watch: {
            // page(){
            //     this.fetchPosts()
            // }
        }
    };
</script>

<style>
    .app__btns {
        margin: 15px 0;
        display: flex;
        justify-content: space-between;
    }

    .page__wrapper {
        display: flex;
        margin-top: 15px;
    }

    .page {
        border: 1px solid black;
        padding: 10px;
    }

    .current-page {
        border: 2px solid teal;
    }

    .observer {
        height: 30px;
        background: green;
    }
</style>