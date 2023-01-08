<template>
   <q-page>
     <div class=" q-mt-xl row justify-center">
        <q-icon size="xl" color="dark" name="fas fa-mobile-alt"/>
     </div>
     <div class=" q-px-md text-purple-10">
      <div class="q-mt-lg row justify-center text-h6 text-bold">Change Password</div>
      <div style=" letter-spacing: 2px" class="row justify-center">Please enter the new password.</div>
      <div class="q-mt-xl">
        <q-form @submit="submit()">
        <q-input square outlined v-model="password" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type Password']" label="Password"/>
        <q-input square outlined v-model="password_confirmation" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type Confirm Password']" label="Confirm Password"/>
            <div class="bg-red-14 q-mt-md" align="center">
              <q-btn style=" letter-spacing: 3px" type="submit" flat color="white" label="Update Password" />
            </div>
            </q-form>
            </div>
        </div>
   </q-page>
</template>

<script>
    export default {
        data() {
            return {
              email : this.$route.params.email,
              password:"",
              password_confirmation:"",
            };
        },
        methods: {
            submit(){
                   this.$q.loading.show();
                this.$api
                    .post("test_submit", {
                        email : this.email,
                        password : this.password,
                        password_confirmation : this.password_confirmation
                    })
                    .then((response) => {
                        // console.log(response.data);
                        if (response.data.code == 200) {
                                  this.$q.notify({
                                      type: 'positive',
                                        message: "Your Password Has been Change",
                            });
                            this.$router.push('/login');
                        }
                        this.$q.loading.hide();
                        if (response.data.code == 500) {
                            this.$q.notify({
                                type: "negative",
                                message: "",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                         this.$q.loading.hide();
                    });
            }
        },
        mounted() {
        },
    };
</script>
