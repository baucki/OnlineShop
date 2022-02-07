<template>
  <div class="product-view">
    <Header />
    <div class="wrapper">
      <img alt="product image" src="@/assets/no_image.jpg" class="image">
      <div class="product-info">
        <p>{{ product.name }}</p>
        <p class="description">Generic product description. Generic product description. Generic product description. </p>
        <p>Price: {{product.price}}$</p>
        <b-button class="button" variant="primary" @click="onAddToCart" >Add to cart</b-button>
      </div>
    </div>
    <div class="comments">
      <p class="comments-title">Comments:</p>
      <p v-if="product.comments.length === 0" class="no-comments">No comments available !</p>
      <Comment  v-else v-for="comment in product.comments" :comment="comment"/>
      <hr />
      <div class="new-comment">
        <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="New comment"
            rows="4"
            max-rows="4"
        ></b-form-textarea>

        <b-button @click="onComment" class="button" variant="primary">Comment</b-button>
      </div>
    </div>
  </div>

</template>

<script>
import Header from "@/components/Header";
import Comment from "@/components/Comment";
import {mapActions, mapState} from "vuex";

export default {
  name: "ProductView",
  components: {
    Header,
    Comment
  },

  data() {
    return {
      text: ''
    }
  },

  props: {
    product: {}
  },

  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['addToCart']),
    onAddToCart() {
      if (localStorage.username === '') {
        this.$router.push({name: 'Login'});
        return;
      }
      this.addToCart(this.product);
      alert(this.product.name + ' has been added to your cart');
    },
    onComment() {
      this.$socket.emit('add', {

        token: (localStorage.token)? localStorage.token : '',
        userID: parseInt(localStorage.id),
        productID: this.product.id,
        text: this.text
      });

      this.text='';
    }
  }

}
</script>

<style scoped>

.wrapper {
  display: flex;
  width: 70%;
  margin: auto;
  margin-top: 40px;
  border: 1px solid gray;
}

.image {
  width: 40%;
}

.product-info {
  height: 50%;
  width: 60%;
  margin: auto;
}

.description {
  width: 50%;
  margin: auto;
  margin-bottom: 20px;
}

.comments {
  width: 70%;
  margin: auto;
  margin-top: 30px;
}

.comments-title {
  /*font-weight: bold;*/
  text-align: left;
  margin-bottom: 40px;
}

.new-comment {
  position: relative;
  width: 80%;
  margin:auto;
}

.new-comment .button {
  position: absolute;
  right: 0;
  margin-top: 15px;
}

</style>