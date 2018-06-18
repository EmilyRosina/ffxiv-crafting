import axios from 'axios'
import api from '@/utils/ffxivapi'
import { prepRecipes } from '@/utils/objConfig'

export default {
  FETCH_RECIPES ({ getters, commit }, payload) {
    const { searchTerm, searchTermList, pageNo } = payload
    const currentTotal = getters.matchedRecipesTotal.fetched ? getters.matchedRecipesTotal.fetched : 0
    axios.get(api.getRecipes({searchTermList, pageNo}))
      .then(res => {
        let recipes = prepRecipes(res.data.recipes, currentTotal)
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
