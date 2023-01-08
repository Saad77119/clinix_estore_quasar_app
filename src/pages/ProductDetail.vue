<template>
    <div class="q-pa-none">
        <div class="container" v-if="product" style="margin-bottom: 130px;">
            <div class="row" style="text-align: center;">
                <div class="col">
                    <img :src="'http://167.86.111.249/clinixestoreadmin/public'+product.img_url[0]" class="product_details_images" alt="Image"/>
                </div>
            </div>
            <q-separator />
            <div class="row" style="margin: 10px;">
                <div class="col-12">
                    <h6>
                        {{product.name}}
                    </h6>
                </div>

                <div class="col-6">
                    <p>4.3 <q-rating v-model="stars" :max="5" size="18px" style="color: #050544;" /></p>
                </div>

                <div class="col-6" style="text-align: right;">
                    <p>
                        Pack Size : {{product.pack_size}}
                    </p>
                </div>

                <div class="col-12">
                    <p style="font-size: 16px;">
                        <b>Description</b>
                    </p>
                    <p>{{product.detail}}</p>
                </div>
            </div>

            <div class="row" style="background: #f2f2f2; position: fixed; bottom: 0; width: 100%; padding: 10px;">
                <div class="col-6">
                    <p style="font-size: 18px;">
                        <b>Price</b>
                    </p>
                </div>

                <div class="col-6" style="text-align: right;">
                    <p style="font-size: 18px;">
                        Rs. {{price}}
                    </p>
                </div>
                <q-separator />

                <div class="col-6">
                    <p style="color: white;">
                        <q-btn style="background: #272758; font-size: 14px;" @click="addToCart(product.id)" label="Add To Cart"> </q-btn>
                    </p>
                </div>
                <div class="col-6" style="text-align: right;">
                    <p style="color: white;">
                        <q-btn v-if="quantity>1" style="background: #272758; font-size: 14px; border-radius: 0;" label="-" @click="quantity--" />
                        <q-btn style="background: #272758; font-size: 14px; border-radius: 0;" :label="quantity"> </q-btn>
                        <q-btn style="background: #272758; font-size: 14px; border-radius: 0;" label="+" @click="quantity++" />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductDetail",
        data() {
            return {
                product: false,
                quantity: 1,
                product_price: 0,
                price: 0,
                stars: 4,
            };
        },
        methods: {
            fetchProductDetails(id) {
                this.$api
                    .post("item/detail", null, {
                        params: {
                            item_id: id,
                        },
                    })
                    .then((response) => {
                        if (response.data.code == 200) {
                            this.product = response.data.data;
                            this.product_price = parseInt(response.data.data.price);
                            this.price = parseInt(response.data.data.price);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            addToCart(product_id) {
                this.$store.commit("addtocart", {
                    item_id: product_id,
                    quantity: this.quantity,
                    price: this.product.price,
                });
                this.$q.notify({
                    message: "Product added to cart.",
                });
            },
        },
        mounted: function () {
            this.fetchProductDetails(this.$route.params.id);
        },
        watch: {
            quantity: function (val) {
                this.price = this.product_price * this.quantity;
            },
        },
    };
</script>
