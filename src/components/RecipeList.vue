<template>
  <ul :class="[{'recipe-list': !fav}, {'recipe-list--fav': fav}]">

    <!-- full -->
    <li v-if="!fav" class="recipe-list__results-info">
      <p :class="['recipe-list__results-info__text', {'full': allRecipesFetched}]">
        Showing <b :class="{'filtered': filtersAreActive}">{{ showingAllRecipes ? 'all' : filteredRecipesTotal }}</b>
        <span v-if="filtersAreActive">
          <i class="filtered" v-if="filtersAreActive">filtered</i>
          from <b>{{ allRecipesFetched ? `all ${recipesTotal.found}` : recipesTotal.fetched }}</b> found
        </span>
        <span v-else>
          from <b>{{ allRecipesFetched ? recipesTotal.fetched : recipesTotal.found }}</b> found
        </span>
      </p>
      <span class="recipe-list__results-info__fetch-more" v-if="!allRecipesFetched" @click="fetchMoreRecipes()">Fetch more?</span>
    </li>
    <li v-if="!fav" class="recipe" v-for="recipe in filteredRecipes" :key="recipe.id">
      <img
        :src="favIcon"
        :class="['recipe__fav', {'recipe__fav--saved': recipe.is_fav}]"
        @click="toggleFavRecipe(recipe)"
        alt="saved recipe icon" />
      <a class="recipe__link" :href="recipe.url_xivdb" target="_blank" ref="noopener">{{ recipe.name }}</a>
      <span>{{ recipe.craft_level }}</span>
      <img
        :class="['job-icon', {'job-icon--selected': filterIsApplied(recipe.job_code)}]"
        @click="TOGGLE_FILTER(recipe.job_code)"
        :src="recipe.job_icon"
        alt="job icon" />
      <figure class="recipe__item-icon">
        <img
          class="recipe__item-icon__img"
          :src="recipe.icon"
          alt="item icon" />
        <figcaption class="recipe__item-icon__caption">
          iLvl: {{ recipe.item_level }}
        </figcaption>
      </figure>
    </li>

    <!-- fav -->
    <li v-if="fav" class="recipe" v-for="recipe in favRecipes" :key="`fav--${recipe.id}`">
      <a class="recipe__link" :href="recipe.url_xivdb" target="_blank" ref="noopener">{{ recipe.name }}</a>
      <span>{{ recipe.craft_level }}</span>
      <img
        :class="['job-icon', {'job-icon--selected': filterIsApplied(recipe.job_code)}]"
        @click="TOGGLE_FILTER(recipe.job_code)"
        :src="recipe.job_icon"
        alt="job icon" />
      <icon name="times" class="remove" @click.native="toggleFavRecipe(recipe)"/>
      <figure class="recipe__item-icon">
        <img
          class="recipe__item-icon__img"
          :src="recipe.icon"
          alt="item icon" />
        <figcaption class="recipe__item-icon__caption">
          iLvl: {{ recipe.item_level }}
        </figcaption>
      </figure>
    </li>

  </ul>
</template>

<script>
  import favIcon from '@/assets/images/favourite.png'
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'RecipeList',
    props: {
      fav: {
        type: Boolean,
        required: false
      }
    },
    data () {
      return {
        favIcon
      }
    },
    methods: {
      ...mapActions([
        'FETCH_RECIPES'
      ]),
      ...mapMutations([
        'TOGGLE_FILTER',
        'ADD_FAV_RECIPE',
        'REMOVE_FAV_RECIPE'
      ]),
      fetchMoreRecipes () {
        let pageNo = this.recipesTotal._pages.next
        let { searchTerm, searchTermList } = this
        this.FETCH_RECIPES({ searchTerm, searchTermList, pageNo })
      },
      filterIsApplied (jobCode) {
        return this.filters[jobCode]
      },
      toggleFavRecipe (recipe) {
        if (recipe.is_fav) this.REMOVE_FAV_RECIPE({ recipe, searchTerm: this.searchTerm })
        else this.ADD_FAV_RECIPE({ recipe, searchTerm: this.searchTerm })
      }
    },
    computed: {
      ...mapState([
        'filters',
        'searchTerm',
        'savedRecipes'
      ]),
      ...mapGetters([
        'matchedRecipesTotal',
        'searchTermList',
        'filteredRecipes',
        'matchedRecipes',
        'filtersAreActive',
        'savedRecipeIds',
        'hasRecipes',
        'hasFavRecipes'
      ]),
      favRecipes () {
        if (!this.hasFavRecipes) return []
        else {
          return this.savedRecipeIds.map(recipeId => this.savedRecipes[recipeId])
        }
      },
      filteredRecipesTotal () {
        return this.filteredRecipes.length
      },
      recipesTotal () {
        return this.matchedRecipesTotal
      },
      allRecipesFetched () {
        return this.recipesTotal.remaining === 0
      },
      showingAllRecipes () {
        return this.filtersAreActive
          ? this.recipesTotal.fetched === this.filteredRecipesTotal
          : this.allRecipesFetched
      }
    }
  }
</script>

<style lang="scss" scoped>
  // TODO: refactor all this SCSS, it's a mess!!
  .recipe {
    color: #ddd;
    padding: 0.25em 0.5em;
    margin-bottom: 0.25em;
    font-size: 0.75rem;
    background-color: transparentize(#555, 0.5);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    &:hover {
      .recipe__item-icon {
        position: absolute;
        display: block;
        right: -10em;
        top: 0;
        height: 9em;
        width: 9em;
      }
    }
    &-list {
      width: 100%;

      &__results-info {
        @extend .recipe;
        padding: 1em;
        margin: 0.75em;
        background: #1c1c1c;
        color: $blue;
        .full {
          width: 100%;
          text-align: center;
        }
        .filtered {
          color: $pink;
        }
        &__fetch-more {
          color: #ccc;
          &:hover {
            color: $pink;
          }
        }
      }
      // &--fav {
      //   position: absolute;
      //   left: 0;
      //   top: 125%;
      //   display: block;
      //   width: 250px;

      //   .recipe {
      //     padding: 0 1em;
      //     border-radius: 1em;
      //     height: 2.25em;
      //     font-size: 0.7rem;
      //     margin-bottom: 0.4em;
      //     background-color: #1c1c1c;

      //     .job-icon {
      //       height: 2em;
      //     }
      //     .remove {
      //       color: black;
      //       &:hover {
      //         color: indianred;
      //       }
      //     }
      //   }
      // }
    }
    &__item-icon {
      display: none;

      &__img {
        height: 100%;
        width: 100%;
      }
      &__caption {
        margin-top: -2em;
        margin-right: 1em;
        text-align: right;
        font-weight: 600;
        text-shadow: 1px 1px 10px black,
                     -1px -1px 4px black;
      }
    }
    &__fav {
      height: 2em;
      margin-right: 1em;
      filter: grayscale(1);
      opacity: 0.25;
      &:hover,
      &--saved {
        filter: grayscale(0);
        opacity: 1;
      }
    }
    &__link {
      flex: 1 0 auto;
    }
  }
  .job-icon {
    cursor: pointer;
    filter: hue-rotate(160deg);
    &--selected {
      filter: hue-rotate(0deg);
    }
  }
</style>
