import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/innterchange',
    name: 'inntervhange',
    component: () => import( '../views/INNterchange.vue')
  },
  {
    path: '/fetchData',
    name: 'fetchData',
    component: () => import( '../components/FetchData.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
