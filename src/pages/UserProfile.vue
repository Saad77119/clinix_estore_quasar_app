<template>
    <div class="q-pa-none">
        <div class="container">
            <div class="row q-py-lg q-px-md" style="align-items:center;background-color: #272758">
                <div class="col-4">
                 
                    <q-img src="~/assets/profileimage.jpg"  v-if="forms.img_url == null || forms.img_url == ''"  style="border-radius: 50%; width: 110px; height: 110px;"></q-img>
                    <q-img :src="'http://167.86.111.249/clinixestoreapis/public'+forms.img_url"  v-else  style="border-radius: 50%; width: 110px; height: 110px;"></q-img>
                    <!-- <q-img src="~/assets/profileimage.jpg" style="border-radius: 50%; width: 110px; height: 110px;"></q-img> -->
                    <p class="q-mt-xs q-mb-none text-right">
                        <q-btn round color="negative" @click="change_img = true" icon="edit" size="sm" dense/>
                         <q-dialog v-model="change_img">
                            <q-card style="width: 500px;" class="my-card">
                                <q-form @submit="Submit()">
                                    <q-card-section>
                                        <q-input
                                            v-on:change="onFileChange"
                                            filled
                                            multiple
                                            type="file"
                                            >
                                <template v-slot:prepend>
                                    <q-icon name="add_a_photo" size="24px" color="blue" />
                                </template>
                                <template v-slot:append>
                                    <div class="attachment text-grey-14">File</div>
                                </template>
                               </q-input>
                                    </q-card-section>
                                    <q-card-actions class="bg-indigo-10" align="center">
                                        <q-btn style="letter-spacing: 1px" type="submit" flat color="white" label="Update" />
                                        <!-- <q-btn v-close-popup flat color="negative" label="Close" /> -->
                                    </q-card-actions>
                                </q-form>
                            </q-card>
                        </q-dialog>
                    </p>
                </div>
                <div class="col-8">
                    <q-input rounded outlined :label="forms.name" dense bg-color="white" readonly>
                        <template v-slot:after>
                            <q-btn round color="negative" icon="edit" dense @click="dialog_name = true"/>
                             <q-dialog v-model="dialog_name">
                            <q-card style="width: 500px;" class="my-card">
                                <q-form @submit="Submit()">
                                    <q-card-section>
                                         <q-input square outlined label="Full Name" v-model="form.name" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type Name']" />
                                    </q-card-section>
                                    <q-card-actions class="bg-indigo-10" align="center">
                                        <q-btn style="letter-spacing: 1px" type="submit" flat color="white" label="Update" />
                                        <!-- <q-btn v-close-popup flat color="negative" label="Close" /> -->
                                    </q-card-actions>
                                </q-form>
                            </q-card>
                        </q-dialog>
                        </template>
                    </q-input>
                </div>
            </div>
            <div class="row q-mt-md q-px-md">
                <div class="col-12">
                    <q-input filled :label="forms.email" readonly>
                        <template v-slot:prepend>
                            <q-icon name="mail" />
                        </template>
                        <template v-slot:after>
                            <q-btn round color="negative" icon="edit" dense @click="dialog_email = true"/>
                              <q-dialog v-model="dialog_email">
                            <q-card style="width: 500px;" class="my-card">
                                <q-form @submit="Submit()">
                                    <q-card-section>
                                         <q-input square outlined label="Email" v-model="form.email" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type email']" />
                                    </q-card-section>
                                    <q-card-actions class="bg-indigo-10" align="center">
                                        <q-btn style="letter-spacing: 1px" type="submit" flat color="white" label="Update" />
                                        <!-- <q-btn v-close-popup flat color="negative" label="Close" /> -->
                                    </q-card-actions>
                                </q-form>
                            </q-card>
                        </q-dialog>
                        </template>
                    </q-input>
                </div>
                <div class="col-12 q-mt-sm">
                    <q-input filled :label="forms.mobile_no" readonly>
                        <template v-slot:prepend>
                            <q-icon name="phone_android" />
                        </template>
                        <template v-slot:after>
                            <q-btn round color="negative" icon="edit" dense @click="dialog_number = true"/>
                              <q-dialog v-model="dialog_number">
                            <q-card style="width: 500px;" class="my-card">
                                    <q-card-section>
                                         <q-input square outlined label="+92xxxxxxxxxx" v-model="form.phone_no" >
                                            <template v-slot:after>
                                               <p class="text-primary" @click="getotp()">Get OTP</p>
                                                </template>
                                           </q-input>
                                             <q-input class="q-mt-sm" label="Enter Code" square outlined v-model="oTP" />
                                    </q-card-section>
                                    <q-card-actions class="bg-indigo-10" align="center">
                                        <q-btn style="letter-spacing: 1px" type="submit" flat color="white" @click="VerifyOTP()" label="Update" />
                                    </q-card-actions>
                            </q-card>
                        </q-dialog>
                        </template>
                    </q-input>
                </div>
                <div class="col-12 q-mt-md">
                    <q-btn style="letter-spacing: 1px" label="Change Password" color="negative" class="full-width q-py-xs" @click="dialog_password = true" />
                       <q-dialog v-model="dialog_password">
                            <q-card style="width: 500px;" class="my-card">
                                <q-form @submit="Submit()">
                                    <q-card-section>
                                  <q-input
                                   outlined
                                    type="password"
                                    v-model="form.old_password"
                                    label="Old Password"
                                    :type=" isPwd ? 'password' : 'text'"
                                    lazy-rules :rules="[ val => val && val.length > 0 || 'Please type Old Password']"
                                >
                                    <template v-slot:append>
                                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                                    </template>
                                </q-input>
                                  <q-input
                                   outlined
                                    type="password"
                                    v-model="form.password"
                                    label="New Password"
                                    :type=" isPwdp ? 'password' : 'text'"
                                    lazy-rules :rules="[ val => val && val.length > 0 || 'Please type New Password']"
                                >
                                    <template v-slot:append>
                                        <q-icon :name="isPwdp ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwdp = !isPwdp" />
                                    </template>
                                </q-input>
                                  <q-input
                                   outlined
                                    type="password"
                                    v-model="form.confirm_password"
                                    label="Confirm Password"
                                    :type=" isPwdc ? 'password' : 'text'"
                                    lazy-rules :rules="[ val => val && val.length > 0 || 'Please type Confirm Password']"
                                >
                                    <template v-slot:append>
                                        <q-icon :name="isPwdc ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwdc = !isPwdc" />
                                    </template>
                                </q-input>
                                    </q-card-section>
                                    <q-card-actions class="bg-indigo-10" align="center">
                                        <q-btn style="letter-spacing: 1px" type="submit" flat color="white" label="Update" />
                                        <!-- <q-btn v-close-popup flat color="negative" label="Close" /> -->
                                    </q-card-actions>
                                </q-form>
                            </q-card>
                        </q-dialog>
                </div>
                <div class="col-12 q-mt-md">
                    <q-btn style="letter-spacing: 1px" label="Logout" color="negative" class="full-width q-py-xs" @click="logout"></q-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import firebase from "boot/firebase";
