import axios from 'axios'
import api from '@/utils/ffxivapi'
import { jobMap } from '@/utils/enums'
import jobIcons from '@/utils/jobIcons'

export default {
  FETCH_RECIPES ({ commit }, payload) {
    const { searchTerm, searchTermList } = payload
    axios.get(api.getRecipes(searchTermList))
      .then(res => {
        let recipes = res.data.recipes.results
          .map(recipe => {
            let jobCode = jobMap[recipe.class_name]
            recipe['craft_level'] = recipe.level_view
            recipe['item_level'] = recipe.level
            delete recipe.level_view
            delete recipe.level
            return Object.assign({}, recipe, {
              is_crafted: recipe.class_name !== null,
              job_code: jobCode,
              job_icon: jobIcons[jobCode].src
            })
          })
        return { searchTerm, recipes }
      })
      .then(res => {
        if (res) {
          const { searchTerm, recipes } = res
          commit('SET_RECIPES', { searchTerm, recipes })
        }
      })
  }
}
