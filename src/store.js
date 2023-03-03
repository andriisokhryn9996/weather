import { createStore } from "vuex";
import search from "@/modules/weather/store";

const store = createStore({
    modules: {
        search
    },
});

export default store;
