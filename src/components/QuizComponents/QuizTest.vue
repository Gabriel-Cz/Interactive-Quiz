<template>
    <div id="QuizTest">
        <div class="quiz-Wrapper">
            <QuizQuestion :question="question" />
            <Modal v-show="modalState" />
            <div class="time-bar" :style="{ '--duration': timebarState, } " data-style="smooth">
                <div></div>
            </div>
            <div class="answers-Wrapper">
                <div 
                  v-for="answer in currentAnswers" 
                  :key="answer.index"
                  @click="sendAnswer(answer)"
                  class="answer-Span"
                >
                    <h4 v-html="answer"></h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import QuizQuestion from '@/components/QuizComponents/QuizQuestion';
import Modal from '@/components/Modal';

import { mapState, mapActions } from 'vuex'

    export default {
        name: "QuizTest",
        components: {
            QuizQuestion,
            Modal
        },
        computed: {
            ...mapState({
                question: state => state.currentQuestion.question, 
                currentAnswers: state => state.currentAnswers,
                modalState: state => state.modal.modalState,
                timebarState: state => state.timebar.timebarState
            }),
            
        },
        methods: {
            ...mapActions(['sendAnswer']),
        },
    }
</script>

<style lang="scss" scoped>

@use '../../assets/main.scss' as mixins;

$answerBorder: 2px ridge rgba($color: gray, $alpha: 0.2);
$answerBorderOnHover: 2px ridge rgba($color: blue, $alpha: 0.2);
$spanTransition: ease-in-out 0.5s;
$answerBorderRadius: 10px;

.quiz-Wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    transition: ease-in-out 0.5s;
    .time-bar[data-style="smooth"] {
        div {
            animation: roundTime calc(var(--duration) * 1s) linear forwards;
            transform-origin: left center;
            height: 5px;
            background: linear-gradient(to bottom, rgba($color: rgb(212, 63, 52), $alpha: 0.5), rgba($color: rgb(192, 44, 33), $alpha: 0.75));
        }
    }
}

.answers-Wrapper {
    @include mixins.fadeInAnimation;
    @include mixins.media(xs) {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: auto;
    }
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 50px;
    grid-row-gap: 50px;
    .answer-Span {
        padding: 25px 35px;
        box-shadow: 0px 10px 25px rgba($color: gray, $alpha: 0.3);
        border: $answerBorder;
        border-radius: $answerBorderRadius;
        transition: $spanTransition;
        &:hover {
            cursor: pointer;
            border-color: rgba($color: rgb(52, 52, 212), $alpha: 0.5);
            transition: $spanTransition;
            transform: translateY(-5px);
            color: rgba($color: rgb(52, 52, 212), $alpha: 1);
            box-shadow: 0px 12px 32px rgba($color: gray, $alpha: 0.3);
        }
    }
}

@keyframes roundTime {
    to {
        transform: scaleX(0);
    }
}

</style>