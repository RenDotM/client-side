<template>
  <div id="app">
    <header>
      <span>Ren.M
        <md-button >Login</md-button>
        <md-button >Sign up</md-button>
      </span>

            

    </header>
    <main>
      <div>
        <h1 align="left">Get</h2>
        <vue-good-table
          :columns="columns"
          :rows="calcRow"/>
      </div>
      <div align="left"> 
        <h1 align="left">POST</h2>
        <md-button
          @click="$emit('click', true)"
        >
          Post
      </md-button>
      </div>

      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      columns: [
        {
          label: 'User ID',
          field: 'user_id'
        },
        {
          label: 'Name',
          field: 'username'
        },
        {
          label: 'Password',
          field: 'password'
        },
        {
          label: 'Tenants',
          field: 'tenants'
        }
      ],
      info: '',
      errored: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:8081/users')
      .then(response => (this.info = response.data)).catch(error => {
        console.log(error)
        this.errored = true
      })
  },
  computed: {
    calcRow () {
      return this.info
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

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
