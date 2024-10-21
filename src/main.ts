import { createApp } from 'vue'
import App from './App.vue'
import { Button, NavBar, Icon, Tabbar, TabbarItem} from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./config/route.ts";

const app = createApp(App);
app.use(Button)
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

app.use(router);

app.mount('#app')




