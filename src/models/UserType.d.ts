/**
 * 用户类型
 */
export type UserType = {
    id: number;
    userName: string;
    userAccount: string;
    avatarUrl: string;
    gender: string;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    tags: string;
    createTime: Date;
    profile?: string;
}