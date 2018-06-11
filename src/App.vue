<template>
  <main-layout id="app">
    <router-view/>
  </main-layout>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'App',
    methods: {
      ...mapActions([
        'FETCH_FAV_RECIPES'
      ])
    },
    created () {
      this.FETCH_FAV_RECIPES()
    }
  }
</script>
