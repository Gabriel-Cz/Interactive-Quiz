<template>
    <div>
        <div class="question" >
            <h1 v-html="question"></h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: "QuizQuestion",
        props: {
            question: String
        }
    }
</script>

<style lang="scss" scoped>

@use '../../assets/main.scss' as mixins;

$fontQuestion: 22px 'Cursive';

.question {
    display: flex;
    justify-content: center;
    text-align: center;
    h1 {
        @include mixins.fadeInAnimation;
        font: $fontQuestion;
        padding: 0px 0px;
    }
}

</style>