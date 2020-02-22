<template>
<v-card>
  <v-img
    height="120px"
    :src="require('@/assets/openDoor.jpg')">
    <v-container fill-height fluid>
      <v-layout>
        <v-flex xs12 align-end d-flex>
          <span class="headline white--text">Sign in</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>

  <v-card-text>
    <div class="error" v-html="error" />
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="username"
        label="Username"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Password"
        :rules="passwordRules"
        required
      ></v-text-field>

    </v-form>
  </v-card-text>

  <v-card-actions>
    <a class="link" @click="redirect">
      Forgot password?
    </a>
    <v-spacer></v-spacer>
    <v-btn
      color="primary"
      :disabled="!valid"
      @click="login">
      Login
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import AuthService from '@/services/Auth';

export default {
  data() {
    return {
      username: '',
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be more than 8 characters',
      ],
      error: null,
      valid: false,
      sitekey: '6Lf4G2gUAAAAANVI2ndLFcJUrzGm7qXUGndJbT4r',
    };
  },
  components: {
  },
  mounted() {
    this.valid = false;
  },
  methods: {

    login() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      })
        .then(response => {
          console.log('response from login' + JSON.stringify(response));
          // response from login{"data":{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiMTIzMTQxNDEyNDE0MiIsInBhc3N3b3JkIjoiMTIzMTQxNDEyNDE0MiJ9LCJpYXQiOjE1ODIyNDc2MDh9.ban4eSfvqNLFUOwtV3JO6yxPdtYXPnjmj3CfR6MJPVE"},"status":200,"statusText":"OK","headers":{"connection":"keep-alive","content-length":"208","content-type":"application/json; charset=utf-8","date":"Fri, 21 Feb 2020 01:13:28 GMT","etag":"W/\"d0-Ts1tH02Jkqv0QP1W20Sp2GEhVtQ\"","x-powered-by":"Express"},"config":{"url":"http://localhost:8081/login","method":"post","data":"{\"username\":\"1231414124142\",\"password\":\"1231414124142\"}","headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"},"baseURL":"http://localhost8081/","transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1},"request":{}}
          localStorage.setItem('access_token', response)
          this.$emit('done');
          this.$refs.form.reset();
          this.$router.push({ name: 'manage' })
        })
        .catch(error => {
          this.serverError = error.response.data
          this.password = ''
          this.successMessage = ''
        })
    },



    redirect() {
      this.$router.push('/forgotpassword');
      this.$emit('done');
    },
    onVerify(response) {
    },
  },
};
</script>

<style >
.link {
  font-size: 1.1em;
  padding-left: 15px;
  text-decoration: none;
}
.error {
  color: white;
  border-radius: 4px;
  padding-left: 4px;
}
</style>
