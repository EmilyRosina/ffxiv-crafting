export default {
  matchedRecipes (state, getters) {
    if (!state.recipes[state.searchTerm]) return []
    else if (getters.filtersAreActive) {
      return state.recipes[state.searchTerm].filter(recipe => getters.activeFilters.includes(recipe.job_code))
    } else {
      return state.recipes[state.searchTerm]
    }
  },
  activeFilters (state, getters) {
    return getters.filtersAreActive ? Object.keys(state.filters).filter(key => state.filters[key] === true) : null
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
  }
}
