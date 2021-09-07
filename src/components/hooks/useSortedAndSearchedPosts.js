import {ref, computed} from "vue";

export default function useSortedAndSearchedPosts(sortedPosts) {
    const searchQuery = ref('')
    const sortedAndSearchedPosts = computed(() => {
        return sortedPosts.value.filter(postik => {
            return postik.title.toLowerCase().includes(searchQuery.value.toLocaleLowerCase())
        })
    })
    return {
        searchQuery, sortedAndSearchedPosts
    }
}