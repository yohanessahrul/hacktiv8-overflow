<template>
  <div class="about">
    <h1>Login Page</h1>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary" @click="login">Submit</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log('Login User')
      console.log(this.email, '=', this.password)
      axios.post('http://35.198.199.127/api/users/login', {
        email: this.email,
        password: this.password
      })
        .then((response) => {
          let data = response.data
          console.log('response login =>', data)
          this.$store.dispatch('setProfile', data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          this.$router.push('/personalpage')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>

</style>
