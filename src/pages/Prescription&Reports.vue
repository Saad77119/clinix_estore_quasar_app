<template>
    <div class="q-pa-none">
        <div class="container">
            <div class="row q-col-gutter-sm" style="position: fixed; right: 10px; left: 10px; background: white; z-index: 999; padding: 10px;">
                <div class="col-12">
                    <q-tabs v-model="tab" class="text-teal">
                        <q-tab name="prescriptions" label="Prescriptions" style="color: #050544;" />
                        <q-tab name="reports" label="Medical Profile" style="color: #050544;" />
                    </q-tabs>
                </div>
            </div>
            <div class="row q-col-gutter-md" style="padding-top: 80px;" v-if="tab=='prescriptions'">
                <div class="col-12" v-if="prescriptionsStatus">
                    <div class="col-12" v-for="prescription in prescriptions" :key="prescription.id">
                        <a @click="PrescriptionDetail(prescription.id)">
                            <q-card class="bg-primary text-white q-mx-sm">
                                <q-card-section horizontal>
                                    <q-card-section class="col-5 flex">
                                        <q-img :src="'http://167.86.111.249/clinixestoreadmin/public/Prescriptions/'+prescription.images[0]" class="products_images" />
                                    </q-card-section>
                                    <q-card-section class="q-px-none q-pt-xs" style="width: 100%;">
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
                                    <q-card-actions vertical class="q-pt-none">
                                        <q-btn
                                            flat
                                            color="negative"
                                            icon="delete"
                                            @click.stop="$q.dialog({
                                            title: 'Confirm',
                                            message: 'Are you Sure You Want to delete this Prescription?',
                                            cancel: true,
                                            persistent: true
                                        }).onOk(() => {
                                        deletePrescriptionOrReport(prescription.id,'p');
                                        }).onCancel(() => {
                                            return false;
                                        })"
                                        />
                                    </q-card-actions>
                                </q-card-section>
                            </q-card>
                        </a>
                    </div>
                </div>  
                <div class="col-12" v-else>
                    <p class="text-caption text-center">{{statusMessage}}</p>
                </div>  
                <q-page-sticky position="bottom-right" :offset="[18, 18]">
                    <q-btn round color="primary" icon="add" to="/add/prescription"/>
                </q-page-sticky>
            </div>
            <div class="row q-col-gutter-md" style="padding-top: 80px;" v-if="tab=='reports'">
                <div class="col-12" v-if="reportsStatus">
                    <div class="col-12" v-for="report in reports" :key="report.id">
                        <a @click="getreportDetail(report.id)">
                            <q-card class="bg-primary text-white q-mx-xs">
                                <q-card-section horizontal>
                                    <q-card-section class="col-5 flex">
                                        <q-img :src="'http://167.86.111.249/clinixestoreadmin/public/Prescriptions/'+report.images[0]" class="products_images" />
                                    </q-card-section>
                                    <q-card-section class="q-px-none q-pt-xs" style="width: 100%;">
                                        <q-chip square dense class="q-mx-none">{{report.date}}</q-chip>
                                        <div class="text-subtitle2 q-mt-sm q-mb-xs">Laboratory Name :</div>
                                        <div class="text-caption">
                                            {{report.lab_name}}
                                        </div>
                                        <div class="text-subtitle2 q-mt-sm q-mb-xs">Report of :</div>
                                        <div class="text-caption">
                                            {{report.name}}
                                        </div>
                                        <div class="text-subtitle2 q-mt-sm q-mb-xs">Doctor Name :</div>
                                        <div class="text-caption">
                                            {{report.recommended_by}}
                                        </div>
                                    </q-card-section>
                                    <q-card-actions vertical class="q-pt-none">
                                        <q-btn
                                            flat
                                            color="negative"
                                            icon="delete"
                                            @click.stop="$q.dialog({
                                            title: 'Confirm',
                                            message: 'Are you Sure You Want to delete this Report?',
                                            cancel: true,
                                            persistent: true
                                        }).onOk(() => {
                                        deletePrescriptionOrReport(report.id,'r');
                                        }).onCancel(() => {
                                            return false;
                                        })"
                                        />
                                    </q-card-actions>
                                </q-card-section>
                            </q-card>
                        </a>
                    </div>
                </div>
                <div class="col-12" v-else>
                    <p class="text-caption text-center">{{statusMessage}}</p>
                </div>    
                <q-page-sticky position="bottom-right" :offset="[18, 18]">
                    <q-btn round color="primary" icon="add" to="/add/report"/>
                </q-page-sticky>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PrescriptionAndReports",
        data() {
            return {
                tab: "prescriptions",
                prescriptions: [],
                reports: [],
                prescriptionsStatus: true,
                reportsStatus: true,
                statusMessage : '',
            };
        },
        methods: {
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
                            if(response.data.path.length > 0){
                                self.prescriptions = response.data.path;
                            }
                            else{

                                self.prescriptionsStatus = false;
                                self.statusMessage = "Well this is sad... We didn't find anything for you";
                            }
                        }
                        else{
                            self.prescriptionsStatus = false;
                            self.statusMessage = 'Something Went Wrong! Please Try Later.';
                        }
                        self.$q.loading.hide();
                    })
                    .catch((error) => {
                        self.$q.loading.hide();
                    });
            },
            PrescriptionDetail(id) {
                this.$router.push("/prescription/detail/" + id);
            },
            getReports() {
                let self = this;
                self.$q.loading.show();
                let user = JSON.parse(localStorage.getItem("auth_user"));
                self.$api
                    .post(
                        "get/prescrptions",
                        {
                            type: "report",
                        },
                        {
                            headers: {
                                token: user.token,
                            },
                        }
                    )
                    .then((response) => {
                        if (response.status == 200) {
                            if(response.data.path.length > 0){
                                console.log(response.data.path);
                                self.reports = response.data.path;
                            }
                            else{
                                self.reportsStatus = false;
                                self.statusMessage = "Well this is sad... We didn't find anything for you";
                            }
                        }
                        else{
                            self.reportsStatus = false;
                            self.statusMessage = 'Something Went Wrong! Please Try Later.';
                        }
                        self.$q.loading.hide();
                    })
                    .catch((error) => {
                        self.$q.loading.hide();
                    });
            },
            getreportDetail(id) {
                this.$router.push("/report/detail/" + id);
            },
            deletePrescriptionOrReport(id, tab) {
                let self = this;
                self.$q.loading.show();
                let user = JSON.parse(localStorage.getItem("auth_user"));
                self.$api
                    .post(
                        "delete/prescrptions",
                        {
                            id: id,
                        },
                        {
                            headers: {
                                token: user.token,
                            },
                        }
                    )
                    .then((response) => {
                        this.$q.loading.hide();
                        if (response.status == 200) {
                            self.$q.notify({
                                icon: "done",
                                color: "positive",
                                message: "Deleted!",
                            });
                            if (tab === "p") {
                                self.getPrescriptions();
                            }
                            if (tab === "r") {
                                self.getReports();
                            }
                        } else {
                            self.$q.notify({
                                type: "negative",
                                message: "Error Encountered!",
                            });
                        }
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                    });
            },
        },
        mounted: function () {
            this.getPrescriptions();
            this.getReports();
        },
    };
</script>
