export default {
  performedSearch (state) {
    return state.recipes[state.searchTerm] !== undefined
  },
  hasRecipes (state, getters) {
    return getters.performedSearch && state.recipes[state.searchTerm].total.found !== 0
  },
  hasFavRecipes (state, getters) {
    return getters.savedRecipeIds.length > 0
  },
  matchedRecipesTotal (state, getters) {
    return getters.hasRecipes ? state.recipes[state.searchTerm].total : {}
  },
  matchedRecipes (state, getters) {
    return getters.hasRecipes ? state.recipes[state.searchTerm].recipes : []
  },
  filteredRecipes (state, getters) {
    if (getters.hasRecipes) {
      return getters.filtersAreActive
        ? getters.matchedRecipes.filter(recipe => getters.activeFilters.includes(recipe.job_code))
        : getters.matchedRecipes
    } else {
      return getters.matchedRecipes
    }
  },
  activeFilters (state, getters) {
    return getters.filtersAreActive ? Object.keys(state.filters).filter(key => state.filters[key] === true) : []
  },
  filtersAreActive (state) {
    return Object.values(state.filters).includes(true)
  },
  matchedJobs (state, getters) {
    if (!getters.matchedRecipes) return null
    else {
      let jobs = []
      getters.matchedRecipes.forEach(recipe => {
        if (!jobs.includes(recipe.job_code)) {
          jobs.push(recipe.job_code)
        }
      })
      return jobs
    }
  },
  savedRecipeIds (state) {
    return Object.keys(state.savedRecipes)
  },
  searchTermList (state) {
    return state.searchTerm
      .toLowerCase()
      .split(' ')
      .join(',')
  }
}
