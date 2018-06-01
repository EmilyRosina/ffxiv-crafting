import allRecipes from '@/utils/recipes.json'

function getRecipes () {
  let recipeList = {}
  allRecipes.forEach(recipe => { recipeList[recipe.id] = recipe })
  return recipeList
}

export default {
  recipes: getRecipes(),
  search: {
    term: '',
    terms: [],
    filters: []
  },
  view: 'search' // search or favourites (or recipe ?)
}
