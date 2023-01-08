<template>


    <div class="q-pa-none">
        <q-carousel animated v-model="slide" infinite :autoplay="true" class="main_crousel">
            <q-carousel-slide v-for="(banner,index) in banners" :key="index" :name="index" :img-src="'http://167.86.111.249/clinixestoreadmin/public'+banner" class="main_crousel_image"/>
        </q-carousel>

        <div class="row" style="margin: 8px; color: white;">
            <div class="col" style="background: linear-gradient(90deg, rgba(121, 9, 117, 1) 43%, rgba(11, 21, 121, 1) 100%); padding: 17px; border-radius: 15px;">
                <div class="row">
                    <div class="col-xs-6" style="margin: auto; font-size: 22px;">
                        <b> Order Medicines</b> <br />
                        <br />
                        <q-btn to="/products" style="background: #272758; font-size: 14px;" label="Shop Now">
                            <q-icon name="arrow_right"></q-icon>
                        </q-btn>
                    </div>
                    <div class="col-xs-6" style="text-align: right; margin: auto;"><q-icon name="shopping_cart" style="font-size: 120px;" /></div>
                </div>
            </div>
        </div>
        <div class="row" style="margin: 8px; color: white;">
            <div class="col" style="background: linear-gradient(90deg, rgba(81, 28, 240, 1) 43%, rgba(11, 19, 103, 1) 100%); padding: 17px; border-radius: 15px;">
                <div class="row">
                    <div class="col-xs-6" style="margin: auto; font-size: 22px;">
                        <b> Clinix Estore</b> <br /><br />
                        <q-btn to="/get/call/from/clinix" style="color: #272758;background:#fff; font-size: 14px;" label="Get in Touch">
                            <q-icon name="arrow_right"></q-icon>
                        </q-btn>

                    </div>
                    <div class="col-xs-6" style="text-align: right; margin: auto;"><q-icon name="inventory_2" style="font-size: 120px;" /></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueSlickCarousel from "vue-slick-carousel";
    import "vue-slick-carousel/dist/vue-slick-carousel.css";
    import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
    export default {
        name: "Index",
        components: { VueSlickCarousel },
        data() {
            return {
                slide : 1,
                banners : {},
            };
        },
        methods: {
            getbanners() {
                let self = this;
                self.$q.loading.show();
                this.$api
                    .post("get/benners")
                    .then((response) => {
                        if (response.data.code == 200) {
                            self.banners = response.data.banners;
                            console.log( self.banners)
                            self.$q.loading.hide();
                        }
                        else{
                            self.$q.loading.hide();
                            self.$q.notify({
                                message: "Error Encountered!",
                            });
                        }
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                        console.log(error);
                    });
            },
            userGuide() {


                if(this.$store.state.auth_user === false){
                   console.log(localStorage.getItem('check_guide'));
                    if(localStorage.getItem('check_guide') == null){
                        localStorage.setItem("check_guide", true);
                        this.$router.push("/userGuide");
                    }
                    else{
                        return;
                    }
                }else{
                    return;
                }
            },
        },
        mounted() {
            this.getbanners();
            this.userGuide();
        },
    };
</script>
