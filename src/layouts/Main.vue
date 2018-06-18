<template>
  <div class="main-layout">

    <header class="header">
      <div class="header__logo__wrapper">
        <img class="header__logo" height="100%" src="@/assets/images/ffxiv-blue-logo.png" alt="final fantasy online logo" />
        <span class="header__logo__text">crafting</span>
      </div>

      <div class="header__right">
        <figure v-if="show.favouritesIcon" class="header__right__fav" @click="toggleView()">
          <img class="header__right__fav__icon" :src="favIcon" alt="saved favourites" />
          <span class="header__right__fav__total">{{ savedRecipesTotal }}</span>
        </figure>
        <icon v-else name="search" scale="1.5" class="header__right__search-icon" @click.native="toggleView()" />
        <a class="header__right__github" href="https://github.com/EmilyRosina/ffxiv-crafting" target="_blank" rel="noopener">
          <icon name="brands/github" scale="1.5" />
        </a>
      </div>

      <div class="header__favourites" v-if="false">
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
  import { mapState, mapMutations } from 'vuex'

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
    methods: {
      ...mapMutations([
        'SET_VIEW'
      ]),
      toggleView () {
        this.SET_VIEW(this.view === 'search' ? 'favourites' : 'search')
      }
    },
    computed: {
      ...mapState([
        'savedRecipes',
        'view'
      ]),
      show () {
        return {
          searchIcon: this.view === 'favourites',
          favouritesIcon: this.view === 'search'
        }
      },
      savedRecipesTotal () {
        return this.hasFavRecipes ? Object.keys(this.savedRecipes).length : ''
      },
      hasFavRecipes () {
        return Object.keys(this.savedRecipes).length > 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-layout {
    @extend %grid;
    @extend %full-width;
    min-height: 100vh;
    grid-template-rows: 60px 1fr 30px;

    .header {
      @extend %full-width;
      background: $charcoal;
      position: relative;
      @include setFlex($align-items: center, $justify: space-between);
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
      &__right {
        padding: 0 1em;
        transition: 0.5s;
        @include setFlex($align-items: center);

        &__github,
        &__fav,
        &__search-icon {
          transition: 0.25s;
          opacity: 0.5;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
        &__fav {
          position: relative;
          @include setFlex($align-items: center, $justify: center);
          &__total {
            position: absolute;
            align-self: center;
            margin-top: 0.3em;
            padding-right: 0.15em;
            color: white;
            font-size: 0.75rem;
          }
        }
        &__search-icon {
          color: $pink;
          margin-right: 0.35em;
        }
        // &__favourites {
        //   position: absolute;
        //   bottom: -65px;
        //   left: 2.5em;
        //   background: #1c1c1c;
        //   padding: 0.1em 1.15em 1em 1.15em ;
        //   border-bottom-left-radius: 100%;
        //   border-bottom-right-radius: 100%;
        //   cursor: pointer;
        //   @include setFlex($direction: column, $align-items: center, $justify: center);
        // }
      }
    }
    .main {
      @extend %grid;
      @extend %full-width;
      background: darken($charcoal, 5);
      padding: 1em;
      /* grid-template-columns,
      /* grid-template-rows,
      /* grid-template-areas
          designated by xxxPage.vue */
    }
    .footer {
      @extend %full-width;
      background: darken($charcoal, 15);
    }
  }
</style>
