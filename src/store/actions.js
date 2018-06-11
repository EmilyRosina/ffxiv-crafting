import axios from 'axios'
import api from '@/utils/ffxivapi'
import { prepRecipes } from '@/utils/objConfig'

export default {
  FETCH_RECIPES ({ commit }, payload) {
    const { searchTerm, searchTermList } = payload
    axios.get(api.getRecipes(searchTermList))
      .then(res => {
        console.log('FETCH_RECIPES 1', res.data.recipes.results.length)
        let recipes = prepRecipes(res.data.recipes.results)
        console.log('FETCH_RECIPES 2', recipes)
        return { searchTerm, recipes }
      })
      .then(res => {
        if (res) {
          const { searchTerm, recipes } = res
          commit('SET_RECIPES', { searchTerm, recipes })
        }
      })
  },
  FETCH_FAV_RECIPES ({ commit }) {
    if (!localStorage['ffxivc:fav-recipes']) {
      localStorage['ffxivc:fav-recipes'] = JSON.stringify({})
    } else {
      let recipes = JSON.parse(localStorage['ffxivc:fav-recipes'])
      commit('SET_FAV_RECIPES', recipes)
    }
  }
}
