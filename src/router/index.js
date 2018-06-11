import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Recipe from '@/pages/Recipe'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Home
    },
    {
      path: '/recipe/:id',
      name: 'RecipePage',
      component: Recipe
    }
  ]
})
