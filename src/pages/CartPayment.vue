<template>
    <div class="q-pa-none">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <p style="background: lightgrey; padding: 15px; font-size: 20px;"><b>User Details</b></p>
                </div>
                <div class="col-12">
                    <div class="row" style="padding: 0px 15px;">
                        <div class="col-2">
                            <q-icon name="badge" style="font-size: 30px;"></q-icon>
                        </div>
                        <div class="col-10">
                            <p style="font-size: 16px;">Tayyab Rasool</p>
                        </div>
                    </div>
                    <div class="row" style="padding: 0px 15px;">
                        <div class="col-2">
                            <q-icon name="email" style="font-size: 30px;"></q-icon>
                        </div>
                        <div class="col-10">
                            <p style="font-size: 16px;">tayyabrasool733@gmail.com</p>
                        </div>
                    </div>
                    <div class="row" style="padding: 0px 15px;">
                        <div class="col-2">
                            <q-icon name="phone_iphone" style="font-size: 30px;"></q-icon>
                        </div>
                        <div class="col-10">
                            <p style="font-size: 16px;">03006545559</p>
                        </div>
                    </div>
                    <div class="row" style="padding: 0px 15px;">
                        <div class="col-2">
                            <q-icon name="location_on" style="font-size: 30px;"></q-icon>
                        </div>
                        <div class="col-10">
                            <p style="font-size: 16px;">Lahore Cantt</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <p style="background: lightgrey; padding: 15px; font-size: 20px;"><b>Select Payment Method</b></p>
                </div>
                <div class="col-12">
                    <div class="row" style="padding: 0px 15px;">
                        <div class="col-2">
                            <q-icon name="badge" style="font-size: 30px;"></q-icon>
                        </div>
                        <div class="col-9">
                            <p style="font-size: 16px;">Cash On Delivery</p>
                        </div>

                        <div class="col-1">
                            <q-radio v-model="cod" val="cod" color="teal" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="padding: 0px 15px;">
                <div class="col-2">
                    <q-icon name="badge" style="font-size: 30px;"></q-icon>
                </div>
                <div class="col-9">
                    <p style="font-size: 16px;">Pay Through Credit/Debit Card On Delivery</p>
                </div>

                <div class="col-1">
                    <q-radio v-model="cod" val="card" color="teal" />
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
                        {{quantity}}
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
                    <q-btn color="red" label="Checkout" style="width: 100%;" @click="placeOrder" />
                </div>
            </div>
        </div>
        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
                    <p style="font-size: 20px;"><b>Attention</b></p>
                    <p>You need to login first to access this feature</p>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Close" color="primary" v-close-popup />
                    <q-btn flat label="Login" color="primary" v-close-popup to="/login" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
    export default {
        name: "CartPayment",
        data() {
            return {
                form: {},
                cod: "cod",
                total_price: 0,
                quantity: 2,
                confirm: false,
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
                        this.$q.loading.hide();
                        if (response.data.code == 200) {
                            this.products = response.data.data;
                            this.total_price = response.data.total_amount;
                        }
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                        console.log(error);
                    });
            },
            placeOrder() {
                if (this.$store.state.auth_user) {
                    // alert('yes');
                    this.$q.loading.show();
                    this.$api
                        .post(
                            "order-taking/place-order",
                            {
                                ios: true,
                                decision: true,
                                amount: this.total_price,
                                grand_total: this.total_price,
                                items: localStorage.getItem("cart"),
                            },
                            {
                                headers: {
                                    token: JSON.parse(localStorage.getItem("auth_user")).token,
                                },
                            }
                        )
                        .then((response) => {
                            this.$q.loading.hide();
                            console.log(response);
                            this.$router.push("/");

                            // if (response.data.code == 200) {
                            //  this.products = response.data.data
                            //  this.total_price = response.data.total_amount
                            // }
                        })
                        .catch((error) => {
                            this.$q.loading.hide();
                            console.log(error);
                        });
                } else {
                    this.confirm = true;
                }
            },
        },
        mounted: function () {
            this.getCartDetails();
        },
    };
</script>
