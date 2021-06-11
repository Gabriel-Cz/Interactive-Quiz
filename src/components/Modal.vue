<template>
    <div>
        <div class="modal">
           <div >
               <svg v-if="isCorrect" id="Layer_1" enable-background="new 0 0 512.063 512.063"  viewBox="0 0 512.063 512.063" width="50%" xmlns="http://www.w3.org/2000/svg"><g><g><ellipse cx="256.032" cy="256.032" fill="#00df76" rx="255.949" ry="256.032"/></g><path d="m256.032 0c-.116 0-.231.004-.347.004v512.055c.116 0 .231.004.347.004 141.357 0 255.949-114.629 255.949-256.032s-114.592-256.031-255.949-256.031z" fill="#00ab5e"/><path d="m111.326 261.118 103.524 103.524c4.515 4.515 11.836 4.515 16.351 0l169.957-169.957c4.515-4.515 4.515-11.836 0-16.351l-30.935-30.935c-4.515-4.515-11.836-4.515-16.351 0l-123.617 123.615c-4.515 4.515-11.836 4.515-16.351 0l-55.397-55.397c-4.426-4.426-11.571-4.526-16.119-.226l-30.83 29.149c-4.732 4.475-4.837 11.973-.232 16.578z" fill="#fff5f5"/><path d="m370.223 147.398c-4.515-4.515-11.836-4.515-16.351 0l-98.187 98.187v94.573l145.473-145.473c4.515-4.515 4.515-11.836 0-16.352z" fill="#dfebf1"/></g></svg>
               <svg v-else version="1.1" id="Capa_1" width="50%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                   <path style="fill:#FF3636;" d="M256,0C115.3,0,0,115.3,0,256s115.3,256,256,256s256-115.3,256-256S396.7,0,256,0z"/>
                   <path style="fill:#F40000;" d="M512,256c0,140.7-115.3,256-256,256V0C396.7,0,512,115.3,512,256z"/>
                   <polygon style="fill:#E7E7E7;" points="298.299,256 383.2,340.901 340.901,383.2 256,298.299 171.099,383.2 128.8,340.901 
	                213.701,256 128.8,171.099 171.099,128.8 256,213.701 340.901,128.8 383.2,171.099 "/>
                    <polygon style="fill:#D3D3D8;" points="298.299,256 383.2,340.901 340.901,383.2 256,298.299 256,213.701 340.901,128.8 
                    383.2,171.099 "/>
                   <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                </svg>
           </div>
           <button @click="closeModelAndAdvance(false, getNextNumber)">Next Question</button>
       </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
    export default {
        name: "Modal",
        methods: {
            ...mapActions(['modalAction', 'nextQuestion']),
            closeModelAndAdvance(modalState, questionNumber) {
                this.modalAction(modalState);
                this.nextQuestion(questionNumber);
            }
        },
        computed: {
            ...mapState({
                isCorrect: state => state.modal.isCorrect
            }),
            getNextNumber() {
                return parseInt(this.$route.query.question) + 1;
            }
        },
    }
</script>

<style lang="scss" scoped>

@use '../assets/main.scss' as mixins;

$bgButton: rgba($color: rgb(55, 123, 224), $alpha: 0.75);
$bgButtonHover: rgba($color: rgb(55, 123, 224), $alpha: 1);

.modal {
    @include mixins.media(xs) {
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow-y: hidden;
        padding-right: 15px;
    }
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: openModal 0.5s ease-in-out;
    width: 120%;
    height: 120%;
    z-index: 9;
    background-color: rgba($color: white, $alpha: 0.1);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    display: grid;
    place-items: center;
    button {
        @include mixins.customButton($bgButton, $bgButtonHover);
    }
}

@keyframes openModal {
    from {
        top: 0;
        left: 0;
        transform: translate(0); 
        opacity: 0;
        transition: ease-in-out 0.5s;
    } to {
        opacity: 1;
        transition: ease-in-out 0.5s;
    }
}

</style>