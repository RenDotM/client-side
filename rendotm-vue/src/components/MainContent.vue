<template>
  <div id="main">

    <div class="login-form">
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
    </div>


    <main>
        <div>
        <h1 align="left">Get</h1>
        <vue-good-table
            :columns="columns"
            :rows="calcRow"/>
        </div>
        <div align="left"> 
        <h1 >POST</h1>
            <div class="field has-text-right">
            <button @click="SendForm" type="text" class="button is-danger">Submit</button>
            </div>
        </div>
        <div align="left"> 
        <h1 >GET By ID</h1>
            <button @click="GetById('1')" type="text" class="button is-danger">Submit</button>
            {{getViaId}}
        </div>
        <div align="left"> 
        <h1 >POST By ID</h1>
            <button @click="PostById('1')" type="text" class="button is-danger">Submit</button>
            {{postById}}
        </div>
        <div align="left"> 
        <h1 >DELETE By ID</h1>
            <button @click="DeleteById('1')" type="text" class="button is-danger">Submit</button>
            {{deleteById}}
        </div>
        <router-view></router-view>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'mainContent',
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
      errored: false,
      getViaId: '',
      postById: '',
      deleteById: '',
      username: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    SendForm(payload) {
      console.log('SendForm')
      console.log('payload' + JSON.stringify(payload))
      axios.post('http://localhost:8081/users',
        {
          user_id: '3',
          username: 'cc@gmail.com',
          password: '4445',
          tenants: [1, 2, 3]
        },
        
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    GetById(payload) {
        console.log('GetById')
        console.log('payload' + JSON.stringify(payload))
        axios.get('http://localhost:8081/users/'+ payload)
        .then(response => (this.getViaId = response.data)).catch(error => {
          console.log(error)
          this.errored = true
        })
      },
    PostById(payload) {
      console.log('PostById')
      console.log('payload' + JSON.stringify(payload))
      axios.post('http://localhost:8081/users/1',
        {
          user_id: 'PostById',
          username: 'cc@gmail.com',
          password: '4445',
          tenants: [1, 2, 3]
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    DeleteById(payload) {
      console.log('PostById')
      console.log('payload' + JSON.stringify(payload))
      axios.delete('http://localhost:8081/users/1',
        {
          user_id: 'PostById',
          username: 'cc@gmail.com',
          password: '4445',
          tenants: [1, 2, 3]
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    login() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      })
        .then(response => {
          console.log('response from login' + JSON.stringify(response));
          this.loading = false
          this.$router.push({ name: 'hello' })
        })
        .catch(error => {
          this.loading = false
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


</style>
