<template>
<v-layout align-center>
  <v-dialog v-model="dialog" max-width="460px">
    <template v-slot:activator="{ on: { click } }">

      <v-btn rounded text @click=click dark>Login / Register</v-btn>
    </template>
      <v-tabs
        color="cyan"
        slider-color="yellow"
        dark right
      >
        <v-tab ripple>
          Login
        </v-tab>
        <v-tab ripple>
          Sign Up
        </v-tab>
        <v-tab-item>
          <login-form @done="dialog = false"/>
        </v-tab-item>
        <v-tab-item>
          <register-form @done="dialog = false"/>
        </v-tab-item>
      </v-tabs>

  </v-dialog>
</v-layout>
</template>

<script>
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

export default {
  name: 'AuthPopUp',
  components: {
    LoginForm,
    RegisterForm,
  },
  data: () => ({
    dialog: false,
  }),
};
</script>
