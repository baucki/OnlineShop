<template>
  <div class="cart-product">
    <img alt="product image" src="@/assets/no_image.jpg" class="image">
    <p class="title">{{ product.name }}</p>
    <p class="price">
      Price: {{product.price}}$
    </p>
    <b-button class="button" variant="danger" @click="onRemoveFromCart">Remove from cart</b-button>
  </div>
</template>

<script>

import {mapActions} from 'vuex'

export default {
  name: "CartProduct",

  props: {
    product: {}
  },
  methods: {
    ...mapActions(['removeFromCart']),
    onRemoveFromCart() {
      this.removeFromCart(this.product);
    }
  },
  actions: {

  }

}
</script>

<style scoped>

* {
  margin: auto;
}

.cart-product {
  margin: 20px;
  display: flex;
  border: 1px solid gray;
}

.image {
  width: 20%;
}


</style>