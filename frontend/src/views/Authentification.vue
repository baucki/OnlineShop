<template>
  <div class="authentification">
    <div v-if="type === 'Login'" class="form">
      <Login  />
    </div>

    <div v-if="type === 'Register'" class="form">
      <Register />

    </div>

  </div>
</template>

<script>

import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: "Authentification",

  props: {
    type: String
  },

  components: {
    Login,
    Register
  }

}
</script>

<style scoped>

  .form {
    width: 40%;
    margin: auto;
    text-align: left;
  }

</style>