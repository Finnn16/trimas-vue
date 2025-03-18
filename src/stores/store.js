import { reactive } from 'vue'

export const store = reactive({
    currentPage: 'home',
    changePage(page) {
        this.currentPage = page
    }
})