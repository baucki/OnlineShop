<template>
  <div class="product mb-3 col">
    <div v-if="product" class="wrapper">
      <img alt="product image" src="@/assets/no_image.jpg" class="image" @click="onClick" >
      <p class="title" @click="onClick" >{{ product.name }}</p>
      <p class="price" @click="onClick" >
        Price: {{product.price}}$
      </p>
        <b-button @click="onAddToCart" class="button" variant="primary">Add to cart</b-button>
    </div>
    <div v-else style="width: 100%; height: 100%; border: none "></div>
  </div>
</template>

<script>

import {mapActions} from 'vuex';

export default {


  name: "Product",

  props: {
    product: {}
  },
  methods: {
    ...mapActions(['addToCart']),
    onClick() {
      this.$router.push({name: 'ProductView', params: {product: this.product}})
    },
    onAddToCart() {
      if (localStorage.username === '') {
        this.$router.push({name: 'Login'});
        return;
      }
      this.addToCart(this.product);
      alert(this.product.name + ' has been added to your cart');
    }
  }

}
</script>

<style scoped>

.product {
  margin: 20px;
}

.wrapper {
  border: 1px solid gray;
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: white;
  cursor: pointer;
  /*box-shadow: 0 0 5px 1px gray;*/
}
.wrapper:hover {
  transform: scale(1.1);
}
.image {
  width: 100%;
}


</style>