<template>
<div class="cart">
  <Header />
  <div class="products">
    <CartProduct v-for="product in cart" :product="product.product"/>
  </div>

  <b-button v-if="cart.length > 0" class="button" variant="primary" @click="onBuy" >Buy</b-button>
  <p v-else style="height: 100%; margin-top: 25vh; font-size: 25px; ">Your cart is empty!</p>
</div>
</template>

<script>

import {mapState} from 'vuex';
import {mapActions} from 'vuex';

import Header from '@/components/Header.vue'
import CartProduct from '@/components/CartProduct.vue'

export default {
  name: "Cart",
  components: {
    Header,
    CartProduct
  },


  computed: {
    ...mapState(['cart'])
  },

  methods: {
    ...mapActions(['getCart', 'buy']),
    onBuy() {
      this.buy();
    }
  },
  mounted() {
    if (this.cart.length === 0) {
      this.getCart();
    }
  }


}
</script>

<style scoped>

.products {
  width: 60%;
  margin: auto;
}



</style>