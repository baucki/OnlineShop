import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductView from "@/views/ProductView";
import Cart from "@/views/Cart";
import Authentification from "@/views/Authentification";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/productView',
    name: 'ProductView',
    component: ProductView,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/login',
    name: 'Login',
    component: Authentification,
    props: {
      type: 'Login'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Authentification,
    props: {
      type: 'Register'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
