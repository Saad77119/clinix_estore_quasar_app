<style >
.scroll.relative-position.fit.hide-scrollbar .absolute {
 position: initial !important;
}
.getCall{
    position: absolute; 
    bottom: 0;
    background: red; 
    width: 100%; 
    border-top-left-radius: 10px;
     color: #fff; 
     border-top-right-radius: 10px;
}

</style>
<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="header text-white"  height-hint="61.59" v-if=' $route.name!=="OTP" &&  $route.name!=="Sign_Up"' >
            <div class="row" style="padding: 10px; padding-top: 25px !important;">
                <div class="col-md-2 col-xs-2">
                    <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu" />
                    <q-btn @click ='$router.go(-1)' style="font-size: 13px; width: 23px;" flat icon="fas fa-chevron-left" v-if=' $route.name!=="Home"' ></q-btn>
                </div>
                <div class="col-md-6 col-xs-7">

                        <p v-if=' $route.name=="Home"' class="heading-para">{{ $route.name }}</p>
                        <p v-else-if =' $route.name=="products"' class="heading-para">Order Medicine</p>
                        <p v-else-if=' $route.name=="cart.list"' class="heading-para">Cart</p>
                        <p v-else-if=' $route.name=="user.profile"' class="heading-para">Profile</p>
                        <p v-else-if=' $route.name=="checkout.details"' class="heading-para">Checkout Details</p>
                        <p v-else-if=' $route.name=="cart.payment"' class="heading-para">Payment</p>
                        <p v-else-if=' $route.name=="addresses"' class="heading-para">Addresses</p>
                         <p v-else-if=' $route.name=="purchase_history"' class="heading-para">Orders</p>
                        <p v-else-if=' $route.name=="order_detail"' class="heading-para">Order Details</p>
                        <p v-else-if=' $route.name=="add_prescription"' class="heading-para"><marquee>Medical Profile & Medicine Prescription</marquee></p>
                        <p v-else-if=' $route.name=="add_report"' class="heading-para"><marquee>Add Report & Medicine Prescription</marquee></p>
                        <p v-else-if=' $route.name=="prescription_&_reports"' class="heading-para"><marquee>Medical Profile & Medicine Prescription</marquee></p>
                        <p v-else-if=' $route.name=="prescription_detail"' class="heading-para"> Prescription Details</p>
                        <p v-else-if=' $route.name=="report_detail"' class="heading-para">Report Details</p>
                        <p v-else-if=' $route.name=="userGuide"' class="heading-para" style="font-size: 1.5em;">How to use e-Clinix</p>
                        <p v-else-if=' $route.name=="get_call_from_clinix"' class="heading-para"><marquee>Send Order Request</marquee></p>
                        <p v-else-if=' $route.name=="OTP"' class="heading-para">OTP</p>
                        <p v-else-if=' $route.name=="Change_password"' class="heading-para">Change Password</p>
                        <p v-else class="heading-para">Clinix</p>
                        


                    <!-- <q-input filled label="Seach Store" bg-color="white" dense /> -->
                </div>
                <div class="col-md-2 col-xs-3" style="text-align: right;">
                    <!-- <q-btn flat dense round aria-label="Menu" to="/cart/list">
                        <q-icon name="shopping_cart" />
                        <q-badge color="red" floating transparent>
                            {{cart_count}}
                        </q-badge>
                    </q-btn> -->

                    <q-btn round flat icon="account_circle"   v-if="forms == null || forms.img_url == null || forms.img_url == ''"  style="width: 40px; height: 40px;"  @click="profile"> </q-btn>
                     <q-img :src="'http://167.86.111.249/clinixestoreapis/public'+forms.img_url"  v-else  @click="profile" style="border-radius: 50%; width: 40px; height: 40px;"></q-img>

                </div>
            </div>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" bordered behavior="mobile" @click="leftDrawerOpen = false" style="background: red;">
            <q-scroll-area class="fit">
                <q-toolbar class="GPL__toolbar">
                    <q-toolbar-title class="row items-center text-grey-8">
                        <img class="q-pl-md" src="~/assets/clogo.png" style="width: 250px; padding: 20px;" />
                    </q-toolbar-title>
                </q-toolbar>

                <q-list padding>
                    <q-item clickable class="GPL__drawer-item" to="/">
                        <q-item-section avatar>
                            <q-icon name="home" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label><b>Home</b></q-item-label>
                        </q-item-section>
                    </q-item>

                    <!-- <q-item clickable class="GPL__drawer-item" to="/login" v-if="!auth_user">
                        <q-item-section avatar>
                            <q-icon name="login" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label><b>Login</b></q-item-label>
                        </q-item-section>
                    </q-item> -->

                   

                    <q-item clickable class="GPL__drawer-item" to="/prescription/reports" v-if="auth_user">
                        <q-item-section avatar>
                            <q-icon name="login" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label><b>Medical Profile & Medicine Prescription</b></q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable class="GPL__drawer-item" to="/addresses" v-if="auth_user">
                        <q-item-section avatar>
                            <q-icon name="place" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label><b>Addresses</b></q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable class="GPL__drawer-item" to="/purchase/history" v-if="auth_user">
                        <q-item-section avatar>
                            <q-icon name="history" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label><b>Orders</b></q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable class="GPL__drawer-item" to="/userGuide" v-if="auth_user">
                        <q-item-section avatar>
                            <q-icon name="live_tv" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label><b>How to use e-Clinix</b></q-item-label>
                        </q-item-section>
                    </q-item>   
                    
                    <q-item clickable class="GPL__drawer-item" v-if="auth_user" tag="a" href="https://estore.clinix.com.pk/policy" target="_blank">
                        <q-item-section avatar>
                            <q-icon name="policy" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label><b>Privacy Policy</b></q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
                    <q-item  clickable class="GPL__drawer-item getCall" to="/get/call/from/clinix">
                        <q-item-section avatar>
                            <q-icon name="phone_callback" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label><b>Send Order Request</b></q-item-label>
                        </q-item-section>
                    </q-item> 
            </q-scroll-area>
         
        </q-drawer>
        <q-page-container>
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<script>
    export default {
        name: "MainLayout",
        data() {
            return {
                leftDrawerOpen: false,
                confirm: false,
                forms : {},

            };
        },
        methods: {
            profile() {
                if (this.auth_user) {
                    this.$router.push("/user/profile/");
                } else {
                    this.$router.push("/login");
                }
            },
        },
        computed: {
            cart_count() {
                if (this.$store.state.cart) {
                    return this.$store.state.cart.length;
                } else {
                    return 0;
                }
            },
            auth_user() {
                if (this.$store.state.auth_user) {
                    return true;
                } else {
                    return false;
                }
            },
        },
        mounted : function () {
              this.forms = JSON.parse(localStorage.getItem("auth_user"));
        },

    };
</script>
