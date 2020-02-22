<template>
  <div class="manage">
    <main>
        <div>
          <h1 align="left">Get</h1>
          <vue-good-table
              :columns="columns"
              :rows="calcRow"/>
          <button @click="getUsers" type="text" class="button is-danger">Submit</button>
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
  name: 'manage',
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
  mounted () {
  },
  computed: {
    calcRow () {
      return this.info
    }
  },
  methods: {
    getUsers(payload) {
     this.$store.dispatch('getUsers')
      .then(response => {
        console.log('response from getUsers' + JSON.stringify(response));
      })
    },
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
main {
  text-align: center;
  margin-top: 40px;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
