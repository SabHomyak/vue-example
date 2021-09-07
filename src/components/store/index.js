import {createStore} from "vuex";
import {postModule} from "@/components/store/postModule";

export default createStore({
    modules: {
        post: postModule
    }
})