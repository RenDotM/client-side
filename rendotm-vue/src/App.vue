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
        <h1 align="left">Get</h1>
        <vue-good-table
          :columns="columns"
          :rows="calcRow"/>
      </div>
      <div align="left"> 
        <h1 >POST</h1>
        <!-- <form id="signup-form">
          <div class="field">
            <label class="label">User ID</label>
            <input type="text" class="input" name="userID">
          </div>
          <div class="field">
            <label class="label">Name</label>
            <input type="text" class="input" name="name">
          </div>
          <div class="field">
            <label class="label">Password</label>
            <input type="text" class="input" name="password">
          </div>
          <div class="field">
            <label class="label">Tenanats</label>
            <input type="text" class="input" name="tenanats">
          </div> -->
          <div class="field has-text-right">
            <button @click="SendForm" type="text" class="button is-danger">Submit</button>
          </div>
        <!-- </form> -->
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
      errored: false,
      getViaId: '',
      postById: '',
      deleteById: '',
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
    },
    PostById(payload) {
      console.log('PostById')
      console.log('payload' + JSON.stringify(payload))
      axios.post('http://`localhost`:8081/users/1',
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
      axios.delete('http://`localhost`:8081/users/1',
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
