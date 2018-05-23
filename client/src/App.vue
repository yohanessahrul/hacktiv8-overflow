<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Hacktiv Overflow</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link"><router-link to="/">Home</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><router-link to="/personalpage">Personal Page</router-link></a>
            </li>
          </ul>
          <!-- <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> -->
          <button @click="logout">Logout</button>
        </div>
      </nav>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/registrasi">Registrasi</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/personalpage">Personal Page</router-link> |
      <router-link to="/question">Question</router-link> |
      <button @click="logout">Logout</button> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
const $ = window.$

export default {
  data () {
    return {
      isLogin: false
    }
  },
  name: 'app',
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
      $('.navbar-collapse').collapse('hide')
    }
  }
}
</script>
<style scoped>

</style>
