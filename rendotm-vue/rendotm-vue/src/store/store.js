import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost8081/'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    filter: 'all',
    todos: [],
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0
    },
    todosFiltered(state) {
      if (state.filter == 'all') {
        return state.todos
      } else if (state.filter == 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter == 'completed') {
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false,
      })
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'editing': todo.editing,
      })
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    retrieveTodos(state, todos) {
      state.todos = todos
    },
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
    clearTodos(state) {
      state.todos = []
    },
  },
  actions: {
    getUsers(payload) {
      console.log('getUsers access_token:' + JSON.stringify(localStorage.getItem('access_token')));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8081/users', { crossdomain: true })
        .then(response => {
          console.log('getUsers store response:' + JSON.stringify(response));
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    retrieveName(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      return new Promise((resolve, reject) => {
        axios.get('/user')
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    clearTodos(context) {
      context.commit('clearTodos')
    },
    register(context, data) {
      console.log('in register');
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8081/users', {
          name: this.name,
          email: this.email,
          phonenumber: this.phonenumber,
          password: this.password,
          address: this.address,
        })
          .then(response => {
            console.log('register store response:' + JSON.stringify(response));
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:8081/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
              // console.log(response);
              // context.commit('addTodo', response.data)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
    login(context, credentials) {
        console.log('in login of store.js');
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8081/login', {
          username: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            console.log('login store response.data.access_token:' + JSON.stringify(response.data.access_token));
            // login response.data.access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiMTIxMjEyMTIiLCJwYXNzd29yZCI6IjEyMTIxMjEyIn0sImlhdCI6MTU4MjI0NzQ4N30.q-192LqWBc_jRtdgFHAnSrvI8qa8YYdPMg_yE505BOo"
            const token = response.data.access_token

            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)
            // context.commit('addTodo', response.data)  
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
    },
    retrieveTodos(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/todos')
        .then(response => {
          context.commit('retrieveTodos', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTodo(context, todo) {
      axios.post('/todos', {
        title: todo.title,
        completed: false,
      })
        .then(response => {
          context.commit('addTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateTodo(context, todo) {
      axios.patch('/todos/' + todo.id, {
        title: todo.title,
        completed: todo.completed,
      })
        .then(response => {
          context.commit('updateTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteTodo(context, id) {
      axios.delete('/todos/' + id)
        .then(response => {
          context.commit('deleteTodo', id)
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkAll(context, checked) {
      axios.patch('/todosCheckAll', {
        completed: checked,
      })
        .then(response => {
          context.commit('checkAll', checked)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateFilter(context, filter) {

      context.commit('updateFilter', filter)

    },
    clearCompleted(context) {
      const completed = context.state.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id)

      axios.delete('/todosDeleteCompleted', {
        data: {
          todos: completed
        }
      })
        .then(response => {
          context.commit('clearCompleted')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
