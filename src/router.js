//商品列表路由配置
const routers = [
    {
        path: '/list',
        meta: {
            title: '리스트'
        },
        component: (resolve) => require(['./views/list.vue'], resolve)
    },
    {
        path: '/product/:id',
        meta: {
            title: '상품정보'
        },
        component: (resolve) => require(['./views/product.vue'], resolve)
    },
    {
        path: '/cart',
        meta: {
            title: '장바구니'
        },
        component: (resolve) => require(['./views/cart.vue'], resolve)
    },
    {
        path: '/login/:loginStatus',
        meta: {
            title: '로그인'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/login/login'
    }
];
export default routers;
