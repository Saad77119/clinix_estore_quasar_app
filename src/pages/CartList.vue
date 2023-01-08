<template>
    <div class="q-pa-none">
        <div class="container" v-if="products.length > 0 || status">
            <div class="row" style="margin: 10px; padding-bottom: 170px;">
                <div class="col-12" v-for="product in products" v-bind:key="product.item_id">
                    <q-card class="my-card" style="padding: 20px;">
                        <div style="text-align: right;"><q-icon @click="removeCartItem(product.item_id)" name="delete_outline" style="font-size: 30px;"></q-icon></div>
                        <q-card-section horizontal>
                            <img v-if="product.images.length > 0" :src="'http://167.86.111.249/clinixestoreadmin/public/'+product.images[0].image_path+'/'+product.images[0].img_generated_name" class="cart_products_images" />

                            <q-card-section style="width: 100%;">
                                <b>{{ product.description }}</b><br />
                                <div class="">RS {{product.trade_price}}</div>
                                <br />
                                <p style="color: white; float: right;">
                                    <q-btn v-if="product.quantity>1" style="background: #272758; font-size: 14px; border-radius: 0;" label="-" @click="product.quantity--;total_price = parseInt(total_price) - parseInt(product.trade_price);updateCartDisable = false" />
                                    <q-btn style="background: #272758; font-size: 14px; border-radius: 0;" :label="product.quantity"></q-btn>
                                    <q-btn style="background: #272758; font-size: 14px; border-radius: 0;" label="+" @click="product.quantity++ ;total_price = parseInt(total_price) + parseInt(product.trade_price);updateCartDisable = false" />
                                </p>
                            </q-card-section>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-12 text-right q-mt-sm">
                    <q-btn color="black" label="Update Cart" :disable="updateCartDisable" @click="updateCart()"/>
                </div>
            </div>
            <div class="row" style="background: #f2f2f2; position: fixed; bottom: 0; width: 100%; padding: 20px;">
                <div class="col-6">
                    <p style="font-size: 18px;">
                        <b>Total Items</b>
                    </p>
                </div>
                <div class="col-6" style="text-align: right;">
                    <p style="font-size: 18px;">
                        {{products.length}}
                    </p>
                </div>
                <q-separator />
                <div class="col-6">
                    <p style="font-size: 18px;">
                        <b>Total Price</b>
                    </p>
                </div>
                <div class="col-6" style="text-align: right;">
                    <p style="font-size: 18px;">
                        Rs. {{total_price}}
                    </p>
                </div>
                <q-separator />
                <div class="col-12">
                    <q-btn color="red" label="Proceed To Checkout" style="width: 100%;" to="/checkout/details" />
                </div>
            </div>
        </div>
        <div class="container" style="padding-top: 15px;" v-else>
            <p class="text-caption text-center">No Product Found!</p>
        </div>
    </div>
</template>
<script>
    export default {
        name: "CartList",
        data() {
            return {
                status : true,
                updateCartDisable : true,
                products: [],
                total_price: 0,
            };
        },
        methods: {
            getCartDetails() {
                this.$q.loading.show();
                this.$api
                    .post("cart/list/local", {
                        cart: localStorage.getItem("cart"),
                    })
                    .then((response) => {
                        if (response.data.code == 200) {
                            this.products = response.data.data;
                            this.total_price = response.data.total_amount;
                        }
                        this.$q.loading.hide();
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                        console.log(error);
                    });
            },
            updateCart() {
                this.$store.commit("updateCart", { 
                    cart : this.products
                });
                this.$q.notify({
                    message: "Cart Updated.",
                });
            },
            removeCartItem(id) {
                this.$store.commit("removefromcart", {
                    item_id: id,
                });
                this.getCartDetails();
            },
        },
        mounted: function () {
            if (localStorage.getItem("cart") != null && localStorage.getItem("cart") != '[]') {
                this.getCartDetails();
            }
            else{
                this.status = false;
            }
        },
    };
</script>
