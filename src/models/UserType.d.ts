/**
 * 用户类型
 */
export type UserType = {
    id: number;
    userName: string;
    userAccount: string;
    avatarUrl?: string;
    gender: string;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    tags: string[];
    createTime: Date;
    profile?: string;
}