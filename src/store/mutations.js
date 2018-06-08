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
  }
}
