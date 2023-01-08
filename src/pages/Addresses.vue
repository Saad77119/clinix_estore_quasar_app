<template>
    <div class="q-pt-sm">
        <q-card class="row q-mb-md q-mx-xs" bordered v-for="(address,index) in addresses" :key="address.id">
            <q-card-section class="col-12">
                <q-input v-model="address.address" :label="index = 'Address ' +(index + 1)" dense stack-label />
            </q-card-section>
            <q-card-section class="col-12 q-pt-sm">
                <q-btn color="secondary" label="Update" @click="updateAddress(address.id,address.address)" class="q-mr-sm" :disable="updateAddressButton(address.address)"/>
                <q-btn color="red" label="Delete" @click="$q.dialog({
                    title: 'Confirm',
                    message: 'Are you Sure You Want to delete this Address?',
                    cancel: true,
                    persistent: true
                }).onOk(() => {
                   deleteAddress(address.id);
                }).onCancel(() => {
                    return false;
                })"/>
            </q-card-section>
        </q-card>
        <q-card class="row q-mx-xs">
            <q-card-section class="col-12">
                <q-input v-model="address" label="Type New Address" dense stack-label/>
            </q-card-section>
            <q-card-section class="col-12 q-pt-sm">
                <q-btn color="primary" label="Add Address" :disable="addAddressButton" @click="addAddress"/>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
    export default {
        name: "Addresses",
        data() {
            return {
                address: "",
                addresses : [],
            };
        },
        methods: {
            getAddresses() {
                let self = this;
                self.$q.loading.show();
                let user = JSON.parse(localStorage.getItem("auth_user"));
                self.$api
                    .post("get/cust_addresses", null, {
                        headers: {
                            token: user.token,
                        },
                    })
                    .then((response) => {
                        if (response.status == 200) {
                            self.addresses = response.data.addresses;
                        }
                        this.$q.loading.hide();
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                    });
            },
            addAddress() {
                let self = this;
                self.$q.loading.show();
                let user = JSON.parse(localStorage.getItem("auth_user"));
                self.$api
                    .post("store_cust_addresses",{
                        address : self.address
                    }, {
                        headers: {
                            token: user.token,
                        },
                    })
                    .then((response) => {
                        this.$q.loading.hide();
                        if (response.status == 200) {
                            self.address = '';
                            self.$q.notify({
                                icon: "done",
                                color: "positive",
                                message: "Added!",
                            });
                            self.getAddresses();
                        }
                        else{
                            self.$q.notify({
                                type: 'negative',
                                message: 'Error Encountered!'
                            })
                        }
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                    });
            },
            updateAddress(id,val){
                let self = this;
                self.$q.loading.show();
                let user = JSON.parse(localStorage.getItem("auth_user"));
                self.$api
                    .post("update_cust_addresses",{
                        id : id,
                        address : val
                    }, {
                        headers: {
                            token: user.token,
                        },
                    })
                    .then((response) => {
                        this.$q.loading.hide();
                        if (response.status == 200) {
                            self.$q.notify({
                                icon: "done",
                                color: "positive",
                                message: "Updated!",
                            });
                            self.getAddresses();
                        }
                        else{
                            self.$q.notify({
                                type: 'negative',
                                message: 'Error Encountered!'
                            })
                        }
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                    });  
            },
            deleteAddress(id){
                let self = this;
                self.$q.loading.show();
                let user = JSON.parse(localStorage.getItem("auth_user"));
                self.$api
                    .post("delete_cust_address",{
                        id : id,
                    }, {
                        headers: {
                            token: user.token,
                        },
                    })
                    .then((response) => {
                        this.$q.loading.hide();
                        if (response.status == 200) {
                            self.$q.notify({
                                icon: "done",
                                color: "positive",
                                message: "Deleted!",
                            });
                            self.getAddresses();
                        }
                        else{
                            self.$q.notify({
                                type: 'negative',
                                message: 'Error Encountered!'
                            })
                        }
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                    });    
            }
        },
        mounted: function () {
            this.getAddresses();
        },
        computed : {
            addAddressButton(){
                if(this.address == null || this.address == ''){
                    return true;
                }
                else{
                    return false;
                }
            },
            updateAddressButton: (app) => (val)=> {
                if(val == null || val == ''){
                    return true;
                }
                else{
                    return false;
                }   
            }
        }
    };
</script>
