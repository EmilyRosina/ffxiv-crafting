import { jobMap } from '@/utils/enums'
import jobIcons from '@/utils/jobIcons'

function renameProperty (obj, origKey, newKey) {
  if (origKey !== newKey) {
    Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, origKey))
    delete obj[origKey]
  }
  return obj
}

function setPaging (paging) {
  let pages = {}
  paging.pages.forEach(pageNo => {
    pages[pageNo] = pageNo <= paging.page
  })
  pages.next = paging.next
  return pages
}

export function prepRecipes (data, currentTotal) {
  const { results, total, paging } = data
  let recipes = results.map(recipe => {
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
  let _pages = setPaging(paging)
  return {
    recipes,
    total: {
      found: total,
      fetched: currentTotal + recipes.length,
      remaining: total - currentTotal - recipes.length,
      _pages
    }
  }
}

export default {
  prepRecipes
}
