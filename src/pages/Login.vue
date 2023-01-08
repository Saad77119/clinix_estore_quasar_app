<template>
   <div class="q-pa-none">
      <div class="container">
         <div class="row bg-deep-purple-10">
            <div class="col-12">
               <q-btn flat icon="arrow_back" style="color: white; margin: 10px;" to="/"></q-btn>
            </div>
            <div class="col-12" style="text-align: center; color: white; padding: 25px; padding-top: 0px;">
               <p style="font-size: 25px;">SIGN IN</p>
            </div>
         </div>
         <div class="row" style="margin: 10px; padding-bottom: 170px;">
            <div class="col">
               <q-form @submit="onSubmit" class="q-gutter-md">
                  <q-card   bordered class="my-card q-pt-md" style="border-radius: 30px; margin-top: -45px;">
                     <q-card-section>
                        <q-img src="~/assets/clogo.png"></q-img>
                     </q-card-section>
                     <q-card-section style="display:flex;flex-direction:column;padding-top: 0;" class="q-pt-lg">
                        <div style="width:100%">
                           <q-btn-toggle  v-model="login_with_plateform" style="max-width:40%;width:28%;border: 1px solid #027be3;float:right;margin-bottom: 10px;" no-caps rounded unelevated toggle-color="indigo" color="white" text-color="indigo"    :options="[{ value: 'email',icon: 'mail',size:'12px',padding:'4px 12px'},{ value: 'phone',icon: 'phone',size:'12px',padding:'4px 12px'}]" />
                        </div>
                        <q-input v-if="this.login_with_plateform=='phone'"  maxlength="10"   filled v-model="form_phone" label="Phone" prefix="+92" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type Phone Number']" />
                        <q-input v-else-if="this.login_with_plateform=='email'" filled v-model="form_email" label="Email " type="email" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type Email']" />
                        <q-input
                           filled
                           type="password"
                           v-model="form.password"
                           label="Password"
                           :type="isPwd ? 'password' : 'text'"
                           lazy-rules
                           :rules="[
                           val => val !== null && val !== '' || 'Please type Password',
                           ]"
                           >
                           <template v-slot:append>
                              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                           </template>
                        </q-input>
                     </q-card-section>
                  </q-card>
                  <div class="q-mt-lg">
                     <q-btn label="Login" type="submit" style="width: 100%; border-radius: 15px; background-color: #292d84; color: white;" />
                  </div>
               </q-form>
               <div class="q-mt-lg row justify-center">
                  <div style=" letter-spacing: 1px" class="text-weight-bolder">
                     <div class="text-bold" @click="card = true">Forgot Password? </div>
                  </div>
                  <q-dialog v-model="card">
                     <q-card style="width: 500px;" class="my-card">
                        <q-card-header>
                           <div style=" letter-spacing: 1px" class="q-py-xs q-ml-sm text-bold text-indigo-10">Forgot Password 
                                </div>
                        </q-card-header>
                        <q-form @submit="forgetpassword()">
                           <q-card-section>
                              <q-btn-toggle  v-model="forgetpassword_with_plateform" style="border: 1px solid #027be3;float:right;margin-bottom:10px" no-caps rounded unelevated toggle-color="indigo" color="white" text-color="indigo"    :options="[{ value: 'email',icon: 'mail',size:'10px',padding:'4px 12px'},{ value: 'phone',icon: 'phone',size:'10px',padding:'4px 12px'}]" />
                              <div style=" letter-spacing: 1px" class="q-py-xs  text-bold text-grey-7">
                              </div>
                              <q-input v-if="forgetpassword_with_plateform=='phone'" maxlength="10" square outlined v-model="opt_plateform_phone" style="width:100%" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type Phone Number']"    label="Phone" prefix="+92"  />
                              <q-input v-else-if="forgetpassword_with_plateform=='email'" square outlined v-model="opt_plateform_email" style="width:100%" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type Email']" type="email"  label="Email"  />
                           </q-card-section>
                           <q-card-actions class="bg-red-14" align="center">
                              <q-btn  style=" letter-spacing: 3px" type="submit" flat color="white" label="Verify Account" />
                              <!-- <q-btn v-close-popup flat color="negative" label="Close" /> -->
                           </q-card-actions>
                        </q-form>
                     </q-card>
                  </q-dialog>
                  <q-dialog v-model="forgetpasswordpromotionerror">
                     <q-card style="width: 500px;" class="my-card">
                        <q-card-header>
                           <div style="letter-spacing: 1px;text-align: center;font-size: 1.2em;padding: 24px 10px 20px 10px;" class="q-py-xs q-ml-sm text-bold text-indigo-10">Promotional Messages are blocked in your Service Contact your service provider to unblock</div>
                        </q-card-header>
                        <h3 class="text-center" style=" margin-bottom:5px;color: RED; margin-top: 10px; ">{{ this.forget_password_otp_code }}</h3>
                        <q-btn style=" letter-spacing: 3px;margin-left: 29%;margin-top: 9%; margin-bottom: 5%;" @click="pushrouterforgetpassword()"  color="amber" glossy label="Verify OTP" />
                     </q-card>
                  </q-dialog>
               </div>
               <!-- <div class="q-mt-md row justify-center">
                  <div>~~~~~~~ OR SIGN IN WITH ~~~~~~~</div>
                  </div> -->
             
               <div class=" text-deep-purple-10 q-mt-sm row justify-center">
                  <div>Need an account? <span @click="signup_card = true"><strong>Sign up</strong></span></div>
                  <q-dialog v-model="signup_card">
                     <q-card style="width: 500px;" class="my-card">
                        <q-card-header>
                           <div style=" letter-spacing: 1px" class="q-py-xs q-ml-sm text-bold text-indigo-10">Enter your Mobile#:</div>
                        </q-card-header>
                        <q-form @submit="register()">
                           <q-card-section>
                              <q-input square maxlength="10" outlined v-model="register_number" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type Number']" prefix="+92" />
                           </q-card-section>
                           <q-card-actions class="bg-red-14" align="center">
                              <q-btn style="letter-spacing: 3px" type="submit" flat color="white" label="Get Code" />
                              <!-- <q-btn v-close-popup flat color="negative" label="Close" /> -->
                           </q-card-actions>
                        </q-form>
                     </q-card>
                  </q-dialog>
                  <q-dialog v-model="promotionerror">
                     <q-card style="width: 500px;" class="my-card">
                        <q-card-header>
                           <div style="letter-spacing: 1px;text-align: center;font-size: 1.2em;padding: 24px 10px 20px 10px;" class="q-py-xs q-ml-sm text-bold text-indigo-10">Promotional Messages are blocked in your Service Contact your service provider to unblock</div>
                        </q-card-header>
                        <h3 class="text-center" style=" margin-bottom:5px;color: RED; margin-top: 10px; ">{{ this.registerotp }}</h3>
                        <q-btn style=" letter-spacing: 3px;margin-left: 29%;margin-top: 9%; margin-bottom: 5%;" @click="pushRouterRegister()"  color="amber" glossy label="Verify OTP" />
                     </q-card>
                  </q-dialog>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
