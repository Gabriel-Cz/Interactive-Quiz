<template>
    <div>
        <div class="container">
            <QuizTest v-if="$route.path !== '/complete' " />
            <router-view v-else />
        </div>
    </div>
</template>

<script>

import QuizTest from '@/components/QuizComponents/QuizTest';

    export default {
        name: 'QuizPage',
        components: {
            QuizTest
        },
    }
</script>

<style lang="scss" scoped>

@use '../assets/main.scss' as mixins;

.container {
  @include mixins.fadeInAnimation;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  flex-direction: column;
}

</style>