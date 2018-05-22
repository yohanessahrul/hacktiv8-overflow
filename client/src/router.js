import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Registrasi from './views/Registrasi.vue'
import Login from './views/Login.vue'
import PersonalPage from './views/PersonalPage.vue'
import Question from './views/Question.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/registrasi',
      name: 'registrasi',
      component: Registrasi
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/personalpage',
      name: 'personalpage',
      component: PersonalPage
    },
    {
      path: '/question',
      name: 'question',
      component: Question
    }
  ]
})
