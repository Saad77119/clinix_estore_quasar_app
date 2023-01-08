<template>
    <div class="q-pa-md">
        <q-card>
            <q-form @submit.prevent="sendCallRequest">
                <q-card-section class="q-pt-2">
                    <q-input
                        dense
                        v-model="formData.mobile_no"
                        label="Mobile / Landline No."
                        stack-label
                        mask="####-#######"
                    />
                </q-card-section>

                <q-card-section class="q-pt-2">
                    <q-select v-model="formData.address" :options="user_addresses" label="Select Address For Delievery" :disable="userLogin" stack-label clearable/>
                </q-card-section>

                <q-card-section>
                    <q-checkbox v-model="addPrescription" label="Add Prescription" dense size="xs" v-if="!userLogin"/>
                    <p class="text-caption text-bold" v-else>Login To Add Prescriptions</p>
                </q-card-section>

                <q-card-section v-if="addPrescription">
                    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator switch-indicator no-caps>
                        <q-tab name="existing" label="Choose Existing" />
                        <q-tab name="new" label="Add New" />
                    </q-tabs>
                    <q-separator />
                    <q-tab-panels v-model="tab">
                        <q-tab-panel name="existing" style="height:330px">
                            <p class="text-caption text-bold">Click on a Prescription to add.</p>
                            <div class="col-12 q-mb-xs" v-for="prescription in prescriptions" :key="prescription.id">
                                <q-card class="text-white" style="background : #050544" v-ripple q-hoverable @click="existingPrescriptions(prescription.images)">
                                    <q-card-section horizontal>
                                        <q-card-section class="col-5 flex q-py-xs">
                                            <q-img :src="'http://167.86.111.249/clinixestoreadmin/public/Prescriptions/'+prescription.images[0]" class="products_images" />
                                        </q-card-section>
                                        <q-card-section class="q-px-none q-py-xs" style="width: 100%;">
                                            <q-chip square dense class="q-mx-none">{{prescription.date}}</q-chip>
                                            <div class="text-subtitle2 q-mt-sm q-mb-xs">Prescription For :</div>
                                            <div class="text-caption">
                                                {{prescription.name}}
                                            </div>
                                            <div class="text-subtitle2 q-mt-sm q-mb-xs">Doctor Name :</div>
                                            <div class="text-caption">
                                                {{prescription.recommended_by}}
                                            </div>
                                        </q-card-section>
                                    </q-card-section>
                                </q-card>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="new">
                        
                         <q-input
                            v-on:change="onFileChange"
                              multiple
                              filled
                              type="file"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="add_a_photo" size="24px" color="blue" />
                                </template>
                                <template v-slot:append>
                                    <div class="attachment text-grey-14">File</div>
                                </template>
                               </q-input>
                        </q-tab-panel>
                    </q-tab-panels>
                    <q-separator />
                    <div class="col-12">
                        <q-chip square dense v-for="(exist,index) in formData.existing_prescriptions" :key="index" removable @remove="removeExistingPrescriptions(index)">{{exist.name}}</q-chip>
                    </div>
                </q-card-section>

                <q-card-actions align="right" class="text-primary q-pb-md">
                    <q-btn color="red" label="Send Call Request" style="width: 100%;" type="submit" />
                </q-card-actions>
            </q-form>
        </q-card>
    </div>
</template>
<script>
    export default {
        name: "GetCallFromClinix",
        data() {
            return {
                tab : "",
                user_addresses: [],
                userLogin: false,
                addPrescription: false,
                prescriptions: [],
                formData:{},
                // form: {
                //     existing_prescriptions : [],
                // },
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
                            response.data.addresses.forEach((address) => {
                                self.user_addresses.push({ label: address.address, value: address.id });
                            });
                        }
                        this.$q.loading.hide();
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                        // console.log(error);
                    });
            },
            getPrescriptions() {
                let self = this;
                self.$q.loading.show();
                let user = JSON.parse(localStorage.getItem("auth_user"));
                self.$api
                    .post(
                        "get/prescrptions",
                        {
                            type: "prescription",
                        },
                        {
                            headers: {
                                token: user.token,
                            },
                        }
                    )
                    .then((response) => {
                        if (response.status == 200) {
                            self.prescriptions = response.data.path;
                            // console.log(self.prescriptions);
                        }
                        self.$q.loading.hide();
                    })
                    .catch((error) => {
                        self.$q.loading.hide();
                    });
            },
            existingPrescriptions(images){
                let obj = [
                  images = images
                ];
              this.formData.existing_prescriptions.push(obj);
                console.log( this.formData.existing_prescriptions)
            },
            removeExistingPrescriptions(index){
                this.formData.existing_prescriptions.splice(index, 1);
            },
         onFileChange(event) {
                 this.formData.images = Object.values(event.target.files);
                console.log(this.formData.images);
            },

            sendCallRequest() {
                this.$q.loading.show();
              let user = JSON.parse(localStorage.getItem("auth_user"));
                let formData = new FormData();
                formData.append("number",this.formData.mobile_no);
                formData.append("address", this.formData.address);
                if(this.formData.existing_prescriptions){
                     this.formData.existing_prescriptions.forEach(element => {
                    formData.append("imageurls[]",  element);
              });
                }if(this.formData.images)
                          this.formData.images.forEach(element => {
                   formData.append("images[]", element);
                });

               this.$axios
                     .post("https://admin.clinix.com.pk/api/call_request", formData,{
                        headers: {
                        token: user != null ? user.token : "",
                        "content-type": "multipart/form-data",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
                    },
                     })
                    .then((response) => {
                        if (response.status == 200) {
                            this.$q.notify({
                              icon: "done",
                              color: "positive",
                              message: "Success! One of our Representative will contact you soon.",
                            });
                            this.$router.push('/');
                        }
                        this.$q.loading.hide();
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                    });
            },
        },
        mounted: function () {
            if (this.$store.state.auth_user) {
                this.getAddresses();
                this.getPrescriptions();
            }
            else {
                this.userLogin = true;
            }
        },
        computed : {
            saveButton(){
                if(this.form.mobile_no === null || this.form.mobile_no === ''){
                    return true;
                }
                else{
                    return false;
                }
            },
        },
        watch: {
            addPrescription() {
                this.formData.images = [];
                this.formData.existing_prescriptions = [];
            },
            tab() {
                this.formData.images = [];
                this.formData.existing_prescriptions = [];
            }
        },
    };
</script>
