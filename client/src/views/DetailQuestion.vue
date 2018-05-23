<template>
    <div class="detailsquestion">
      <div class="wrapdetail">
        <div class="profiles">
          <!-- <div class="image">
            <img src="" alt="">
          </div> -->
          <h2> {{ detailQuestion.title }} </h2>
        </div>
        <!-- <h1>Ini detail dari pertanyyan</h1> -->
        <!-- <h1> {{ detailQuestion.title }} </h1> -->
        <h2> {{ detailQuestion.q }} </h2>
        <p>author: {{ detailQuestion.author.fullname }} </p>
        <p>Like: {{ detailQuestion.like.length }} </p>
        <p>Dislike: {{ detailQuestion.dislike.length }} </p>

        <h3>Comments ({{ detailQuestion.comments.length }})</h3>
        <div class="comment">
            <ul>
                <li v-for="(komen, i) in detailQuestion.comments" :key="i">
                    <p> {{ komen.fullname }} </p>
                    <p> {{ komen.comment }} </p>
                </li>
            </ul>
        </div>
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

<style scoped>
.wrapdetail {
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  height: 500px;
}
.profiles {
  border-bottom: thin solid rgb(190, 190, 190);
}
.profiles > h2 {
  font-size: 22px;
}
.images {
  width: 25px;
  height: 25px;
  background: grey;
  float: left;
  margin-right: 10px;
}
</style>
