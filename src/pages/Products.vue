<template>
    <div class="q-pa">
        <div class="container" style="margin: 10px;min-height:100vh; ">
         <q-btn color="secondary" style="width: 100%; font-size: 1.2em; background: linear-gradient(90deg, rgb(42, 9, 88) 0%, rgb(9, 9, 121) 23%, rgb(207, 6, 4) 100%) !important; font-weight: bold;"  icon="add" class="w-100" label="Add Prescription" />
          <div style="padding:10px 0px;" class="container">
              <div class="col-12" style="padding:8px 0px;border-radius:10px;" v-for="prescription in prescriptions" :key="prescription.id">
                        <a @click="PrescriptionDetail(prescription.id)">
                            <q-card style="border-radius: 14px; box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%); }" class="bg-primary text-white q-mx-sm">
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
                                   
                                </q-card-section>
                            </q-card>
                        </a>
                    </div>

          </div>
            <div class="row q-col-gutter-sm" style="position: relative; min-height: 100vh; margin-top: 8px; background: white; z-index: 999; padding: 10px;">
                 <div class="col-md-12" style="max-height: calc(100vh - 163px);width: 100%;height: 100vh;">
                   <q-btn  style="top:0;width: 100%;" color="warning" icon-right="warning" v-if="!auth_user" label="Login To Add Prescription"  />           
                    <q-btn style="    bottom: 37px;position: fixed;width: 89%;left: 19px;text-align: center;"  color="red" icon-right="send" label="Send Order Request"  to="/get/call/from/clinix"/>


                 </div>
                <div v-if="!commingsoon" class="col-12">
                    <q-tabs v-model="tab" class="text-teal">
                        <q-tab name="categories" icon="category" label="Categories" style="color: #050544;" />
                        <q-tab name="products" icon="inventory_2" label="Products" style="color: #050544;" />
                    </q-tabs>
                </div>
            </div>
            <div class="row q-col-gutter-md" style="padding-top: 150px;" v-if="tab=='products' && productStatus &&  !commingsoon ">
                <div class="col-md-2 col-xs-6" v-for="product in products" v-bind:key="product.id">
                    <a @click="productDetails(product.id)">
                        <q-card class="my-card" style="height: 270px;">
                            <img :src="'http://167.86.111.249/clinixestoreadmin/public'+product.img_url" class="products_images" />
                            <q-card-section class="products_crousel">
                                <div class="">RS {{product.price}}</div>
                                <div class="text-subtitle2">{{product.name}}</div>
                            </q-card-section>
                        </q-card>
                    </a>
                </div>
                <q-img src="~/assets/giphy.gif" style="height: 100px;"></q-img>
            </div>
            <div v-if="tab=='products' && !productStatus && !commingsoon" class="row q-col-gutter-md" style="padding-top: 150px;">
                <p class="col-md-12 col-xs-12 text-caption text-center">{{statusMessage}}</p>
            </div>
            <div class="row q-col-gutter-md" style="padding-top: 150px;" v-if="tab=='categories' && categoriesStatus">
                <div class="col-md-2 col-xs-6" v-for="category in categories" v-bind:key="category.id">
                    <a @click="getCategoryProducts(category.id)">
                        <q-card class="my-card" style="height: 200px;">
                            <img :src="'https://167.86.111.249/clinixestoreadmin/public'+category.img" class="category_images" />
                            <q-card-section class="products_crousel">
                                <div class="text-subtitle2">{{category.name}}</div>
                            </q-card-section>
                        </q-card>
                    </a>
                </div>
                <div v-if="tab=='categories' && !categoriesStatus" class="row q-col-gutter-md" style="padding-top: 150px;">
                <p class="col-md-12 col-xs-12 text-caption text-center">{{statusMessage}}</p>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Products",
        data() {
            return {
                productStatus: true,
                categoriesStatus : true,
                statusMessage : '',
                slide: 1,
                next_page: 1,
                commingsoon:true,
                prescriptions : [],
                
                tab: "products",
                products: [],
                categories: [],
            };
        },
        methods: {
            getProducts(page) {
                this.$api
                    .post("utilities/item", null, {
                        params: {
                            asd: page,
                        },
                    })
                    .then((response) => {
                        if (response.data.code == 200) {
                            if(response.data.data.data.length > 0){
                                this.next_page = parseInt(response.data.data.current_page) + parseInt(1);
                                response.data.data.data.forEach((element) => this.products.push(element));
                            }
                            else {
                                this.productStatus = false;
                                this.statusMessage = "Well this is sad... We didn't find anything for you";
                            } 
                        } 
                        else {
                            this.productStatus = false;
                            this.statusMessage = 'Something Went Wrong! Please Try Later.';
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            productDetails(id) {
                this.$router.push("/product/details/" + id);
            },
            scroll() {
                window.onscroll = () => {
                    let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
                    if (bottomOfWindow) {
                        if (this.$route.path == "/products") {
                            this.getProducts(this.next_page);
                        }
                    }
                };
            },
            getCategories() {
                this.$q.loading.show();
                this.$api
                    .post("categories")
                    .then((response) => {
                        if (response.status == 200) {
                            if(response.data.length > 0){
                                this.categories = response.data;
                            }
                            else{
                                this.categoriesStatus = false;
                                this.statusMessage = "Well this is sad... We didn't find anything for you";
                            }
                        }
                        else {
                            this.categoriesStatus = false;
                            this.statusMessage = 'Something Went Wrong! Please Try Later.';
                        }
                        this.$q.loading.hide();
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                        console.log(error);
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
            getCategoryProducts(id) {
                this.$q.loading.show();
                this.$api
                    .post("search/items", null, {
                        params: {
                            category_id: id,
                        },
                    })
                    .then((response) => {
                        this.$q.loading.hide();
                        if (response.data.code == 200) {
                            // this.next_page = parseInt(response.data.data.current_page) + parseInt(1)
                            // response.data.data.data.forEach(element =>
                            //     this.products.push(element)
                            // )
                            this.products = response.data.data;
                        }
                    })
                    .catch((error) => {
                        this.$q.loading.hide();
                        console.log(error);
                    });
                this.tab = "products";
            },
        },
        mounted: function () {
            this.scroll();
            this.getProducts(this.next_page);
            this.getCategories();
             this.getPrescriptions();
        },
          computed: {
        
            auth_user() {
                if (this.$store.state.auth_user) {
                    return true;
                } else {
                    return false;
                }
            },
        },
        destroyed() {
            window.removeEventListener("scroll", this.handleScroll);
        },
    };
</script>
