import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QuizTest from '../components/QuizComponents/QuizTest'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/quiz',
    name: 'QuizPage',
    alias: ['/quiz?question=1', '/quiz?question=2', '/quiz?question=3',] ,
    children: [
      {
        path: '/complete',
        name: 'QuizComplete',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/QuizComplete.vue')
        }
      }
    ],
    component: function () {
      return import(/* webpackChunkName: "QuizPage" */ '../views/QuizPage.vue')
    },
  },
]

const router = new VueRouter({
  routes
})

export default router
