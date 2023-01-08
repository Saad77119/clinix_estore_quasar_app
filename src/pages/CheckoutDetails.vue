<template>
    <div class="q-pa-md" style="max-width: 400px;">
        <q-form style="text-align: center;" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-img src="~/assets/cart.png" style="width: 80px; margin: 40px;"></q-img>
            <q-input filled v-model="form.name" label="Full Name" lazy-rules :rules="[ val => val && val.length > 0 || 'Name is required']" />
            <q-input filled v-model="form.email" label="Email" lazy-rules :rules="[ val => val && val.length > 0 || 'Email is required']" />
            <q-input type="number" filled v-model="form.number" label="Mobile Number" lazy-rules :rules="[ val => val && val.length > 0 || 'Mobile number is required']" />
            <q-input filled v-model="form.address" label="Address" lazy-rules :rules="[ val => val && val.length > 0 || 'Address is required']" />
            <div>
                <q-btn color="red" label="Proceed To Checkout" style="width: 100%;" type="submit" />
            </div>
        </q-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    email: "",
                    name: "",
                    number: "",
                },
                age: null,
                accept: false,
            };
        },

        methods: {
            onSubmit() {
                //   if (this.accept !== true) {
                //     this.$q.notify({
                //       color: 'red-5',
                //       textColor: 'white',
                //       icon: 'warning',
                //       message: 'You need to accept the license and terms first'
                //     })
                //   }
                //   else {
                //     this.$q.notify({
                //       color: 'green-4',
                //       textColor: 'white',
                //       icon: 'cloud_done',
                //       message: 'Submitted'
                //     })
                //   }
                this.$router.push("/cart/payment/");
            },

            onReset() {
                this.name = null;
                this.age = null;
                this.accept = false;
            },
        },
        mounted: function () {
            if (this.$store.state.auth_user) {
                // console.log(this.$store.state.auth_user)
                var auth_user = JSON.parse(localStorage.getItem("auth_user"));
                // console.log(auth_user.email)
                this.form.email = auth_user.email;
                this.form.name = auth_user.name;
                this.form.number = auth_user.mobile_no.substring(1, 13);
            }
        },
    };
</script>
