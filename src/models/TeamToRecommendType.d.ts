/**
 * 后端返回的队伍类型
 */
export type TeamToRecommendType = {
    id: number;
    teamName: string;
    profile?: string;
    tags: string;
    avatarUrl: string;
    currentMember: string;
    maxMemberNum: number;
}