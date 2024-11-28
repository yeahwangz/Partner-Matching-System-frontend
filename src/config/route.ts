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
    { path: '/', component: IndexPage , meta: { keepAlive: false } },
    { path: '/team', component: TeamPage, meta: { keepAlive: false }  },
    { path: '/user', component: UserPage , meta: { keepAlive: false } },
    { path: '/search', component: SearchPage , meta: { keepAlive: false } },
    { path: '/user/edit', component: UserEditPage , meta: { keepAlive: false } },
    { path: '/search/result', component: SearchResultPage, meta: { keepAlive: false }  },
    { path: '/login', component: UserLoginPage, meta: { keepAlive: false }  },
    { path: '/register', component: UserRegisterPage, meta: { keepAlive: false }  },
    { path: '/userInfo', component: UserInfoPage, meta: { keepAlive: false }  },
    { path: '/teamInfo', component: TeamInfoPage, meta: { keepAlive: false }  },
    { path: '/createTeam', component: CreateTeamPage, meta: { keepAlive: false }  },
    { path: '/myTeamWithLeaderPage', component: MyTeamWithLeaderPage, meta: { keepAlive: false }  },
    { path: '/myTeamWithMemberPage', component: MyTeamWithMemberPage, meta: { keepAlive: false }  },
]

export default routes;