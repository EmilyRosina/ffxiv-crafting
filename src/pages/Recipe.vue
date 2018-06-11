<template>
  <main id="recipe-page">
    <h1 class="name">Recipe Name</h1>
  </main>
</template>

<script>
  export default {
    name: 'RecipePage'
  }
</script>

<style lang="scss" scoped>
  .main {
    padding: 4em;
    grid-template-columns:
      minmax(0px, 10em)
      minmax(400px, 1fr)
      minmax(0px, 10em)
    ;
    grid-template-rows:
      4em
      3em
      1fr
    ;
    grid-template-areas:
      ". name ."
      ". info ."
      ". content ."
    ;
  }
  .name {
    grid-area: name;
  }
</style>
