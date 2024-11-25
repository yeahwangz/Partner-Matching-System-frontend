import {UserType} from "../models/UserType";

let currentUserInfo: UserType | undefined

const setCurrentUserInfo = (newUserInfo: UserType) => {
    currentUserInfo = newUserInfo
}

const getCurrentUserInfo = (): UserType | undefined => {
    return currentUserInfo
}

export {
    setCurrentUserInfo,
    getCurrentUserInfo,
    currentUserInfo
}