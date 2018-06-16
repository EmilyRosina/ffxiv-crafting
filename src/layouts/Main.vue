<template>
  <div class="main-layout">

    <header class="header">
      <div class="header__logo__wrapper">
        <img class="header__logo" height="100%" src="@/assets/images/ffxiv-blue-logo.png" alt="final fantasy online logo" />
        <span class="header__logo__text">crafting</span>
      </div>

      <a class="header__github" href="https://github.com/EmilyRosina/ffxiv-crafting" target="_blank" >
        <icon name="brands/github" scale="1.5" />
      </a>

      <div class="header__favourites">
        <img :src="favIcon" />
        <RecipeList v-if="hasFavRecipes" mini />
      </div>
    </header>

    <router-view class="main"/>

    <footer class="footer"></footer>

  </div>
</template>

<script>
  import favIcon from '@/assets/images/favourite.png'
  import RecipeList from '@/components/RecipeList'
  import { mapState } from 'vuex'

  export default {
    name: 'MainLayout',
    components: {
      RecipeList
    },
    data () {
      return {
        favIcon
      }
    },
    computed: {
      ...mapState([
        'savedRecipes'
      ]),
      hasFavRecipes () {
        return Object.keys(this.savedRecipes).length > 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-layout {
    @extend %grid;
    width: 100%;
    min-height: 100vh;
    grid-template-rows: 60px 1fr 30px;

    .header {
      background: $charcoal;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      @include z-index('uppermost');

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
      &__favourites {
        position: absolute;
        bottom: -65px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        left: 2.5em;
        background: #1c1c1c;
        padding: 0.1em 1.15em 1em 1.15em ;
        border-bottom-left-radius: 100%;
        border-bottom-right-radius: 100%;
        cursor: pointer;
      }
    }
    .main {
      background: darken($charcoal, 5);
      @extend %grid;
      /* grid-template-columns,
      /* grid-template-rows,
      /* grid-template-areas
          designated by xxxPage.vue */
    }
    .footer {
      background: darken($charcoal, 15);
    }
  }
</style>
