<template>
   <q-page>
          <q-btn @click ='$router.go(-1)' style="font-size: 13px; width: 21px; margin: 10px 18px; " flat icon="fas fa-chevron-left" v-if=' $route.name!=="Home"' ></q-btn>
               
     <div class=" q-mt-xl row justify-center">
        <q-icon size="xl" color="dark" name="fas fa-mobile-alt"/>
     </div>
     <div class=" q-px-md text-purple-10">
      <div class="q-mt-lg row justify-center text-h6 text-bold">Verification</div>
      <div v-if="otp" class="row justify-center">
        <pre>Please enter the verificatoin code sent to
          following number Or email
                  {{otp.phone_number}}
              {{otp.email}}
          </pre>
        </div>
      <div v-else-if="google_numbers" class="row justify-center">
        <pre>Please enter the verificatoin code sent to
                 following number
                  {{google_numbers}}
          </pre>
        </div>
        <div v-else-if="mobile_number_for_apple" class="row justify-center">
        <pre>Please enter the verificatoin code sent to
                 following number
                  {{mobile_number_for_apple}}
          </pre>
        </div>
        <div v-else-if="mobile_number_for_facebook" class="row justify-center">
        <pre>Please enter the verificatoin code sent to
                 following number
                  {{mobile_number_for_facebook}}
          </pre>
        </div>
      <div v-else class="row justify-center">
        <pre>Please enter the verificatoin code sent to
                 following number
                  {{register_numbers}}
          </pre>
        </div>
        <q-form v-if="otp" @submit="verifyOTP()">
        <q-input square outlined v-model="OtP" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type OTP']" label="Verfication Code"/>
            <div class="bg-red-14 q-mt-md" align="center">
              <q-btn style=" letter-spacing: 3px" type="submit" flat color="white" label="Verify" />
            </div>
            </q-form>
        <q-form v-else-if="google_numbers" @submit="googleOTP()">
        <q-input square outlined v-model="g_otp" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type OTP']" label="Verfication Code"/>
            <div class="bg-red-14 q-mt-md" align="center">
              <q-btn style=" letter-spacing: 3px" type="submit" flat color="white" label="Verify" />
            </div>
            </q-form>
                <q-form v-else-if="mobile_number_for_facebook" @submit="get_otp_for_facebook()">
        <q-input square outlined v-model="f_otp" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type OTP']" label="Verfication Code"/>
            <div class="bg-red-14 q-mt-md" align="center">
              <q-btn style=" letter-spacing: 3px" type="submit" flat color="white" label="Verify" />
            </div>
            </q-form>
              <q-form v-else-if="mobile_number_for_apple" @submit="get_otp_for_apple()">
        <q-input square outlined v-model="a_otp" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type OTP']" label="Verfication Code"/>
            <div class="bg-red-14 q-mt-md" align="center">
              <q-btn style=" letter-spacing: 3px" type="submit" flat color="white" label="Verify" />
            </div>
            </q-form>
        <q-form v-else @submit="register_OTP()">
        <q-input square outlined v-model="registerOtP" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type OTP']" label="Verfication Code"/>
            <div class="bg-red-14 q-mt-md" align="center">
              <q-btn style=" letter-spacing: 3px" type="submit" flat color="white" label="Verify" />
            </div>
            </q-form>
              <div v-if="(register_numbers)" class=" text-deep-purple-10 q-mt-xl row justify-center">
                   <div>Didn't received the code ?  <span @click="resend"><strong>Resend</strong></span></div>
              </div>
              <div v-if="(google_numbers) " class=" text-deep-purple-10 q-mt-xl row justify-center">
                   <div>Didn't received the code ? <span @click="google_resend"><strong>Resend</strong></span></div>
                    {{this.google_error}}
              </div>
              <div v-if="(mobile_number_for_apple)" class=" text-deep-purple-10 q-mt-xl row justify-center">
                   <div>Didn't received the code ? <span @click="apple_resend"><strong>Resend</strong></span></div>
                     {{this.apple_error}}
              </div>

              <div v-if="(mobile_number_for_facebook)" class=" text-deep-purple-10 q-mt-xl row justify-center">
                   <div>Didn't received the code ? <span @click="facebook_resend"><strong>Resend</strong></span></div>
                    {{this.facebook_error}}
              </div>
        </div>
   </q-page>
