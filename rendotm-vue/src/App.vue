<template>
  <v-app id="app">
    <Header />
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-content>   
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'app',
  components: {
    Header,
  },
  // data () {
  //   return {
  //   }
  // },
  // methods: {
  // },
  // mounted () {
  // },
  // computed: {
  // },
}
</script>

<style>
</style>