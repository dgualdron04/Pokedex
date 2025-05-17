import { createRouter, createWebHistory } from 'vue-router'
import useFunctions from '@/composables/useFunctions'

import pokedexRouter from '../modules/pokedex/router'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    redirect: { name: 'pokedex.welcome' }
  },
  {
    path: '/pokedex',
    ...pokedexRouter
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const { toCamelCase } = useFunctions()
  document.title = `${ import.meta.env.VITE_APP_TITLE } -  ${ toCamelCase(to.path.split('/').filter(item => item !== '')[0]) }`
})

export default router