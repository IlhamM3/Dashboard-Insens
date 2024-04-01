import { defineStore } from 'pinia'

import { setCookies, certCookies, delCookies } from '@/plugins/cookies'

import * as s$auth from '@/service/auth'

export const d$auth = defineStore({
  id: 'auth',
  state: () => ({
    username: undefined
  }),
  actions: {
    async a$setUser() {
      try {
        const { username } = certCookies()
        this.username = username
        return 'User Authenticated!'
      } catch ({ message }) {
        this.username = undefined
        throw message
      }
    },
    async a$login(body) {
      try {
        const { data } = await s$auth.login(body)
        setCookies('CERT', data.token)
        return true
      } catch ({ error, message }) {
        throw message ?? error
      }
    },
    async a$logout() {
      try {
        delCookies('CERT')
      } catch ({ error, message }) {
        throw message ?? error
      }
    }
  },
  getters: {
    g$user: ({ username }) => ({ username }),
    // determine if user is logged in
    isLoggedIn: ({ username }) => !!username
  }
})
