import {ref} from "vue";

let loginStatus = ref(0);

const setLoginStatus = (status: number) => {
    loginStatus.value = status;
}

const getLoginStatus = () => {
    return loginStatus.value;
}

export {
    loginStatus,
    setLoginStatus,
    getLoginStatus
}