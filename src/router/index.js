import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import Konfigurasiview from '@/views/Konfigurasiview.vue'

import NotFoundView from '@/views/NotFoundView.vue'
import ServerView from '@/views/ServerView.vue'
import wifiView from '@/views/WifiView.vue'

import DashboardView from '@/views/DashboardView.vue'
import ProximityView from '@/views/ProximityView.vue'
import HistoriView from '@/views/HistoriView.vue'
import PzemView from '@/views/PzemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/konfigurasi',
      name: 'konfigurasi',
      component: Konfigurasiview
    },
    {
      path: '/konfigurasi/wifi',
      name: 'konfigurasiwifi',
      component: wifiView
    },
    {
      path: '/konfigurasi/server',
      name: 'konfigurasiserver',
      component: ServerView
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: NotFoundView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/proximity',
      name: 'proximity',
      component: ProximityView
    },
    {
      path: '/pzem',
      name: 'pzem',
      component: PzemView
    },
    {
      path: '/history',
      name: 'History',
      component: HistoriView
    },
    {
      path: '/logout',
      name: 'logout',
      redirect: '/'
    }
  ]
})

export default router
