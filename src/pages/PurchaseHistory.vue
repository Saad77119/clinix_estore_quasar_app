<template>
    
    <div>
        <q-tabs
        v-model="tab"
        class="text-teal"
      >
        <q-tab name="Pending" icon="mail" label="Mails" />
        <q-tab name="Processing" icon="alarm" label="Alarms" />
        <q-tab name="Cancelled" icon="movie" label="Movies" />
         <q-tab name="En-Route" icon="movie" label="Movies" />
          <q-tab name="Delivered" icon="movie" label="Movies" />
      </q-tabs>
        <q-card class="bg-primary text-white q-mx-xs q-my-sm" v-for="history in purchase_history" :key="history.order_id" v-ripple q-hoverable @click="orderDetail(history.order_id)">
            <q-card-section class="q-py-xs">
                <q-chip square dense class="q-mx-none">Order #:{{history.order_id}}</q-chip>
                <q-img src="~/assets/clogo.png" width="120px" class="float-right"></q-img>
            </q-card-section>
            <q-card-section class="text-subtitle1 q-py-xs">
                <span class="text-bold">{{history.deliveried_to}}</span>
                <span class="float-right">Rs. {{history.total_order_amount}}</span>
            </q-card-section>
            <q-card-section class="text-caption q-py-xs">
                <span>Placed at : {{history.order_timestemp}}</span><br>
                <span>Delievered at : {{history.delivery_timestemp}}</span>
                <span class="text-bold float-right">Delievered</span>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
    export default {
        name: "Orders",
        data() {
            return {
                page: 1,
                purchase_history: [],
            };
        },
        methods: {
            getPurchaseHistory(page) {
                let self = this;
                self.$q.loading.show();
                let user = JSON.parse(localStorage.getItem("auth_user"));
                self.$api
                    .post("get/order/history", null, {
                        params: {
                            page: page,
                        },
                        headers: {
                            token: user.token,
                        },
                    })
                    .then((response) => {
                        if (response.status == 200) {
                            self.page = parseInt(response.data.data.current_page) + parseInt(1);
                            response.data.data.data.forEach((element) => self.purchase_history.push(element));
                        }
                        self.$q.loading.hide();
                    })
                    .catch((error) => {
                        self.$q.loading.hide();
                    });
            },
            orderDetail(id){
                this.$router.push("/order/detail/" + id);
            },
            scroll() {
                window.onscroll = () => {
                    let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
                    if (bottomOfWindow) {
                        this.getPurchaseHistory(this.page);
                    }
                };
            },
        },
        mounted: function () {
            this.scroll();
            this.getPurchaseHistory();
        },
        destroyed() {
            window.removeEventListener("scroll", this.handleScroll);
        },
    };
</script>
