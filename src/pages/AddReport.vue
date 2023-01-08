<template>
    <div class="q-pa-md">
        <q-form @submit="addReport" class="q-gutter-md">
            <p class="text-subtitle2">Add Report Images <span></span>*</p>
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
            <p class="text-subtitle2 q-pt-md">Select Date of Test Report <span></span>*</p>
            <q-date v-model="formData.date" today-btn mask = "YYYY-MM-DD" name="date"/>
            <q-input outlined v-model="formData.lab_name" label="Laboratory Name" class="q-pt-md" name="lab_name"/>
            <q-input outlined v-model="formData.name" label="Name (e.g Blood Test, Urine Test etc)" class="q-pt-md" name="name"/>
            <q-input outlined v-model="formData.recommended_by" label="Doctor" class="q-pt-md" name="recommended_by"/>
            <q-btn color="negative" glossy label="Save" class="q-mt-md full-width" type="submit"/>
        </q-form>
    </div>
</template>
<script>
    export default {
        name: "OrderDetail",
        data() {
            return {
                formData:{},
            };
        },
        methods: {
            onFileChange(event) {
                 this.formData.images = Object.values(event.target.files);
            },
            addReport() {
              this.$q.loading.show();
              let user = JSON.parse(localStorage.getItem("auth_user"));
                let formData = new FormData();
                formData.append("date", this.formData.date);
                formData.append("lab_name", this.formData.lab_name);
                formData.append("name", this.formData.name);
                formData.append("type",'report');
                formData.append("recommended_by", this.formData.recommended_by);
                this.formData.images.forEach(element => {
                   formData.append("images[]", element);
                });
               this.$axios
                     .post("https://admin.clinix.com.pk/api/store/prescrptions", formData,{
                        headers: {
                        token: user.token,
                        "content-type": "multipart/form-data",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
                    },
                     })
                    .then((response) => {
                        if (response.status == 200) {
                            this.$q.notify({
                                icon: "done",
                                color: "positive",
                                message: "Added!",
                            });
                            this.$router.push('/prescription/reports');
                        }
                        this.$q.loading.hide();
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                    });
                // self.$axios
                //     .post("http://localhost:8015/clinixestoreadmin/public/api/store/prescrptions", formData, {
                //         headers: {
                //             token: user.token,
                //             "content-type": "multipart/form-data",
                //         },
                //     })
                //     .then((response) => {
                //         if (response.status == 200) {
                //             self.$q.notify({
                //                 icon: "done",
                //                 color: "positive",
                //                 message: "Added!",
                //             });
                //             // self.$router.push('/prescription/reports');
                //         }
                //         self.$q.loading.hide();
                //     })
                //     .catch((error) => {
                //         self.$q.loading.hide();
                //     });
            },
        },
    };
</script>
