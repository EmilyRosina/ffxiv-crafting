// documentation: https://github.com/xivdb/api
const API_URI = 'https://api.xivdb.com'

export default {
  getRecipes (searchTerms) {
    return `${API_URI}/search?one=recipes&string=${searchTerms}`
  },
  getRecipe (recipeId) {
    return `${API_URI}/recipe/${recipeId}`
    /*
      tree                  __array of items (ingredients)__
        id
        icon
        name
        help                __description__
        kind_name
        level_item
        level_equip
        stack_size
        lodestone_type
        category_name
        connect_craftable   __isCrafted__
        connect_enemy_drop  __isDrop__
        connect_gathering   __isGathered__
        connect_recipe      __isRecipe__
        connect_shop        __isPurchasable__

    */
  }
}
