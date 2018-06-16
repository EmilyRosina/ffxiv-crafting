<template>
  <main id="home-page">
    <div class="search">
      <input class="search__input" v-model.trim="searchTermInput" @keydown.enter="SET_SEARCHTERM(searchTermInput)" @keyup.enter="fetchRecipes()" />
      <button
        class="search__button--no-results"
        v-if="searchTermSubmitted && performedSearch && !hasRecipes">
        no results
      </button>
      <button
        v-else
        class="search__button"
        @mousedown="SET_SEARCHTERM(searchTermInput)"
        @mouseup="fetchRecipes()"
        :disabled="!searchTermOkay">
        search
      </button>
      <span class="search__clear" @click="clearSearchTermInput">✕</span>
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
      <RecipeList :matchedRecipes="filteredRecipes" v-if="hasRecipes" />
    </div>
  </main>
</template>

<script>
  import jobIcons from '@/utils/jobIcons'
  import { jobMap } from '@/utils/enums'
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import RecipeList from '@/components/RecipeList'

  export default {
    name: 'HomePage',
    components: {
      RecipeList
    },
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
        if (!this.hasRecipes && this.searchTermOkay) {
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
      clearSearchTermInput () {
        this.searchTermInput = ''
      }
    },
    computed: {
      ...mapState([
        'recipes',
        'searchTerm',
        'filters'
      ]),
      ...mapGetters([
        'hasRecipes',
        'matchedRecipes',
        'filteredRecipes',
        'matchedJobs',
        'savedRecipeIds',
        'performedSearch',
        'searchTermList'
      ]),
      searchTermOkay () {
        return this.searchTermInput.length >= 3
      },
      jobs () {
        return jobIcons
      },
      searchTermSubmitted () {
        return this.searchTermInput === this.searchTerm
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
    &__button,
    &__clear {
      transition: 0.5s;
      cursor: pointer;
      position: absolute;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
    &__button {
      right: 5em;
      border-radius: 2em;
      padding: 0.1em 1em;
      outline: none;
      border: 2px solid skyblue;
      background: none;
      color: skyblue;

      &--no-results {
        @extend .search__button;
        border-color: indianred;
        color: indianred;
      }
      &:disabled {
        filter: grayscale(1);
        opacity: 0.15;
        cursor: not-allowed;
      }
    }
    &__clear {
      right: 2.75em;
      color: #999;
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
</style>
