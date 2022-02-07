import Vue from 'vue'
import Vuex from 'vuex'
import product from "@/components/Product";
import cartProduct from "@/components/CartProduct";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    id: 0,
    token: '',
    username: "",
    products: [],
  },
  mutations: {
    removeComment(state, comment) {
      state.products.forEach(product => {
        if (product.id === comment.productID) {
          product.comments = product.comments.filter(productComment => productComment.id !== comment.id);

        }
      })
    },
    addComment(state, comment) {
      let updatedProduct = state.products.filter(product => product.id === comment.productID)[0];
      updatedProduct.comments.push(comment);
    },
    unsetCart(state, product) {
      state.cart = state.cart.filter(cartProduct => cartProduct.productID !== product.id);
    },
    setCart(state, product) {
      state.cart.push(product);
    },
    setProducts(state, products) {
      state.products = products;
    },
    setUser(state, user) {
      if (user == null) {
        state.username = '';
        state.id = 0;
        localStorage.username = '';
        localStorage.id = 0;
        return;
      }
      state.id = user.id;
      state.username = user.username;
      localStorage.id = user.id;
      localStorage.username = user.username;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.token = token
    }
  },
  actions: {
    removeFromCart({commit}, product) {
      commit('unsetCart', product);
      fetch('https://sj-projekat-api-2021.herokuapp.com/user/carts', {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          productID: product.id,
        })
      }).then(result => {
        result.json().then( (object) => {
        });
      });
    },
    buy({commit, state}) {
      state.cart.forEach(cartProduct => {
        commit('unsetCart', cartProduct.product);
      });
      fetch('https://sj-projekat-api-2021.herokuapp.com/user/carts/all', {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          userID: parseInt(localStorage.id)
        })
      }).then(result => {
        result.json().then( (object) => {
        });
      });
    },
    getCart({commit}) {
      fetch(`https://sj-projekat-api-2021.herokuapp.com/user/carts/${parseInt(localStorage.id)}`).then(result => {
        result.json().then(products => {
          products.forEach(product => {
            commit('setCart', product);
          })
        });
      })
    },
    addToCart({commit, state}, product, ) {
      fetch('https://sj-projekat-api-2021.herokuapp.com/user/carts', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          userID: parseInt(localStorage.id),
          productID: product.id,
          quantity:  1
        })
      }).then(result => {
        result.json().then( (object) => {
          commit('setCart', object);
        });
      });
    },
    getProducts({commit}) {
      fetch('https://sj-projekat-api-2021.herokuapp.com/user/products').then(result => {
        result.json().then(products => {
          commit('setProducts', products);
        });
      })
    },
    login({commit}, form) {
      return new Promise((resolve, reject) => {
        fetch('https://sj-projekat-auth-2021.herokuapp.com/login', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            username: form.username,
            password: form.password
          })
        }).then(result => {
          result.json().then( (object) => {
            commit('setUser', object.user);
            commit('setToken', object.token);
            return resolve();
          }).catch(() => {
            reject();
          })
        }).catch(() => {
          reject();
        })
      });
    },

    logout({commit}) {
     return new Promise(resolve => {
        commit('setUser', null);
        commit('setToken', '');
        resolve();
      });
    },
    register({commit}, form) {
      return new Promise((resolve, reject) => {

        if (form.username.length < 3 || form.username.length > 8) {
          return reject('Username must be between 3-8 characters!');
        }

        if (form.password.length < 8) {
          return reject('Password must be at least 8 characters long');
        }

        if (form.password !== form.repeatedPassword) {
          return reject(null);
        }
        fetch('https://sj-projekat-auth-2021.herokuapp.com/register', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            username: form.username,
            password: form.password
          })
        }).then(result => {
          result.json().then( (object) => {
            commit('setUser', object.user);
            commit('setToken', object.token);
            resolve();
          }).catch(() => {
            reject();
          })
        }).catch(() => {
          reject();
        });
      });
    },
    socket_add({commit}, msg) {
      commit('addComment', JSON.parse(msg));
    },
    socket_remove({commit}, msg) {
      commit('removeComment', JSON.parse(msg));
    }
  }
})
