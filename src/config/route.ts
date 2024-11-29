import IndexPage from "../pages/IndexPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import UserInfoPage from "../pages/UserInfoPage.vue";
import TeamInfoPage from "../pages/TeamInfoPage.vue";
import CreateTeamPage from "../pages/CreateTeamPage.vue";
import MyTeamWithLeaderPage from "../pages/MyTeamWithLeaderPage.vue";
import MyTeamWithMemberPage from "../pages/MyTeamWithMemberPage.vue";


const routes = [
    { path: '/', component: IndexPage , meta: { keepAlive: false ,title: "首页" } },
    { path: '/team', component: TeamPage, meta: { keepAlive: false ,title: "队伍页" }  },
    { path: '/user', component: UserPage , meta: { keepAlive: false ,title: "用户页"} },
    { path: '/search', component: SearchPage , meta: { keepAlive: false ,title: "用户搜索"} },
    { path: '/user/edit', component: UserEditPage , meta: { keepAlive: false ,title: "用户信息编辑"} },
    { path: '/search/result', component: SearchResultPage, meta: { keepAlive: false ,title: "用户搜索结果"}  },
    { path: '/login', component: UserLoginPage, meta: { keepAlive: false ,title: "登录"}  },
    { path: '/register', component: UserRegisterPage, meta: { keepAlive: false ,title: "注册"}  },
    { path: '/userInfo', component: UserInfoPage, meta: { keepAlive: false ,title: "用户信息"}  },
    { path: '/teamInfo', component: TeamInfoPage, meta: { keepAlive: false ,title: "队伍信息"}  },
    { path: '/createTeam', component: CreateTeamPage, meta: { keepAlive: false ,title: "创建队伍"}  },
    { path: '/myTeamWithLeaderPage', component: MyTeamWithLeaderPage, meta: { keepAlive: false ,title: "作为队长的队伍"}  },
    { path: '/myTeamWithMemberPage', component: MyTeamWithMemberPage, meta: { keepAlive: false ,title: "作为普通成员的队伍"}  },
]

export default routes;