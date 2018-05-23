<template>
    <div class="details">
        <!-- <h1>Ini detail dari pertanyyan</h1> -->
        <h1> {{ detailQuestion.title }} </h1>
        <h2> {{ detailQuestion.q }} </h2>
        <p>author: {{ detailQuestion.author }} </p>
        <p>Like: {{ detailQuestion.like.length }} </p>
        <p>Dislike: {{ detailQuestion.dislike.length }} </p>

        <h3>Comments</h3>
        <div class="comment">
            <ul>
                <li v-for="(komen, i) in detailQuestion.comments" :key="i">
                    <p> {{ komen.fullname }} </p>
                    <p> {{ komen.comment }} </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  name: 'DetailQuestion',
  computed: {
    ...mapState([
      'detailQuestion'
    ])
  },
  created () {
    let url = window.location.href.split('/')
    console.log(url)
    let id = url[url.length - 1]
    this.$store.dispatch('getDetailQuestion', id)
  }
}
</script>

<style>

</style>
