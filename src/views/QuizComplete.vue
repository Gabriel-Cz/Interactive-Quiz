<template>
    <div>
        <div class="score-Wrapper">
            <h4>Score: {{ score }} / 10</h4>
            <router-link to="/quiz?question=0" class="link">
                <button @click="getQuestions" >New Quiz</button>
            </router-link>
        </div>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

    export default {
        name: "QuizComplete",
        computed: {
            ...mapState({
                score: state => state.score
            })
        },
        methods: {
            ...mapActions(['getQuestions'])
        }
    }
</script>

<style lang="scss" scoped>

.score-Wrapper {
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    .link {
        text-decoration: none;
    }
    h4 {
        font-size: 25px;
    }
    button {
        margin-top: 20px;
        transition: ease-in-out 0.5s;
        border: none;
        border-radius: 5px;
        font-size: 20px;
        font-weight: 600;
        color: floralwhite;
        padding: 10px 20px;
        background-color: rgba($color: rgb(55, 123, 224), $alpha: 0.75);
        box-shadow: 0px 10px 25px rgba($color: gray, $alpha: 0.3);
        &:hover {
            cursor: pointer;
            background-color: rgba($color: rgb(55, 123, 224), $alpha: 1);
        }
    }
}

@keyframes openModal {
    from {
        transform: translateY(20px); 
        opacity: 0;
        transition: ease-in-out 0.5s;
    } to {
        opacity: 1;
        transition: ease-in-out 0.5s;
    }
}

</style>