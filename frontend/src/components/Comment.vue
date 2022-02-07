<template>
<div class="comment">
  <p class="username">{{comment.user.username}}:</p>
  <div class="wrapper">
    <p class="content">{{comment.content}}</p>
    <b-button v-if="comment.user.username === username" @click="onDelete" class="button" variant="danger">Delete</b-button>
  </div>
</div>
</template>

<script>
export default {
  name: "Comment",

  props: {
    comment: {}
  },
  computed: {
    username() {
      if (localStorage.username)
        return localStorage.username;
      else
        return '';
    }
  },
  methods: {
    onDelete() {
      this.$socket.emit('remove', {token: localStorage.token, comment: this.comment});
    }
  }


}
</script>

<style scoped>

.username {
  font-weight: bold;
  text-align: left;
}

.content {
  text-align: left;
}

.wrapper {
  display: flex;
  justify-content: space-between;
}

.comment {
  border: 1px solid gray;
  padding: 5px;
  margin-bottom: 15px;
}


</style>