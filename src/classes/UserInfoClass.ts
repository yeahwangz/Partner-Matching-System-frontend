import {UserType} from "../models/UserType";

let currentUserInfo: UserType

const setCurrentUserInfo = (newUserInfo: UserType) => {
    currentUserInfo = newUserInfo
}

const getCurrentUserInfo = (): UserType => {
    return currentUserInfo
}

export {
    setCurrentUserInfo,
    getCurrentUserInfo,
    currentUserInfo
}