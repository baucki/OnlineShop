<template>
  <div class="home">
    <Header />
    <div class="products container">
      <div v-for="i in Math.ceil(products.length/3.0)" class="row">
        <Product v-for="j in 3" v-if="products.length > (i-1)*3+(j-1)" :product="products[(i-1)*3+(j-1)]"/>
        <Product v-else />
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Product from '@/components/Product.vue'

import {mapState, mapActions} from 'vuex';

export default {
  name: 'Home',
  components: {
    Header,
    Product
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['getProducts'])
  },
  mounted() {
    this.getProducts();
  }
}
</script>

<style scoped>

.products {
  width: 60%;
  margin: auto;
  margin-top: 30px;
}

</style>