<template>
  <div class="main-layout">
    <header class="header">
      <div class="header__logo__wrapper">
        <img class="header__logo" height="100%" src="@/assets/images/ffxiv-blue-logo.png" alt="final fantasy online logo" />
        <span class="header__logo__text">crafting</span>
      </div>
      <a href="https://github.com/EmilyRosina/ffxiv-crafting" target="_blank" class="header__github"><icon name="brands/github" scale="1.5" /></a>
    </header>
    <main class="main">
      <div>
        <img class="job-icon--inactive" v-for="(job, key) in jobs" :key="key" :src="job.src" :alt="`icon for ${job.src}`"/>
      </div>
      <div>
        <input v-model.trim="searchTerm" @keydown.enter="fetchRecipes()"/>
      </div>
      <div>
        <ul class="recipe-list">
          <li class="recipe" v-for="recipe in matchedRecipes" :key="recipe.id">
            <a class="recipe__link" :href="recipe.url_xivdb" style="flex: 1 0 auto;" target="_blank" ref="noopener">{{ recipe.name }}</a>
            <span>{{ recipe.item_level }} | {{ recipe.craft_level }} | {{ recipe.level_diff }}</span>
            <img class="job-icon--inactive" :src="recipe.job_icon" alt="job icon">
            <img class="recipe__item-icon" :src="recipe.icon" alt="item icon" />
          </li>
        </ul>
      </div>
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<script>
  import jobIcons from '@/utils/jobIcons'
  import { jobMap } from '@/utils/enums'
  import api from '@/utils/ffxivapi'
  import axios from 'axios'
  import { mapState } from 'vuex'

  export default {
    name: 'MainLayout',
    data () {
      return {
        searchTerm: '',
        matchedRecipes: [],
        jobMap,
        jobIcons
      }
    },
    methods: {
      fetchRecipes () {
        axios.get(api.getRecipes(this.searchTermList))
          .then(res => {
            let matchedRecipes = res.data.recipes.results
              .map(recipe => {
                let jobCode = this.jobMap[recipe.class_name]
                recipe['craft_level'] = recipe.level_view
                recipe['item_level'] = recipe.level
                delete recipe.level_view
                delete recipe.level
                return Object.assign({}, recipe, {
                  is_crafted: recipe.class_name !== null,
                  job_code: jobCode,
                  job_icon: this.jobIcons[jobCode].src
                })
              })
            this.matchedRecipes = matchedRecipes
          })
      }
    },
    computed: {
      ...mapState([
        'recipes'
      ]),
      totalMatchedRecipes () {
        return this.matchedRecipes.length
      },
      searchTermOkay () {
        return this.searchTerm.length >= 3
      },
      jobs () {
        return jobIcons
      },
      searchTermList () {
        return this.searchTerm.toLowerCase().split(' ').join(',')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-layout {
    @extend %grid;
    width: 100vw;
    min-height: 100vh;
    grid-template-rows: 60px 1fr 30px;

    .header {
      background: $charcoal;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__logo {
        padding: 0.5em;

        &__wrapper {
          height: 100%;
          width: auto;
          position: relative;
          cursor: pointer;
        }
        &__text {
          color: #fff;
          position: absolute;
          left: 5.2em;
          bottom: 0.5em;
          font-size: 0.75rem;
          font-weight: 400;
          text-shadow: 0px 0px 4px magenta,
                       0px 0px 2px magenta;
        }
      }
      &__github {
        padding: 1em;
      }
    }
    .main {
      background: darken($charcoal, 5);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .footer {
      background: darken($charcoal, 15);
    }
  }

  .job-icon {
    &--inactive {
      filter: grayscale(1);
    }
  }

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
    width: 400px;

    &-list {
      padding: 1em;
    }
    &__item-icon {
      display: none;
    }
    &:hover {
      .recipe__item-icon {
        display: inline;
      }
    }
  }
</style>
