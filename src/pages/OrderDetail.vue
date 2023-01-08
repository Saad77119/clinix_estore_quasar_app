<template>
    <div class="q-pa-md">
        <q-markup-table flat wrap-cells separator="none">
            <thead>
                <tr>
                    <th class="text-center">Item Name</th>
                    <th class="text-center">Qty</th>
                    <th class="text-center">Price</th>
                    <th class="text-center">Disc (%)</th>
                    <th class="text-center">Total</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr v-for="item in order_detail.items" :key="item.item_id">
                    <td class="items_row">{{item.name}}</td>
                    <td class="items_row">{{item.quantity}}</td>
                    <td class="items_row">{{item.price}}</td>
                    <td class="items_row">{{item.item_discount}}</td>
                    <td class="items_row">{{item.net_price}}</td>
                </tr>
                <tr>
                    <td class="text-left" colspan="5">Total Items: {{total_items}}</td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                    <td colspan="2"><strong>Gross Total:</strong></td>
                    <td>{{order_detail.total_order_amount}}</td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                    <td colspan="2"><strong>Disc.</strong></td>
                    <td>{{order_detail.total_discount}}</td>
                </tr>
                <tr>
                    <td></td>
                    <td colspan="3"><strong>Delievery Charges:</strong></td>
                    <td>99</td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                    <td colspan="2"><strong>Net Total:</strong></td>
                    <td>{{order_detail.total_order_amount}}</td>
                </tr>
            </tbody>
        </q-markup-table>
    </div>
</template>
<script>
    export default {
        name: "OrderDetail",
        data() {
            return {
                order_detail: [],
                total_items : 0,
            };
        },
        methods: {
            getOrderDetail(id) {
                let self = this;
                self.$q.loading.show();
                let user = JSON.parse(localStorage.getItem("auth_user"));
                self.$api
                    .post("get/order/history",{
                        order_id : id,
                    }, {
                        headers: {
                            token: user.token,
                        },
                    })
                    .then((response) => {
                        if (response.status == 200) {
                            self.order_detail = response.data;
                            self.total_items = response.data.items.length;
                        }
                        self.$q.loading.hide();
                    })
                    .catch((error) => {
                        self.$q.loading.hide();
                    });
            },
        },
        mounted: function () {
            this.getOrderDetail(this.$route.params.id);
        },
    };
</script>
<style scoped>
.items_row {
    border-top: 1px groove;
    border-bottom: 1px groove;
}
</style>
