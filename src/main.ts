import { createApp } from 'vue'
import App from './App.vue'
import {Button, NavBar, Icon, Tabbar, TabbarItem, Toast, Pagination, Empty, CellGroup, Cell} from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./config/route.ts";
import myAxios from "./config/AxiosConfig.ts";

const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(myAxios);
app.use(Toast);
app.use(Pagination);
app.use(Empty);
app.use(Cell);
app.use(CellGroup);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

app.use(router);

app.mount('#app');




