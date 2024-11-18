/**
 * 后端返回的用户类型
 */
export type UserToRecommendType = {
    id: number;
    userName: string;
    userAccount: string;
    avatarUrl: string;
    gender: number;
    phone: string;
    email: string;
    tags: string;
    profile?: string;
}