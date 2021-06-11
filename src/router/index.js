import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
