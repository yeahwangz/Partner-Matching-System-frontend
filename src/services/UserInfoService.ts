import {getCurrentUserInfo, setCurrentUserInfo} from "../classes/UserInfoClass.ts";
import myAxios from "../config/AxiosConfig.ts";
import {UserType} from "../models/UserType";

export const getUserInfoService = async ()=> {
    if (getCurrentUserInfo()){
        return getCurrentUserInfo()
    }
    try {
        const nowCurrentUserInfoFromAxios = await myAxios.get('/user/search/userInfo')
        const nowCurrentUserInfo: UserType = nowCurrentUserInfoFromAxios.data.data
        setCurrentUserInfo(nowCurrentUserInfo)
        return nowCurrentUserInfo
    } catch (error){
        console.log('获取当前登录用户信息失败',error)
    }
}