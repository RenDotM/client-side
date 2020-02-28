<template>
  <div id="main">
    <v-parallax
      dark
      :src="require('@/assets/house.jpg')"
      height="800">
      <v-layout
        align-center
        column
        justify-center>
        <h1 class="display-2 font-weight-thin mb-3">Ren.M</h1>
        <h4 class="subheading">Property Management Made Simpler</h4>
      </v-layout>
    </v-parallax>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'mainContent',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      })
        .then(response => {
          console.log('response.access_token from login' + JSON.stringify(response.access_token));
          this.$router.push({ name: 'manage' })
        })
        .catch(error => {
          this.serverError = error.response.data
          this.password = ''
          this.successMessage = ''
        })
    },
    logout() {
      this.$store.dispatch('clearTodos')
      this.$store.dispatch('destroyToken')
        .then(response => {
          this.$router.push({ name: 'home' })
        })
      },
  },
}
</script>

<style>

</style>
