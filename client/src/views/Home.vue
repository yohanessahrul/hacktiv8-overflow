<template>
    <div class="question">
        <!-- <h1>Question</h1> -->
        <img width="100%;" src="http://octobergallery.com/wp-content/uploads/2012/10/bg-banner-art.jpg" alt="">
        <div class="list-question">
            <ul>
                <li v-for="(question, index) in questions" :key="index">
                    <h3 @click="goToDetailQuestion(question)"> {{ question.title }} </h3>
                    <p> {{ question.q }} </p>
                    <div class="attribute">
                        <ul>
                            <li>
                                <button @click="like(index, question._id)">Like {{ question.like.length }} </button>
                            </li>
                            <li>
                                <button @click="dislike(index, question._id)">Dislike {{ question.dislike.length }} </button>
                            </li>
                            <li>
                                <button @click="sendComment(index, question._id)" data-toggle="modal" data-target="#modalComment">Comments {{ question.comments.length }} </button>
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
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="comment"></textarea>
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
      idCommentClick: '',
      avail: false,
      availDislike: false
    }
  },
  created () {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    }
    this.$store.dispatch('getProfile')
    this.$store.dispatch('getAllQuestion')
    // this.profileId = this.$store.state.profile._id
    $('.navbar-collapse').collapse('hide')
  },
  computed: {
    ...mapState([
      'questions',
      'profile'
    ])
  },
  methods: {
    like (index, id) {
      let currentLike = this.$store.state.questions[index].like
      for (let i = 0; i < currentLike.length; i++) {
        if (currentLike[i] === localStorage.getItem('id')) {
          console.log('Data ada -', i + 1)
          this.avail = true
        }
      }

      if (this.avail === false) {
        let payload = {
          id: id,
          index: index
        }
        this.$store.dispatch('incLike', payload)
      } else {
        alert('Anda sudah pernak Like !!!')
      }
    },
    dislike (index, id) {
      let currentDislike = this.$store.state.questions[index].dislike
      for (let i = 0; i < currentDislike.length; i++) {
        if (currentDislike[i] === localStorage.getItem('id')) {
          console.log('Data ada -', i + 1)
          this.availDislike = true
        }
      }

      if (this.availDislike === false) {
        let payload = {
          id: id,
          index: index
        }
        this.$store.dispatch('incDislike', payload)
      } else {
        alert('Anda sudah pernak Dislike !!!')
      }
      // this.$store.dispatch('incDislike', index)
    },
    sendComment (index, id) {
      this.indexCommentClick = index
      this.idCommentClick = id
      $('#modalComment').on('hidden.bs.modal')
    },
    executeComment () {
      let payload = {
        id: this.idCommentClick,
        index: this.indexCommentClick,
        comment: this.comment
      }

      this.$store.dispatch('sendComment', payload)
      this.comment = ''

      $('#modalComment').modal('hide')
    },
    goToDetailQuestion (payload) {
      console.log('ter-klik => ', payload._id)
      this.$router.push({path: `/detailquestion/${payload._id}`})
    }
  }
}
</script>

<style scoped>
.image {
  width: 100%;
  background: green;
}
.profile {
  width: 100%;
  background: red;
}
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
  /* border: thin solid grey; */
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
.attribute > ul > li > button {
  color: rgb(41, 41, 41);
  font-size: 12px;
  /* background: white; */
  border: none;
  border-radius: 5px;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .image {
    padding: 10px;
    background: white !important;
  }
  .image > img {
    display: table;
    width: 70%;
    margin: 0 auto;
  }
  .profile {
    padding: 10px;
    background: rgb(250, 176, 64);
  }
  .profile > h1 {
    text-align: center;
    font-size: 22px;
    color: white;
    font-weight: bold;
  }
  .profile > h2 {
    text-align: center;
    font-size: 16px;
    margin-top: -10px;
    color: white;
  }
  .add-question {
    display: table;
    margin: 10px auto;
  }
  .list-question > ul {
    margin: 0px auto 0 auto;
    padding: 15px;
  }
  .list-question > ul > li {
    border: thin solid #dddddd;
    background: rgb(242, 241, 241);
    padding-bottom: 10px;
    margin-bottom: 12px;
  }
  .list-question > ul > li > h3 {
    padding: 10px;
    font-size: 18px;
    color: rgb(31, 31, 31);
  }
  .list-question > ul > li > p {
    margin-top: -10px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    color: rgb(72, 70, 70);
  }
  .attribute {
    /* background: teal; */
  }
  .attribute > ul {
    margin: -10px 0 0 10px;
    padding: 0;
  }
  .attribute > ul > li {
    padding: 3px;
  }
  .attribute > ul > li > span {
    color: #595959;
    font-size: 12px;
    border: thin solid #cdcdd3;
    padding: 3px 5px;
    border-radius: 3px;
  }
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {

}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .image {
    /* padding: 10px; */
    background: white !important;
  }
  .image > img {
    border: thin solid rgb(184, 183, 183);
    display: table;
    width: 70%;
    margin: 0 auto;
  }
  .profile {
    height: 100%;
    padding: 25px 10px 10px 10px;
    background: rgb(250, 176, 64);
  }
  .profile > h1 {
    text-align: center;
    font-size: 22px;
    color: white;
    font-weight: bold;
  }
  .profile > h2 {
    text-align: center;
    font-size: 16px;
    margin-top: -10px;
    color: white;
  }
  .add-question {
    display: table;
    margin: 10px auto;
  }
  .list-question > ul {
    margin: 0px auto 0 auto;
    padding: 15px;
  }
  .list-question > ul > li {
    border: thin solid #dddddd;
    background: rgb(242, 241, 241);
    padding-bottom: 10px;
    margin-bottom: 12px;
  }
  .list-question > ul > li > h3 {
    padding: 15px;
    font-size:23px;
    color: rgb(29, 28, 28);
  }
  .list-question > ul > li > p {
    margin-top: -15px;
    padding-left: 15px;
    font-size: 16px;
    color: rgb(72, 70, 70);
  }
  .attribute {
    /* background: teal; */
  }
  .attribute > ul {
    margin: -10px 0 0 10px;
    padding: 0;
  }
  .attribute > ul > li {
    padding: 3px;
  }
  .attribute > ul > li > span {
    color: #595959;
    font-size: 12px;
    border: thin solid #cdcdd3;
    padding: 3px 5px;
    border-radius: 3px;
  }
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {

}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {

  .profile {
    height: 100%;
    padding: 50px 10px 10px 10px;
    background: rgb(250, 176, 64);
  }
  .profile > h1 {
    text-align: center;
    font-size: 45px;
    color: white;
    font-weight: bold;
  }
  .profile > h2 {
    text-align: center;
    font-size: 20px;
    margin-top: -10px;
    margin-bottom: 40px;
    color: white;
  }
}
</style>
