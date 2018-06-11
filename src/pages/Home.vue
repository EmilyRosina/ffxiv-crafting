<template>
  <main id="home-page">
    <div class="search">
      <input class="search__input" v-model.trim="searchTermInput" @keydown.enter="fetchRecipes()" />
      <button class="search__button" @click="fetchRecipes()" :disabled="!searchTermOkay">search</button>
    </div>

    <div class="filters">
      <img
        v-for="(job, key) in jobs"
        :key="key"
        :class="['job-icon', {'job-icon--selected': filterIsApplied(key)}, {'job-icon--in-results': jobInResults(key)}]"
        @click="TOGGLE_FILTER(key)"
        :src="job.src"
        :alt="`icon for ${job.src}`"/>
      <div class="ilevel" v-if="false">
        <span class="ilevel__text">iLevel range</span>
        <input class="ilevel__minmax" type="text" />
        <span class="ilevel__text">-</span>
        <input class="ilevel__minmax" type="text" />
      </div>
    </div>

    <div class="results">
      <div class="results__error" v-if="show.error">no results found</div>
      <ul class="recipe-list">
        <li class="recipe" v-for="recipe in matchedRecipes" :key="recipe.id">
          <img :src="favIcon" class="recipe__fav" />
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
    </div>
  </main>
</template>

<script>
  import favIcon from '@/assets/images/favourite.png'
  import jobIcons from '@/utils/jobIcons'
  import { jobMap } from '@/utils/enums'
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

  export default {
    name: 'HomePage',
    data () {
      return {
        searchTermInput: '',
        show: {
          error: false
        },
        search: {
          term: '',
          ilevel: {
            min: '',
            max: ''
          }
        },
        favIcon,
        jobMap,
        jobIcons
      }
    },
    methods: {
      ...mapActions([
        'FETCH_RECIPES'
      ]),
      ...mapMutations([
        'SET_SEARCHTERM',
        'TOGGLE_FILTER',
        'REMOVE_FILTER'
      ]),
      fetchRecipes () {
        if (!this.matchedRecipes && this.searchTermOkay) {
          this.FETCH_RECIPES({
            searchTerm: this.searchTermInput,
            searchTermList: this.searchTermList
          })
        }
      },
      filterIsApplied (jobCode) {
        return this.filters[jobCode]
      },
      jobInResults (jobCode) {
        return this.matchedJobs ? this.matchedJobs.includes(jobCode) : false
      },
      showError () {
        this.show.error = true
        setTimeout(() => {
          this.show.error = false
        }, 5000)
      }
    },
    computed: {
      ...mapState(['recipes', 'searchTerm', 'filters']),
      ...mapGetters(['matchedRecipes', 'matchedJobs']),
      totalMatchedRecipes () {
        return this.matchedRecipes.length
      },
      searchTermOkay () {
        return this.searchTermInput.length >= 3
      },
      jobs () {
        return jobIcons
      },
      searchTermList () {
        return this.searchTermInput
          .toLowerCase()
          .split(' ')
          .join(',')
      }
    },
    watch: {
      searchTermInput (newVal, oldVal) {
        this.SET_SEARCHTERM(newVal)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    grid-template-columns:
      20em
      minmax(400px, 1fr)
      minmax(0, 20em)
    ;
    grid-template-rows:
      2em
      3em
      3em
      1fr
    ;
    grid-template-areas:
      ". . ."
      ". search ."
      ". filters ."
      ". results ."
    ;
  }
  .search,
  .results {
    padding: 0 2em;
  }
  .search {
    grid-area: search;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &__input {
      width: 100%;
      padding-right: 7em;
    }
    &__button {
      transition: 0.5s;
      opacity: 0.5;
      cursor: pointer;
      position: absolute;
      right: 3.25em;
      border-radius: 2em;
      padding: 0.1em 1em;
      outline: none;
      border: 2px solid skyblue;
      background: none;
      color: skyblue;

      &:hover {
        opacity: 1;
      }
      &:disabled {
        filter: grayscale(1);
        opacity: 0.15;
        cursor: not-allowed;
      }
    }
  }
  .filters {
    grid-area: filters;
    display: flex;
    justify-content: center;
    align-items: center;

    .job-icon {
      cursor: pointer;
      margin: 0.1em;
      filter: grayscale(1);
      opacity: 0.25;
      transition: 0.5s;

      &:hover {
        opacity: 0.75;
      }
      &--in-results,
      &--selected {
        opacity: 1;
        &:hover {
          opacity: 1;
        }
      }
      &--in-results {
        filter: grayscale(0) hue-rotate(160deg);
        background: #161616;
      }
      &--selected {
        filter: grayscale(0) hue-rotate(0deg);
      }
    }
    .ilevel {
      display: flex;
      align-items: center;
      font-size: 10px;
      color: #ddd;
      background-color: #444;
      padding: 0.5em;
      border-radius: 0.25em;

      &__text {
        display: inline-block;
        padding: 0 0.5em;
      }
      &__minmax {
        height: auto;
        padding: 0.25em;
        border-radius: 1em;
        width: 3em;
        text-align: center;
      }
    }
  }
  .results {
    grid-area: results;
    display: flex;
    flex-direction: column;

    &__error {
      display: inline-block;
      align-self: center;
      padding: 0.75em 3em;
      background: transparentize(indianred, 0.65);
      color: indianred;
      margin: 1em;
      animation: alert 5s infinite;
    }
    .job-icon {
      cursor: pointer;
      filter: hue-rotate(160deg);
      &--selected {
        filter: hue-rotate(0deg);
      }
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
</style>
