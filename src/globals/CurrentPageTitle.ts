/**
 * 页面标题名
 */
import {ref} from "vue";

let currentPageTitle = ref('');

const setCurrentPageTitle = (title: string) => {
    currentPageTitle.value = title;
}

const getCurrentPageTitle = () => {
    return currentPageTitle.value;
}

export {
    currentPageTitle,
    setCurrentPageTitle,
    getCurrentPageTitle
}