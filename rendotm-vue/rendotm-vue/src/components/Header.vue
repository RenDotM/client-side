<template>
  <div id="header">
<v-app-bar class="black" dark app text fixed>
  <v-toolbar-title class="text-uppercase mr-4" to="/">
    <router-link class="title font-weight-light" to="/">
      Ren.M
    </router-link>
  </v-toolbar-title>

<v-spacer/><v-spacer/><v-spacer/>

  <auth-pop-up/>


</v-app-bar>
    <!-- <div class="login-form">
      <h2 class="login-heading">Login</h2>
      <form action="#" @submit.prevent="login">
        <div class="form-control">
          <label for="email">Username/Email</label>
          <input type="email" name="username" id="username" class="login-input" v-model="username">
        </div>
        <div class="form-control mb-more">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" class="login-input" v-model="password">
        </div>
        <div class="form-control">
          <button type="submit" class="btn-submit">Login</button>
        </div>
      </form>
    </div> -->
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import AuthPopUp from '@/components/AuthWindow/AuthPopUp.vue';

export default {
  name: 'header',
  components: {
    AuthPopUp,
  },
  computed: {
    // ...mapState({
    //   isUserLoggedIn: state => state.auth.isUserLoggedIn,
    // }),
  },
  methods: {

  }
}
</script>

<style >

</style>
