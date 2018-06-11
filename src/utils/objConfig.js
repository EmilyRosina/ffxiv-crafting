import { jobMap } from '@/utils/enums'
import jobIcons from '@/utils/jobIcons'

function renameProperty (obj, origKey, newKey) {
  if (origKey !== newKey) {
    Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, origKey))
    delete obj[origKey]
  }
  return obj
}

export function prepRecipes (recipes) {
  recipes = recipes.map(recipe => {
    let savedRecipeIds = Object.keys(JSON.parse(localStorage['ffxivc:fav-recipes']))
    let jobCode = jobMap[recipe.class_name]
    let isFav = savedRecipeIds.includes(String(recipe.id))
    return Object.assign(
      {},
      recipe,
      renameProperty(recipe, 'level_view', 'craft_level'),
      renameProperty(recipe, 'level', 'item_level'),
      {
        is_crafted: recipe.class_name !== null,
        is_fav: isFav,
        job_code: jobCode,
        job_icon: jobIcons[jobCode].src
      }
    )
  })
  return recipes
}

export default {
  prepRecipes
}
