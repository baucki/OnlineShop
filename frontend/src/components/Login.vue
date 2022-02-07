<template>
  <div class="login">
    <b-form-group class="mb-3" id="input-group-1" label="Username:" label-for="input-1">
      <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          placeholder="Enter Username"
          required
      ></b-form-input>
    </b-form-group>

    <b-form-group class="mb-3" id="input-group-2" label="Password:" label-for="input-2">
      <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Enter Password"
          required
      ></b-form-input>
    </b-form-group>

    <b-button @click="onSubmit" variant="primary">Login</b-button>
  </div>


</template>

<script>

import {mapActions} from 'vuex';



export default {
  name: "Login",

  data() {
    return {
      form: {
        username: "",
        password: "",
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form).then(() => {
        this.$router.push({name: 'Home'});
      }).catch( () => {
        alert('Wrong password or username!');
      });
    }
  },
}
</script>

<style scoped>

</style>