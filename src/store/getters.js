export default {
  matchedRecipes (state) {
    return state.recipes[state.searchTerm]
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
  }
}
