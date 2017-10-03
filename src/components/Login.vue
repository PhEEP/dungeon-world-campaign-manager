<template>
<div class="ui middle aligned center aligned centerAligned grid login">
  <div class="column ui segment">
    <h2 class="ui orange image header">
      <img src="http://placehold.it/50x50?color=red" alt="" class="image">
      <div class="content">Speak, friend, and enter</div>
    </h2>
    <div class="ui large form">
      <div class="ui stacked segment">
        <div class="field" :class="">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" placeholder="Email" v-model="email">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" placeholder="Password" v-model="password">
          </div>
        </div>
        <button class="ui fluid large orange submit button" @click="login">Log In</button>
        <button class="ui fluid large blue submit button" @click="loginWithGoogle" >With Google</button>
      </div>
    </div>
    <div class="ui message">
      <p>Don't have an account?
        <router-link to="/signup">Create one!</router-link>
      </p>
    </div>
  </div>
</div>

</template>

<script>
import firebase from 'firebase'
import { handleUserLogin } from '../helpers/handleUserLogin'
const provider = new firebase.auth.GoogleAuthProvider()
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(
        (user) => {
          handleUserLogin(user)
          this.$router.replace('hello')
        },
        (err) => {
          console.log(err)
          alert('Oops, ' + err.message)
        }
      )
    },
    loginWithGoogle () {
      firebase.auth().signInWithPopup(provider)
      .then(
        (user) => {
          handleUserLogin(user)
          this.$router.replace('hello')
        },
        (err) => {
          console.log(err)
          alert('Oops, ' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
.centerAligned {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.grid {
  height:100%;
}
.column {
  max-width:400px;
}
/* replace this with some calculated image from an api or something */
.login {
  background-image: url('https://placeimg.com/1920/1080/nature');
  background-size: cover;
  background-position: center;
  background-repeat:no-repeat;
}
</style>
