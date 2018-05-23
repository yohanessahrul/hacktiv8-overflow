<template>
    <div class="registrasi">
        <h1>Halaman Registrasi</h1>
        <form>
        <div class="form-group">
            <label>Fullname</label>
            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter fullname" v-model="fullname">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary" @click="registrasi">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Registrasi',
  data () {
    return {
      fullname: '',
      email: '',
      password: ''
    }
  },
  methods: {
    registrasi () {
      axios.post('http://localhost:3000/api/users/register', {
        fullname: this.fullname,
        email: this.email,
        password: this.password
      })
        .then((response) => {
          let data = response.data.response
          console.log('response register =>', data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
