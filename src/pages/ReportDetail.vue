<template>
    <div class="q-pa-md">
        <div class="text-right">
            <q-chip square dense class="q-mx-none text-white glossy" color="primary">{{report_detail.date}}</q-chip>
        </div>
        <q-carousel swipeable animated v-model="slide" thumbnails>
            <q-carousel-slide v-for="(image,index) in report_detail.images" :key="image" :name="index + 1" :img-src="'http://167.86.111.249/clinixestoreadmin/public/Prescriptions/'+image" />
        </q-carousel>
        <q-card class="bg-primary text-white q-mt-md q-px-sm">
            <q-card-section>
                <div class="text-subtitle2 q-mt-sm q-mb-xs">Laboratory Name :</div>
                <div class="text-caption">
                    {{report_detail.lab_name}}
                </div>
                <div class="text-subtitle2 q-mt-sm q-mb-xs">Report of :</div>
                <div class="text-caption">
                    {{report_detail.name}}
                </div>
                <div class="text-subtitle2 q-mt-sm q-mb-xs">Doctor Name :</div>
                <div class="text-caption">
                    {{report_detail.recommended_by}}
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
    export default {
        name: "ReportDetail",
        data() {
            return {
                slide : 1,
                report_detail: {},
            };
        },
        methods: {
            getReportDetail(id) {
                let self = this;
                self.$q.loading.show();
                let user = JSON.parse(localStorage.getItem("auth_user"));
                self.$api
                    .post(
                        "get/prescrptions",
                        {
                            type: "report",
                            id: id,
                        },
                        {
                            headers: {
                                token: user.token,
                            },
                        }
                    )
                    
                    .then((response) => {
                        if (response.status == 200) {
                            self.report_detail = response.data;
                        }
                        self.$q.loading.hide();
                    })
                    .catch((error) => {
                        self.$q.loading.hide();
                    });
            },
        },
        mounted: function () {
            this.getReportDetail(this.$route.params.id);
        },
    };
</script>
