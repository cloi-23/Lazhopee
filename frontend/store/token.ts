import { defineStore } from 'pinia'

export const tokenJWT = defineStore('token', {
  state: () => ({
    token: ''
  }),

  getters: {
    get: (state) => {
      state.token
    }
  },
  actions: {
    add(token: string) {
      this.token = token
    }
  }
})