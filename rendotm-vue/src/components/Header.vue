<template>
  <div id="header">
    <header>
      <span>Ren.M
      </span>
    </header>
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
// import AuthPopUp from '@/components/AuthWindow/AuthPopUp.vue';

export default {
  name: 'header',
  components: {
    // AuthPopUp,
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
header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
