import Vue from 'vue'

export default {
  SET_RECIPES (state, { searchTerm, recipes }) {
    if (state.recipes.hasOwnProperty(searchTerm)) {
      Vue.set(state.recipes[searchTerm], 'recipes', state.recipes[searchTerm].recipes.concat(recipes.recipes))
      Vue.set(state.recipes[searchTerm], 'total', recipes.total)
    } else {
      Vue.set(state.recipes, searchTerm, recipes)
    }
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
    let index = state.recipes[searchTerm].recipes.indexOf(recipe)
    recipe.is_fav = true
    Vue.set(state.savedRecipes, recipe.id, recipe)
    Vue.set(state.recipes[searchTerm].recipes, index, recipe)
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
    if (searchTerm) {
      let index = state.recipes[searchTerm].recipes.indexOf(recipe)
      recipe.is_fav = false
      Vue.set(state.recipes[searchTerm].recipes, index, recipe)
    }
    Vue.delete(state.savedRecipes, recipe.id)
    let savedFav = JSON.parse(localStorage['ffxivc:fav-recipes'])
    delete savedFav[recipe.id]
    localStorage['ffxivc:fav-recipes'] = JSON.stringify(savedFav)
  }
}
