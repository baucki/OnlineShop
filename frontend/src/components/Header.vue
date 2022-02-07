<template>
  <div class="header">
    <p v-if="username !== ''" class="loginLabel">Logged in as:</p>
    <p v-if="username !== ''" class="user" >{{username}}</p>
    <p class="title">Online-shop</p>
    <p class="subtitle">Generic line for site!</p>
    <router-link to="/">Home</router-link> |
    <router-link v-if="username === ''" to="/login">Login</router-link>
    <span v-if="username === ''"> | </span>
    <router-link v-if="username === ''" to="/register">Register</router-link>
    <router-link v-if="username !== ''" to="/cart">Cart</router-link>
    <span v-if="username !== ''"> | </span>
    <a class="clickable" @click="onLogout" v-if="username !== ''">Logout</a>
  </div>
</template>

<script>

import {mapActions} from 'vuex';

export default {
  name: "Header",

  computed: {
    username() {
      if (localStorage.username)
        return localStorage.username;
      else
        return '';
    }
  },
  methods: {
    ...mapActions(['logout']),
    onLogout() {
      this.logout().then(() => {
          if (this.$route.fullPath === '/') {
            this.$router.go(0);
          } else {
            this.$router.push({name: 'Home'});
          }
      });

    }
  }
}
</script>

<style scoped>

  .header {
    position: relative;
    font-style: italic;
    font-family: "Courier New";

  }

  .title {
    font-size: 50px;
    margin-bottom: -20px;
  }
  .user {
    position: absolute;
    top: 25px;
    left: 20px;
    font-size: 20px;
  }
  .loginLabel {
    position: absolute;
    top: 5px;
    left: 20px;
  }

</style>