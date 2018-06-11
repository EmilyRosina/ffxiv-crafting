<template>
  <ul class="recipe-list">
    <li class="recipe" v-for="recipe in matchedRecipes" :key="recipe.id">
      <img :src="favIcon" :class="['recipe__fav', {'recipe__fav--saved': recipe.is_fav}]" @click="toggleFavRecipe(recipe)" />
      <a class="recipe__link" :href="recipe.url_xivdb" style="flex: 1 0 auto;" target="_blank" ref="noopener">{{ recipe.name }}</a>
      <span>{{ recipe.item_level }} | {{ recipe.craft_level }} | {{ recipe.level_diff }}</span>
      <img
        :class="['job-icon', {'job-icon--selected': filterIsApplied(recipe.job_code)}]"
        @click="TOGGLE_FILTER(recipe.job_code)"
        :src="recipe.job_icon"
        alt="job icon" />
      <img
        class="recipe__item-icon"
        :src="recipe.icon"
        alt="item icon" />
    </li>
  </ul>
</template>

<script>
  import favIcon from '@/assets/images/favourite.png'
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'RecipeList',
    props: {
      matchedRecipes: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        favIcon
      }
    },
    methods: {
      ...mapMutations([
        'TOGGLE_FILTER',
        'ADD_FAV_RECIPE',
        'REMOVE_FAV_RECIPE'
      ]),
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
        'searchTerm'
      ])
    }
  }
</script>

<style lang="scss" scoped>
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
        left: -12em;
      }
    }
    &-list {
      width: 100%;
    }
    &__item-icon {
      display: none;
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
  }
  .job-icon {
    cursor: pointer;
    filter: hue-rotate(160deg);
    &--selected {
      filter: hue-rotate(0deg);
    }
  }
</style>
