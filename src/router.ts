import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

// const AsyncDeck = () => import(/* webpackChunkName: "deck", webpackPrefetch: 10 */'./views/Deck.vue')
// const AsyncPrint = () => import(/* webpackChunkName: "print", webpackPrefetch: 1 */'./views/Print.vue')
const AsyncDeck = () => import(/* webpackChunkName: "deck" */'./views/Deck.vue')
const AsyncPrint = () => import(/* webpackChunkName: "print" */'./views/Print.vue')

const isServer = typeof window === 'undefined'
const history = isServer ? createMemoryHistory() : createWebHistory()

export default createRouter({
  history,
  strict: true,
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/deck/:id', name: 'Deck', component: AsyncDeck },
    { path: '/print/:id', name: 'Print', component: AsyncPrint },
  ]
})
