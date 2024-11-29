declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// 添加对 Vue Router 的类型声明
import 'vue-router';

declare module 'vue' {
    interface ComponentCustomProperties {
        $route: import('vue-router').RouteLocationNormalizedLoaded;
        $router: import('vue-router').Router;
    }
}