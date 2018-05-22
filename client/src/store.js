import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    profile: [],
    myquestions: []
  },
  mutations: {
    statusLogin (state) {
      state.isLogin = true
    },
    setProfileMutation (state, payload) {
      console.log('masuk mutation => ', payload)
      state.profile = payload
    },
    getMyQuestionMutation (state, payload) {
      state.myquestions = payload
    },
    saveQuestionMutation (state, payload) {
      state.questions.push(payload)
    },
    incLikeMutation (state, index) {
      state.questions.forEach((data, i) => {
        if (index === i) {
          state.questions[i].like += 1
        }
      })
    },
    incDislikeMUtation (state, index) {
      state.questions.forEach((data, i) => {
        if (index === i) {
          state.questions[i].dislike += 1
        }
      })
    },
    sendCommentMutation (state, payload) {
      state.questions.forEach((data, i) => {
        if (payload.index === i) {
          state.questions[i].comments.push(payload.comment)
        }
      })
    }
  },
  actions: {
    getProfile ({commit}) {
      axios.get('http://localhost:3000/api/users/profile', {
        headers: { token: localStorage.getItem('token') }
      })
        .then((response) => {
          let data = response.data.data
          commit('setProfileMutation', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMyQuestion ({commit}) {
      axios.get('http://localhost:3000/api/questions/myquestion', {
        headers: { token: localStorage.getItem('token') }
      })
        .then((response) => {
          console.log('response my question => ', response)
          let data = response.data.data
          commit('getMyQuestionMutation', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    saveQuestion ({commit}, payload) {
      axios.post('http://localhost:3000/api/questions/addquestion', payload, {
        headers: { token: localStorage.getItem('token') }
      })
        .then((response) => {
          console.log(response)
          let data = response.data.data
          commit('saveQuestionMutation', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    incLike ({commit}, index) {
      commit('incLikeMutation', index)
    },
    incDislike ({commit}, index) {
      commit('incDislikeMUtation', index)
    },
    sendComment ({commit}, payload) {
      commit('sendCommentMutation', payload)
    }
  }
})
