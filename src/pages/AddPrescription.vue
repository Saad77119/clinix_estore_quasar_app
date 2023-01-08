<template>
    <div class="q-pa-md">
        <q-form @submit="addPrescription" class="q-gutter-md">
            <p class="text-subtitle2">Add Prescription Images <span></span>*</p>
            <q-input
             v-on:change="onFileChange"
              multiple
              filled
              type="file"
            >
            <!-- <q-file standout class="text-red" bg-color="blue-2" v-model="form.images" color="red" capture clearable multiple name="images"> -->
                <template v-slot:prepend>
                    <q-icon name="add_a_photo" size="24px" color="blue" />
                </template>
                <template v-slot:append>
                    <div class="attachment text-grey-14">File</div>
                </template>
             </q-input>
            <p class="text-subtitle2 q-pt-md">Select Date of Prescription <span></span>*</p>
            <q-date v-model="formData.date" today-btn mask = "YYYY-MM-DD" name="date"/>
            <q-input outlined v-model="formData.name" label="Prescription For" class="q-pt-md" name="name"/>
            <q-input outlined v-model="formData.recommended_by" label="Doctor" class="q-pt-md" name="recommended_by"/>
            <q-btn color="negative" glossy label="Save" class="q-mt-md full-width" type="submit"/>
        </q-form>
    </div>
</template>
<script>
let arr = []
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
            addPrescription() {
                this.$q.loading.show();
              let user = JSON.parse(localStorage.getItem("auth_user"));
                let formData = new FormData();
                formData.append("date", this.formData.date);
                formData.append("name", this.formData.name);
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
                // let self = this;
                // let images = [];
                // var res;
                // self.form.images.forEach((image) => {
                //     var reader = new FileReader()
                //     reader.readAsDataURL(image)
                //     reader.onload = () => {
                //         res = reader.result.split(',')[1];
                //         images.push(res);
                //     };
                // });
                // self.$q.loading.show();
                // let user = JSON.parse(localStorage.getItem("auth_user"));
                // const formData = new FormData();
                // console.log(images)
                // formData.append("images", images);
                // formData.append("date", self.form.date);
                // formData.append("name", self.form.name);
                // formData.append("recommended_by", self.form.recommended_by);
                // console.log(formData.get("images"));
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
