<template>
  <div id="app">
    <div class="main">
      <router-view :key="$route.query.question" />
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
  
  export default {
    methods: {
      ...mapActions(['getQuestions']),
    },
    mounted() {
      this.getQuestions();
    }
  }

</script>

<style lang="scss">

@use './assets/main.scss' as mixins;

$appFont: serif;

#app {
  font-family: $appFont;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .main {
    width: 100%;
    display: grid;
    place-items: center;
    max-height: 100%;
    min-height: 100vh;
  }
}

</style>
