import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

class Modal {
  constructor(modalState, isCorrect) {
    this.modalState = modalState;
    this.isCorrect = isCorrect;
  }
}

class Timebar {
  constructor(timebarState, isRunning, timer) {
    this.timebarState = timebarState;
    this.isRunning = isRunning;
  }
}

const store = new Vuex.Store({
  state: {
    questions: [],
    currentQuestion: {},
    currentAnswers: [],
    modal: {
      modalState: false,
      isCorrect: false,
    },
    questionNumber: 0,
    score: 0,
    timebar: {
      timebarState: 0,
      isRunning: false,
    },
  },
  mutations: {
    setQuestions(state, payload) {
      state.questions = payload;
    },
    setCurrentQuestion(state, payload) {
      state.currentQuestion = payload;
    },
    setCurrentAnswers(state, payload) {
      state.currentAnswers = payload;
    },
    setModal(state, payload) {
      state.modal.modalState = payload.modalState;
      state.modal.isCorrect = payload.isCorrect;
    },
    setTimebar(state, payload) {
      state.timebar.timebarState = payload.timebarState;
      state.timebar.isRunning = payload.isRunning;
    },
    setAddPoints(state, payload) {
      state.score = state.score + payload;
    }
  },
  actions: {
    async getQuestions({commit, dispatch}) {
      let response = await axios.get(process.env.API);
      const question = response.data.results[0]; 
      commit('setQuestions', response.data.results);
      commit('setCurrentQuestion', question);
      dispatch('getAnswers', question);
      dispatch('activateTimebar');
    },
    modalAction({commit, dispatch}, modal) {
      commit('setModal', modal);
      dispatch('stopTimebar');
    },
    sendAnswer({commit, state, dispatch}, answer) {
      dispatch('stopTimebar');
      if (answer === state.currentQuestion.correct_answer) {
        dispatch('modalAction', new Modal(true, true));
        commit('setAddPoints', 1);
      } else {
        dispatch('modalAction', new Modal(true, false));
      }
    },
    getAnswers({commit}, question) {
      const formatedArray = [];
      formatedArray.unshift(...question.incorrect_answers);
      formatedArray.unshift(question.correct_answer);
      formatedArray.sort(() => Math.random() - 0.5);
      commit('setCurrentAnswers', formatedArray);
    },
    nextQuestion({commit, state, dispatch}, payload) {
      if( payload > this.getters.countQuestions ) {
        router.push({name: "QuizComplete"});
      } else {
        const question = state.questions[payload];
        commit('setCurrentQuestion', question);
        dispatch('getAnswers', question);
        dispatch('activateTimebar');
        router.replace({ name: "QuizPage", query: { question: payload } });
      }
    },
    activateTimebar({commit}) {
      commit('setTimebar', new Timebar(15, true));
      myTimer();
    },
    stopTimebar({commit}) {
      commit('setTimebar', new Timebar(0, false));
      stopTimer();
    }
  },
  getters: {
    countQuestions: state => state.questions.length - 1,
  },
  modules: {
  }
})

let timer;

function myTimer() {
  timer = setTimeout(() => {
    store.dispatch('modalAction', new Modal(true, false));
  }, 15000);
 }

function stopTimer() {
  clearTimeout(timer);
 }

export default store;