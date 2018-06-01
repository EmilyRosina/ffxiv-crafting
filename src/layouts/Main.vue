<template>
  <div class="main-layout">
    <header class="header">
      <div class="header__logo__wrapper">
        <img class="header__logo" height="100%" src="@/assets/images/ffxiv-blue-logo.png" alt="final fantasy online logo" />
        <span class="header__logo__text">crafting</span>
      </div>
    </header>
    <main class="main">
      <div>
        <img class="job-icon--inactive" v-for="(job, key) in jobs" :key="key" :src="job.src" :alt="`icon for ${job.src}`"/>
      </div>
      <div>
        <input v-model.trim="searchTerm" />
      </div>
      <div>
        <ul class="recipe-list">
          <li class="recipe" v-for="recipe in matchedRecipes" :key="recipe.id">{{ recipe.name }}</li>
        </ul>
      </div>
    </main>
    <footer class="footer">footer</footer>
  </div>
</template>

<script>
  import jobIcons from '@/utils/jobIcons'

  export default {
    name: 'MainLayout',
    data () {
      return {
        searchTerm: ''
      }
    },
    computed: {
      searchTermOkay () {
        return this.searchTerm.length >= 3
      },
      jobs () {
        return jobIcons
      },
      matchedRecipes () {
        if (this.searchTermOkay) {
          console.log('YUP')
          const recipes = this.$store.state.recipes
          return Object.keys(this.$store.state.recipes)
            .filter(recipeId => RegExp('\\b' + this.searchTerm.toLowerCase() + '\\b').test(recipes[recipeId].name.toLowerCase()))
            .map(recipeId => { return { id: recipeId, name: recipes[recipeId].name } })
        } else {
          return null
        }
      }
    },
    watch: {
      searchTerm (after, before) {
        if (this.searchTermOkay) {
          console.log('ooh changes!', before, after)
          const recipes = this.$store.state.recipes
          let matchedRecipes = Object.keys(this.$store.state.recipes)
            .filter(recipeId => RegExp('\\b' + this.searchTerm.toLowerCase() + '\\b').test(recipes[recipeId].name.toLowerCase()))
            .map(recipeId => { return { id: recipeId, name: recipes[recipeId].name } })
          console.log('matchedRecipes', matchedRecipes)
        }
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

    &-list {
      padding: 1em;
    }
  }
</style>
