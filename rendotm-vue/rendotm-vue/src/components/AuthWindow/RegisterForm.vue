<template>
<v-card>
  <v-img
    height="120px"
    :src="require('@/assets/welcome.jpg')">
    <v-container fill-height fluid>
      <v-layout>
        <v-flex xs12 align-end d-flex>
          <span class="headline white--text">Register</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>

  <v-card-text>
    <div class="error" v-html="error" />
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        type="text"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        type="email"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="phonenumber"
        type="text"
        label="Phone Number"
        required
      ></v-text-field>
      <v-text-field
        v-model="address"
        type="text"
        label="Address"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Password"
        required
      ></v-text-field>
 
    </v-form>
  </v-card-text>

  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
    color="primary"
    :disabled="!valid"
    @click="register">
      Register
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import AuthService from '@/services/Auth';

export default {
  data() {
    return {
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      phonenumber: '',
      phoneRules: [
        v => !!v || 'Phone number is required',
      ],
      address: '',
      addressRules: [
        v => !!v || 'Address is required',
      ],
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

    register() {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        phonenumber: this.phonenumber,
        password: this.password,
        address: this.address,
      })
        .then(response => {
          console.log('response from register' + JSON.stringify(response));
          //{"data":{"user":[{"user_id":"1","username":"ck43789@gmail.com","password":"abc123","tenants":[1,2,3]},{"user_id":"2","username":"ppui2567@gmail.com","password":"abc456","tenants":[1,2,3]},{},{},{},{},{}],"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNTgyMzM5NDE1fQ.x-u2uknaqiFmrpIO-3RWI-Mz8ySPdt8nkUFEkWdf8UM"},"status":200,"statusText":"OK","headers":{"connection":"keep-alive","content-length":"333","content-type":"application/json; charset=utf-8","date":"Sat, 22 Feb 2020 02:43:35 GMT","etag":"W/\"14d-HWaLPhyWi1m333YbY7eiA/lA7Io\"","x-powered-by":"Express"},"config":{"url":"http://localhost:8081/users","method":"post","data":"{}","headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"},"baseURL":"http://localhost8081/","transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1},"request":{}}
          localStorage.setItem('access_token', response.data.access_token)
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
