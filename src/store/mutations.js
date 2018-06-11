import Vue from 'vue'

export default {
  SET_RECIPES (state, { searchTerm, recipes }) {
    Vue.set(state.recipes, searchTerm, recipes)
  },
  SET_SEARCHTERM (state, searchTerm) {
    state.searchTerm = searchTerm
  },
  TOGGLE_FILTER (state, jobCode) {
    state.filters[jobCode] = !state.filters[jobCode]
  },
  SET_FAV_RECIPES (state, recipes) {
    state.savedRecipes = recipes
  },
  ADD_FAV_RECIPE (state, { recipe, searchTerm }) {
    let index = state.recipes[searchTerm].indexOf(recipe)
    recipe.is_fav = true
    Vue.set(state.savedRecipes, recipe.id, recipe)
    Vue.set(state.recipes[searchTerm], index, recipe)
    if (!localStorage['ffxivc:fav-recipes']) {
      localStorage['ffxivc:fav-recipes'] = JSON.stringify({ [recipe.id]: recipe })
    } else {
      let savedFav = JSON.parse(localStorage['ffxivc:fav-recipes'])
      localStorage['ffxivc:fav-recipes'] = JSON.stringify(
        Object.assign({}, savedFav, { [recipe.id]: recipe })
      )
    }
  },
  REMOVE_FAV_RECIPE (state, { recipe, searchTerm }) {
    let index = state.recipes[searchTerm].indexOf(recipe)
    recipe.is_fav = false
    Vue.delete(state.savedRecipes, recipe.id)
    Vue.set(state.recipes[searchTerm], index, recipe)
    let savedFav = JSON.parse(localStorage['ffxivc:fav-recipes'])
    delete savedFav[recipe.id]
    localStorage['ffxivc:fav-recipes'] = JSON.stringify(savedFav)
  }
}
