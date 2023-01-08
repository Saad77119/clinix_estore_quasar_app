<template>
    <div class="q-pa-none">
        <div class="container">
            <div class="row bg-deep-purple-10">
                <div class="col-12">
                    <q-btn flat icon="arrow_back" style="color: white; margin: 10px;" to="/"></q-btn>
                </div>
                <div class="col-12" style="text-align: center; color: white; padding: 25px; padding-top: 0px;">
                    <p style="font-size: 25px;">SIGN UP</p>
                </div>
            </div>
            <div class="row" style="margin: 10px; padding-bottom: 170px;">
                <div class="col">
                    <q-form @submit="onSubmit" class="q-gutter-md">
                        <q-card bordered class="my-card q-pt-md" style="border-radius: 30px; margin-top: -45px;height:470px">
                            <q-card-section>
                                <q-img src="~/assets/clogo.png"></q-img>
                            </q-card-section>

                            <q-card-section class="q-pt-lg">
                                <q-input filled v-model="name" label="Full Name" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']" />
                                <q-input filled v-model="email" label="Email" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']" />
                                <q-input
                                filled
                                    type="password"
                                    v-model="password"
                                    label="Password"
                                    :type="isPwd ? 'password' : 'text'"
                                    lazy-rules
                                    :rules="[
                                        val => val !== null && val !== '' || 'Please type your age',
                                    ]"
                                >
                                    <template v-slot:append>
                                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                                    </template>
                                </q-input>
                                <q-input
                                    filled
                                    type="password"
                                    v-model="confirm_password"
                                    label="Confirm Password"
                                    :type="isPwds ? 'password' : 'text'"
                                >
                                    <template v-slot:append>
                                        <q-icon :name="isPwds ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwds = !isPwds" />
                                    </template>
                                </q-input>
                            </q-card-section>
                            <div class="q-mt-sm q-mx-md">
                            <q-btn label="SIgn Up" type="submit" style="width: 100%; border-radius: 10px; background-color: red; color: white; letter-spacing:2px" />
                        </div>
                        </q-card>
                    </q-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isPwd: true,
                isPwds: true,
                name:"",
                email:"",
                password:"",
                confirm_password:"",

            };
        },
        methods: {
            onSubmit() {
              this.$q.loading.show();
                this.$api
                    .post("Customers/Register", {
                      number : this.$route.params.number,
                      name: this.name,
                      email : this.email,
                      password : this.password,

                    })
                    .then((response) => {
                        this.$q.loading.hide();
                        if (response.data.code != 200) {
                            this.$q.notify({
                                type: "negative",
                                message: response.data.message,
                            });
                        }
                        else{
                          this.$q.notify({
                                 type: 'positive',
                                  message: "Register Sucessfully",
                            });
                             this.$router.push('/login');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                         this.$q.loading.hide();
                    });
            },
        },
        mounted: function () {
          console.log(this.$route.params.number);
        },
    };
</script>