// import {onAuthStateChanged , signOut ,getAuth } from "firebase/auth";
    export default {
        name: "UserProfile",
        data() {
            return {
                form: {},
                
                forms: {},
                dialog_name: false,
                change_img: false,
                dialog_email: false,
                dialog_number: false,
                dialog_password: false,
                isPwd: true,
                isPwdp: true,
                isPwdc: true,
                oTTp:{},
                oTP:"",
            };
        },
        methods: {
            Submit(){
              this.$q.loading.show();
              let formData = new FormData();
              if(this.form.image != null && this.form.image != '' ){
                    this.form.image = this.form.image[0];
                    formData.append("image",this.form.image);
              }
               if(this.form.name != null &&  this.form.name != '' ){
              formData.append('name',this.form.name);
               }
                if(this.form.confirm_password != null && this.form.confirm_password != ''){
              formData.append('confirm_password',this.form.confirm_password);
                }
                  if(this.form.password != null && this.form.password != ''){
              formData.append('password',this.form.password);
                  }
                    if(this.form.old_password != null &&  this.form.old_password != ''){
              formData.append('old_password',this.form.old_password);
                    }
                    if(this.form.email  != null &&  this.form.email != ''){
              formData.append('email',this.form.email);
                    }
                    if(this.form.phone_no  != null && this.form.phone_no != ''){
              formData.append('phone_no',this.form.phone_no);
                    }
                  
            //   console.log(this.form.image);
                this.$api
                    .post("update/user",formData,{
                      headers:{
                        token : this.forms.token
                      }
                    })
                    .then((response) => {
                      console.log(response);
                        this.dialog_name = false;
                        this.change_img = false;
                        this.dialog_email = false;
                        this.dialog_number = false;
                        this.dialog_password = false;
                        this.form = {};
                        this.oTP = "";
                          if (response.data.code == 200) {
                                  this.$q.notify({
                                      type: 'positive',
                                        message: "User has been updated",
                            });

                            this.logout();
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
            logout() {
                if (localStorage.getItem("source") == "google"){
                     hello('google').logout();
                }
                 if (localStorage.getItem("source") == "facebook"){
                    hello('facebook').logout()
                }
               
                this.$store.commit("updateAuthUser", false);
                localStorage.removeItem("auth_user");
                     localStorage.removeItem("login_type");
                     localStorage.removeItem("phone_number");
                // Sign-out successful.
                this.$router.push("/"); 
            },

             getotp(){
                  this.$q.loading.show();
                  this.$api
                    .post("get_otp", {
                        number : this.form.phone_no
                    })
                    .then((response) => {
                        if (response.data.code == 200) {
                          this.oTTp = response.data.otp
                                  this.$q.notify({
                                      type: 'positive',
                                        message: "OTP Sent",
                            });
                        }
                        this.$q.loading.hide();
                        if (response.data.code == 500) {
                            this.$q.notify({
                                type: "negative",
                                message: "Invalid number.",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                         this.$q.loading.hide();
                    });
          },
           onFileChange(event) {
                 this.form.image = Object.values(event.target.files);
               console.log(this.form.image);
            }
           
         ,

           VerifyOTP(){
                   this.$q.loading.show();
               if(this.oTTp == this.oTP){
                this.$q.loading.hide();
                this.Submit();
               }
               else{
                 this.$q.notify({
                    type: 'negative',
                   message: "InCorrect OTP",
               });
                this.$q.loading.hide();
               }
            },
        },
        mounted: function () {
          console.log(JSON.parse(localStorage.getItem("auth_user")));
            this.forms = JSON.parse(localStorage.getItem("auth_user"))
        },
    };
</script>