</template>

<script>
import {AppleSignIn} from 'apple-sign-in-rest';
import appleSignIn from 'src/boot/apple';
// import { getAuth,  FacebookAuthProvider,OAuthProvider , getRedirectResult ,  signInWithRedirect ,signInWithPopup,GoogleAuthProvider  } from "firebase/auth";
// console.log(new  getAuth.GithubAuthProvider());
// firebase.initializeApp();
    export default {
        data() {
            return {
              otp : this.$route.params.otp,
              register_otp : this.$route.params.register_otp,
              register_numbers : this.$route.params.register_number,
              google_otp : this.$route.params.google_otp,
              google_numbers : this.$route.params.google_number,
              mobile_number_for_facebook : this.$route.params.mobile_number_for_facebook,
              mobile_number_for_apple : this.$route.params.mobile_number_for_apple,
              mobile_otp_for_facebook : this.$route.params.mobile_otp_for_facebook,
              mobile_otp_for_apple : this.$route.params.mobile_otp_for_apple,
              OtP:"",
              f_otp:"",
              a_otp:"",
              google_error  : "",
              facebook_error : "",
              apple_error : "",
              registerOtP:"",
              g_otp:"",
              resend_otp:{}
            };
        },
        methods: {
            verifyOTP(){
                   this.$q.loading.show();
               if(this.OtP == this.otp.otp){
                this.$q.loading.hide();
                 this.$router.push({
                      name: 'Change_password',
                      params: { email: this.otp.email}
                 });
               }
               else if(this.resend_otp == this.OtP){
                  this.$q.loading.hide();
                   this.$router.push({
                      name: 'Change_password',
                      params: { email: this.otp.email}
                 });
               }
               else{
                 this.$q.notify({
                    type: 'negative',
                   message: "InCorrect OTP",
               });
                this.$q.loading.hide();
               }
            },

            register_OTP(){
                   this.$q.loading.show();
               if(this.register_otp == this.registerOtP){
                this.$q.loading.hide();
                 this.$router.push({
                      name: 'Sign_Up',
                      params: { number: this.register_numbers}
                 });
               }  else if(this.registerOtP == this.resend_otp){
                  this.$q.loading.hide();
                   this.$router.push({
                      name: 'Sign_Up',
                      params: { number: this.register_numbers}
                 });
               }
               else{
                 this.$q.notify({
                    type: 'negative',
                   message: "Incorrect OTP",
               });
                this.$q.loading.hide();
               }


            },
            get_otp_for_apple(){
                   this.$q.loading.show();
                console.log(this.mobile_otp_for_apple);
                console.log(this.a_otp);
               if(this.mobile_otp_for_apple == this.a_otp){
                this.$q.loading.hide();
                  this.appleAuth();
                  // this.apple();
               } else if(this.a_otp == this.resend_otp){
                 this.$q.loading.hide();
                 this.appleAuth();
                  // this.apple();
               }
               else{
                 this.$q.notify({
                    type: 'negative',
                   message: "Incorrect OTP",
               });
                this.$q.loading.hide();
               }

            },
            appleAuth(){
                this.apple_error = "start";
                appleSignIn = new AppleSignIn({
                clientId: "org.clinix.estore.app",
                teamId: "X39GLHWBT6",
                keyIdentifier: "Z3QBTTJDL4",
                privateKey: "-----BEGIN PRIVATE KEY-----MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgO8d+4o+AGPtJgGq2ctX4IgDazDzgz0pXx08JeViQ5/2gCgYIKoZIzj0DAQehRANCAASXTYEflzN5LYeC7wH7SNEetY4CrQSjPB90BVFYyw99uXRzyD2zwDg3XI1S/c844UMMsTiKNdgIS/aSak1XV5lD-----END PRIVATE KEY-----",
                });
                this.apple_error = "object Created";
                this.apple_error = typeof appleSignIn;
                appleSignIn.getAuthorizationUrl({
                scope: ["name", "email"],
              }).then(result => {
                this.apple_error = result;
                this.$api
                  .post("/Customers/Login", {
                    logintype : "apple",
                    email : "",
                    password : "",
                    uid: result.id,
                    name: result.name,
                    phone_number: this.mobile_number_for_apple,
                  })
                .then((response) => {
                  if (response.data.code == 200) {
                      localStorage.setItem("auth_user", JSON.stringify(response.data.data));
                      localStorage.setItem("source", "apple");
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
            
                console.log(error.message);
            });

                // console.log(tokenResponse);
            }).catch(error => {
                this.apple_error = error.message;
                console.log(error);
            });
            },
            // apple(){
              
            //    var providerapple = new  OAuthProvider('apple.com');
               
            //     signInWithRedirect(getAuth(),providerapple);
            //     getRedirectResult(getAuth()).then(result => {
            //        this.$api
            //             .post("/Customers/Login", {
            //               logintype : "apple",
            //               email : "",
            //               password : "",
            //               uid: result.user.uid,
            //               name: result.user.displayName,
            //               phone_number: this.mobile_number_for_apple,
            //             })
            //           .then((response) => {
            //             if (response.data.code == 200) {
            //                 localStorage.setItem("auth_user", JSON.stringify(response.data.data));
            //                 localStorage.setItem("source", "apple");
            //                 this.$store.commit("updateAuthUser", true);
            //                 this.$router.push("/");
            //             }
            //             this.$q.loading.hide();
            //             if (response.data.code == 400) {
            //                 this.$q.notify({
            //                     message: "Invalid Credentials.",
            //                 });
            //             }
            //         })
            //         .catch((error) => {
                    
            //             console.log(error.message);
            //         });

            //       }) 
            //       .catch((error)=> {
            //         this.apple_error = error.message;
            //         console.log(error.message);
            //       }
            //     );
            // }
              // ,
      facebookauth(network) {
        this.$hello(network).login({ 
          scope: {
              basic: 'public_profile',
				      email: 'email',
            }
          })
        .then(() => {
            if (this.$hello.getAuthResponse(network) != null) {
              this.$hello(network).api('me')
              .then((result) => {
                  this.$api
                  .post("/Customers/Login", {
                      logintype : "fb",
                      email : "",
                      password : "",
                      uid: result.id,
                      name: result.name,
                      phone_number: this.mobile_number_for_facebook,
                    })
                  .then((response) => {
                    if (response.data.code == 200) {
                        localStorage.setItem("auth_user", JSON.stringify(response.data.data));
                        localStorage.setItem("source", "facebook");
                        localStorage.setItem("phone_number", this.mobile_number_for_facebook);
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

            })
            }else{
               this.$q.notify({
               message: "Invalid Credentials.",
              });
            }
            this.$q.loading.hide();           
      }).catch((error)=>{
         this.facebook_error = error.message;
          console.log(error.message);
      })
    },
              get_otp_for_facebook(){
                   this.$q.loading.show();
                
               if(this.mobile_otp_for_facebook == this.f_otp){
                this.$q.loading.hide();
                this.facebookauth('facebook');
                  // this.facebook();
               }else if(this.f_otp == this.resend_otp){
                 this.$q.loading.hide();
                   this.facebookauth('facebook');
               }
               else{
                 this.$q.notify({
                    type: 'negative',
                   message: "Incorrect OTP",
               });
                this.$q.loading.hide();
               }


            },
           

            googleOTP(){
                   this.$q.loading.show();
               if(this.google_otp == this.g_otp){
                this.$q.loading.hide();
                  this.googleauth("google");
               }else if(this.g_otp == this.resend_otp){
                 this.$q.loading.hide();
                  this.googleauth("google");
               }
               else{
                 this.$q.notify({
                    type: 'negative',
                   message: "Incorrect OTP",
               });
                this.$q.loading.hide();
               }


            }, 
        googleauth(network) {
        this.$hello(network).login({ scope: {
          basic: 'openid profile',
				  email: 'email',
        } })
        .then(() => {
            if (this.$hello.getAuthResponse(network) != null) {
              this.$hello(network).api('me')
              .then((result) => {
                this.google_error = result;
                this.$api  
                .post("Customers/Login", {
                  logintype :  "email",
                  email : result.email,
                  password : "",
                  name: result.first_name+" "+result.last_name,
                  phone_number: this.google_numbers,
                })
              .then((response) => {
                console.log(response);
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
              });
              }else{
               this.$q.notify({
               message: "Invalid Credentials.",
              });
            }
            this.$q.loading.hide();           
      }).catch((error)=>{
         this.google_error = error.message;
          console.log(error.message);
      })
    },
          resend(){
                  this.$q.loading.show();
                  this.$api
                    .post("get_otp", {
                        number : this.otp ? this.otp.phone_number : this.register_numbers
                    })
                    .then((response) => {
                        if (response.data.code == 200) {
                          this.resend_otp = response.data.otp
                                  this.$q.notify({
                                      type: 'positive',
                                        message: "OTP Sent",
                            });
                        }
                        this.$q.loading.hide();
                        if (response.data.code == 500) {
                            this.$q.notify({
                                type: "negative",
                                message: "Invalid Email.",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                         this.$q.loading.hide();
                    });
          },
          google_resend(){
                  this.$q.loading.show();
                  this.$api
                    .post("get_otp", {
                        number : this.otp ? this.otp.phone_number : this.google_numbers
                    })
                    .then((response) => {
                        if (response.data.code == 200) {
                          this.resend_otp = response.data.otp
                                  this.$q.notify({
                                      type: 'positive',
                                        message: "OTP Sent",
                            });
                        }
                        this.$q.loading.hide();
                        if (response.data.code == 500) {
                            this.$q.notify({
                                type: "negative",
                                message: "Invalid Email.",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                         this.$q.loading.hide();
                    });
          },
              apple_resend(){
                  this.$q.loading.show();
                  this.$api
                    .post("get_otp", {
                        number : this.otp ? this.otp.phone_number : this.mobile_number_for_apple
                    })
                    .then((response) => {
                        if (response.data.code == 200) {
                          this.resend_otp = response.data.otp
                                  this.$q.notify({
                                      type: 'positive',
                                        message: "OTP Sent",
                            });
                        }
                        this.$q.loading.hide();
                        if (response.data.code == 500) {
                            this.$q.notify({
                                type: "negative",
                                message: "Invalid Email.",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                         this.$q.loading.hide();
                    });
          }

          ,
                    facebook_resend(){
                  this.$q.loading.show();
                  this.$api
                    .post("get_otp", {
                        number : this.otp ? this.otp.phone_number : this.mobile_number_for_facebook
                    })
                    .then((response) => {
                        if (response.data.code == 200) {
                          this.resend_otp = response.data.otp
                                  this.$q.notify({
                                      type: 'positive',
                                        message: "OTP Sent",
                            });
                        }
                        this.$q.loading.hide();
                        if (response.data.code == 500) {
                            this.$q.notify({
                                type: "negative",
                                message: "Invalid Email.",
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
        //    if(localStorage.getItem("login") == "1"){
        //       localStorage.removeItem("login");
        //       getRedirectResult(getAuth()).then(result => {
        //             this.$api  
        //                .post("Customers/Login", {
        //                   logintype :  localStorage.getItem("login-type"),
        //                   email : result.user.email,
        //                   password : "",
        //                   name: result.user.displayName,
        //                   phone_number: localStorage.getItem("phone_number"),
        //                 })
        //               .then((response) => {
        //                 console.log(response);
        //                 if (response.data.code == 200) {
        //                     localStorage.setItem("auth_user", JSON.stringify(response.data.data));
        //                     this.$store.commit("updateAuthUser", true);
        //                     this.$router.push("/");
        //                 }
        //                 this.$q.loading.hide();
        //                 if (response.data.code == 400) {
        //                     this.$q.notify({
        //                         message: "Invalid Credentials.",
        //                     });
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });

        //           }).catch((error) => {
        //               this.google_error = error;
        //                 console.log(error);
        //             });
        // }
        }
        // ,
    }
</script>
