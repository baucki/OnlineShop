<template>
  <div>
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
    <b-form-group class="mb-3" id="input-group-3" label="Repeat Password:" label-for="input-3">
      <b-form-input
          id="input-3"
          v-model="form.repeatedPassword"
          type="password"
          placeholder="Repeat Password"
          required
      ></b-form-input>
    </b-form-group>

    <b-button @click="onRegister" variant="primary">Register</b-button>
  </div>


</template>

<script>

import {mapActions} from 'vuex';

export default {
  name: "Register",

  data() {
    return {
      form: {
        username: "",
        password: "",
        repeatedPassword: "",
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    onRegister() {
      this.register(this.form).then(() => {
        this.$router.push({name: 'Home'});
      }).catch(msg => {
        alert(msg);
      });
    }
  }


}
</script>

<style scoped>

</style>