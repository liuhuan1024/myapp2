import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将动态路由参数映射到组件的props中，无论是访问还是维护都很方便
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
