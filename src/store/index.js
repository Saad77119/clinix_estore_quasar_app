import Vue from "vue";
import Vuex from "vuex";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
    // localStorage.clear();
    const Store = new Vuex.Store({
        state: {
            cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
            auth_user: localStorage.getItem("auth_user") ? true : false,
        },
        mutations: {
            addtocart(state, payload) {
                var index = state.cart.findIndex((item) => item.item_id === payload.item_id);
                if (index == -1) {
                    state.cart.push(payload);
                } else {
                    state.cart[index].quantity = payload.quantity;
                }
                localStorage.setItem("cart", JSON.stringify(state.cart));
            },
            updateCart(state, payload) {
                state.cart = payload.cart;
                localStorage.setItem("cart", JSON.stringify(state.cart));
            },
            removefromcart(state, payload) {
                var index = state.cart.findIndex((item) => item.item_id === parseInt(payload.item_id));
                state.cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(state.cart));
            },
            updateAuthUser(state, payload) {
                state.auth_user = payload;
            },
        },
        modules: {
            // example
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEBUGGING,
    });

    return Store;
}
