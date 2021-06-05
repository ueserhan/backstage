import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/index',
    name:'index',
    component: ()=>import('../views/index'),
    children:[
      {
        path:'users',
        name:'users',
        component:()=>import('../views/children/users')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
