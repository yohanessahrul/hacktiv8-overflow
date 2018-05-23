<template>
  <div class="personal-page">
    <div class="container">
      <div style="margin-top: 20px;" class="row">
          <div class="col-md-4">
            <div class="image">
              <img src="https://www.esparkinfo.com/wp-content/uploads/2016/08/default-avatar.png" alt="">
            </div>
          </div>
          <div class="col-md-8">
            <div class="profile">
              <h1> {{ profile.fullname }} </h1>
              <h2> {{ profile.email }} </h2>
              <button class="btn btn-primary add-question" data-toggle="modal" data-target="#modalAddQuestion">Add Question</button>
                <!-- Modal -->
                <div class="modal fade" id="modalAddQuestion" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Add Question</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Title Question</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="titleQuestion" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlTextarea1">Your Question</label>
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="inputQuestion" placeholder="Your Question here..."></textarea>
                        </div>
                        <!-- <textarea id="mytextarea" @keyup="rekamKetik()"></textarea> -->
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="saveQuestion">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <!-- <div class="row"> -->
        <div class="list-question">
          <ul>
            <li v-for="(myquestion, index) in myquestions" :key="index">
              <button class="btn-del" @click="deleteQuestion(myquestion._id, index)">X</button>
              <h3 @click="goToDetailQuestion(myquestion)"> {{ myquestion.title }} </h3>
              <p> {{ myquestion.q }} </p>
              <div class="attribute">
                <ul>
                  <li>
                    <span> Like {{ myquestion.like.length }} </span>
                  </li>
                  <li>
                    <span> Dislike {{ myquestion.dislike.length }} </span>
                  </li>
                  <li>
                    <span> Comment {{ myquestion.comments.length }} </span>
                  </li>
                  <div class="clear"></div>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const $ = window.$

export default {
  data () {
    return {
      titleQuestion: '',
      inputQuestion: ''
    }
  },
  created () {
    $('.navbar-collapse').collapse('hide') // tutup navbar menu
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    }
    this.$store.dispatch('getProfile')
    this.$store.dispatch('getMyQuestion')
  },
  computed: {
    ...mapState([
      'myquestions',
      'profile'
    ])
  },
  methods: {
    saveQuestion () {
      let payload = {
        title: this.titleQuestion,
        question: this.inputQuestion
      }
      this.$store.dispatch('saveQuestion', payload)
      console.log('create question functio !!!')
      $('#modalAddQuestion').modal('hide')
    },
    deleteQuestion (id, index) {
      if (confirm('Yakin mau hapus?')) {
        let payload = {
          id: id,
          index: index
        }
        this.$store.dispatch('deleteQuestion', payload)
      }
    },
    goToDetailQuestion (payload) {
      console.log('ter-klik => ', payload._id)
      this.$router.push({path: `/detailquestion/${payload._id}`})
    }
  }
}
</script>

<style scoped>
.row {
  background: orange;
  margin: 0 15px; 
}
.image {
  width: 100%;
  /* background: green; */
}
.profile {
  width: 100%;
  /* background: red; */
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
  position: relative;
  width: 100%;
  float: left;
  list-style: none;
  background: yellow;
}
.btn-del {
  background: rgb(211, 211, 211) !important;
  border-radius: 5px;
  color: white;
  border: none;
  padding: -3px;
  font-size: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
}
.attribute > ul > li {
  padding: 10px;
  float: left;
  list-style: none;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .image {
    padding: 10px;
    /* background: white !important; */
  }
  .image > img {
    padding: 10px;
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
    position: relative;
    border: thin solid #dddddd;
    /* background: rgb(242, 241, 241); */
    background: #e8e8e8;
    padding-bottom: 10px;
    margin-bottom: 8px;
  }
  .list-question > ul > li > h3 {
    /* back */
    padding: 10px;
    font-size: 18px;
    color: rgb(31, 31, 31);
  }
  .list-question > ul > li > p {
    margin-top: -10px;
    padding-left: 10px;
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
    /* background: white !important; */
  }
  .image > img {
    /* border: thin solid rgb(184, 183, 183); */
    padding: 10px;
    display: table;
    width: 70%;
    margin: 0 auto;
  }
  .profile {
    height: 100%;
    padding: 25px 10px 10px 10px;
    /* background: rgb(250, 176, 64); */
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
    /* background: red; */
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
    /* background: rgb(250, 176, 64); */
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
