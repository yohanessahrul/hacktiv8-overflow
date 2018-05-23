import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    profile: [],
    myquestions: [],
    questions: [],
    detailQuestion: ''
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
    getAllQuestionMutation (state, payload) {
      state.questions = payload
      console.log('====>>>', payload)
    },
    saveQuestionMutation (state, payload) {
      state.myquestions.push(payload)
    },
    incLikeMutation (state, payload) {
      let countFind = 0
      state.questions.forEach((data, i) => {
        if (payload.index === i) {
          console.log('INDEX SAMA')
          countFind += 1
        }
      })
      if (countFind > 0) {
        state.questions[payload.index].like.push(localStorage.getItem('id'))
      }
    },
    incDislikeMUtation (state, payload) {
      let countFind = 0
      state.questions.forEach((data, i) => {
        if (payload.index === i) {
          console.log('INDEX SAMA')
          countFind += 1
        }
      })
      if (countFind > 0) {
        state.questions[payload.index].dislike.push(localStorage.getItem('id'))
      }
    },
    sendCommentMutation (state, payload) {
      state.questions.forEach((data, i) => {
        if (payload.index === i) {
          state.questions[i].comments.push(payload.comment)
        }
      })
    },
    deleteQuestionMutation (state, payload) {
      state.myquestions.splice(payload.index, 1)
    },
    getDetailQuestionMutation (state, payload) {
      state.detailQuestion = payload
    }
  },
  actions: {
    getProfile ({commit}) {
      axios.get('http://35.198.199.127/api/users/profile', {
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
    getAllQuestion ({commit}) {
      axios.get('http://35.198.199.127/api/questions/allquestion')
        .then((response) => {
          let data = response.data.data
          commit('getAllQuestionMutation', data)
          console.log(data)
        })
        .catch()
    },
    getMyQuestion ({commit}) {
      axios.get('http://35.198.199.127/api/questions/myquestion', {
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
      axios.post('http://35.198.199.127/api/questions/addquestion', payload, {
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
    deleteQuestion ({commit}, payload) {
      axios.delete(`http://35.198.199.127/api/questions/deletequestion/${payload.id}`)
        .then((response) => {
          let data = response.data.data
          console.log(data)
          commit('deleteQuestionMutation', payload)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    incLike ({commit}, payload) {
      axios.get(`http://35.198.199.127/api/questions/like/${payload.id}`,{
        headers: {token: localStorage.getItem('token')}
      })
        .then((response) => {
          console.log('response dari axios sukses', response)
          commit('incLikeMutation', payload)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    incDislike ({commit}, payload) {
      console.log('masuk ke store action')
      axios.get(`http://35.198.199.127/api/questions/dislike/${payload.id}`,{
        headers: {token: localStorage.getItem('token')}
      })
        .then((response) => {
          console.log('response dari axios sukses', response)
          commit('incDislikeMUtation', payload)
        })
        .catch((err) => {
          console.log(err)
        })
      // commit('incDislikeMUtation', index)
    },
    sendComment ({commit}, payload) {
      console.log('masuk ke store ACTION', payload.id)
      axios.post(`http://35.198.199.127/api/questions/comment/${payload.id}`,
        {comment: payload.comment},
        { headers: {token: localStorage.getItem('token')} }
      )
        .then((response) => {
          console.log('res ACTION==>', response)
          commit('sendCommentMutation', payload)
        })
    },
    getDetailQuestion ({commit}, id) {
      console.log('masuk ke store action dengan ID ==', id)
      axios.get(`http://35.198.199.127/api/questions/detailquestion/${id}`, {
        headers: { token: localStorage.getItem('token') }
      })
        .then((response) => {
          let data = response.data.data
          commit('getDetailQuestionMutation', data)
        })
        .catch((err) => {
          console.log('response error dari axios', err)
        })
    }
  }
})
