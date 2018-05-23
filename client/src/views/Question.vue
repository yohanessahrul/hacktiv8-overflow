<template>
    <div class="question">
        <h1>Question</h1>
        <div class="list-question">
            <ul>
                <li v-for="(question, index) in questions" :key="index">
                    <h3> {{ question.q }} </h3>
                    <div class="attribute">
                        <ul>
                            <li>
                                <button @click="like(index)">Like ({{ question.like }}) </button>
                            </li>
                            <li>
                                <button @click="dislike(index)">Dislike ({{ question.dislike }}) </button>
                            </li>
                            <li>
                                <button @click="sendComment(index, question._id)" data-toggle="modal" data-target="#modalComment">Comments ({{ question.comments.length }}) </button>
                                <!-- Modal -->
                                <div class="modal fade" id="modalComment" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalCenterTitle">Komentari</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1">Komentar anda</label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="comment"></textarea> komentari postingan ke- {{ indexCommentClick }}
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" @click="executeComment">Save changes</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </li>
                            <div class="clear"></div>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
const $ = window.$

export default {
  data () {
    return {
      comment: '',
      indexCommentClick: '',
      idClick: ''
    }
  },
  created () {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    }
    $('.navbar-collapse').collapse('hide')
  },
  computed: {
    ...mapState([
      'questions'
    ])
  },
  methods: {
    like (index) {
      this.$store.dispatch('incLike', index)
    },
    dislike (index) {
      this.$store.dispatch('incDislike', index)
    },
    sendComment (index, id) {
      this.indexCommentClick = index
      this.idClick = id
    },
    executeComment () {
      console.log(this.indexCommentClick)
      let payload = {
        id: this.idClick,
        index: this.indexCommentClick,
        comment: this.comment
      }
      this.$store.dispatch('sendComment', payload)
      this.comment = ''

      $('#modalComment').modal('hide')
    }
  }
}
</script>

<style scoped>
.clear {
  clear: both;
}
.list-question > ul {
  margin: 0;
  padding: 0;
}
.list-question > ul {
    width: 100%;
}
.list-question > ul > li {
  border: thin solid grey;
  width: 100%;
  float: left;
  list-style: none;
  background: yellow;
}
.attribute > ul > li {
  padding: 10px;
  float: left;
  list-style: none;
}
</style>