export default {
        name: "Login",
        data() {
            return {
                form: {},
                url_from: "",
                logintype:"",
                isPwd: true,
                forgetpassword_with_plateform : "phone",
                registerotp:"",
                card: false,
                register_number:"",
              
                otpdetail : {},
                forget_email : "",
                forget_phone : "",
                forget_detail : {},
                login_with_plateform: "phone",
                promotionerror : false,
                signup_card: false,
                forgetpasswordpromotionerror : false,
                email : "",
                form_phone : null ,
                form_email : null,
                opt_plateform_phone:"",
                opt_plateform_email:"",
                forget_password_otp_code: "",
                number:"",
                
            };
        },
        methods: {
            onSubmit() {
                this.$q.loading.show();
                if(this.login_with_plateform =='phone'){
                    this.form.email = "+92"+this.form_phone;
                }else{
                     this.form.email = this.form_email;
                }
                this.$api
                    .post("Customers/Login", this.form)
                    .then((response) => {
                        if (response.data.code == 200) {
                            localStorage.setItem("auth_user", JSON.stringify(response.data.data));
                            this.$store.commit("updateAuthUser", true);

                            this.$router.push("/");
                        }
                        this.$q.loading.hide();
                        if (response.data.code == 400) {
                            this.$q.notify({
                                message: "Invalid Credentials.",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            pushrouterforgetpassword(){
                this.otpdetail = {
                    otp : this.forget_password_otp_code,
                    email : this.forget_email,
                    phone_number : this.forget_phone,
                    detail : this.forget_detail,
                }
                this.$router.push({
                    name: 'OTP',
                    params: { otp:  this.otpdetail }
                });
    
            }
            ,
            forgetpassword(){
                this.$q.loading.show();
                this.forget_detail = {};
                if(this.forgetpassword_with_plateform=='phone'){
                    this.forget_phone = '+92'+this.opt_plateform_phone;
                    this.forget_detail.number =  this.forget_phone ;
                }else if(this.forgetpassword_with_plateform=='email'){
                        this.forget_email = this.opt_plateform_email;
                        this.forget_detail.email =  this.forget_email ;
                }
                this.$api
                    .post("test_forget",  this.forget_detail  )
                    .then((response) => {
                        console.log(response);
                        if (response.data.code == 200) {
                                this.forget_password_otp_code = response.data.otp;
                                  this.$q.notify({
                                    type: 'positive',
                                    message: "OTP Sent",
                            });
                            if(response.data.api_message == "Promotional message is blocked as per customer instructions."  && this.forget_phone != ""){
                                this.forgetpasswordpromotionerror = true;
                            }
                            else{
                                this.pushrouterforgetpassword();
                            }
                        }
                        this.$q.loading.hide();
                        if (response.data.code == 500) {
                            this.$q.notify({
                                type: "negative",
                                message: response.data.message,
                            });
                        }
                          this.$q.loading.hide();
                    })
                    .catch((error) => {
                        console.log(error);
                         this.$q.loading.hide();
                    });
            },
            pushRouterRegister(){
                this.$router.push({
                        name: 'OTP',
                        params: { register_otp: this.registerotp, register_number: this.number}
                });
                            
            },
            register(){
                this.$q.loading.show();
                this.number = '+92'+ this.register_number;
                this.$api
                    .post("get_otp", {
                        number : this.number
                    })
                    .then((response) => {
                        console.log(response.data);
                        if (response.data.code == 200) {
                                this.registerotp = response.data.otp;
                                this.$q.notify({
                                      type: 'positive',
                                       message: "OTP Sent",
                            });
                          
                             if(response.data.api_message == "Promotional message is blocked as per customer instructions." ){
                                this.registerotp = response.data.otp;
                                this.promotionerror = true;
                            }
                            else{
                                this.pushRouterRegister();
                            }
                        }
                        
                        else if (response.data.code == 500) {
                            this.$q.notify({
                                type: "negative",
                                message: "Invalid Number",
                            });
                        }
                          this.$q.loading.hide();
                    })
                    .catch((error) => {
                        console.log(error);
                         this.$q.loading.hide();
                    });
            },   
        },

    };
</script>
