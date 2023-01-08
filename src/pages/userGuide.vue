<style >

    .NextSlide{
        font-size: 20px;
        color:#000;
        text-transform: capitalize;
    }
    .NextSlide i{
        font-size: 1em !important;
        
    }
    .q-page-container{
        min-height: calc(100vh - 75px) !important;
    }
</style>
<template  style="height: calc(100vh - 75px) ;">
  <div>
    <q-carousel 
    style="height: calc(100vh - 75px) ;"
      swipeable
      animated
      v-model="slide"
      ref="carousel"
      infinite
    >
      <q-carousel-slide :name="1" img-src="~/assets/1.png" />
      <q-carousel-slide :name="2" img-src="~/assets/2.png" />
      <q-carousel-slide :name="3" img-src="~/assets/3.png" />
      <q-carousel-slide :name="4" img-src="~/assets/4.png" />
      <q-carousel-slide :name="5" img-src="~/assets/5.png" />

      <template v-slot:control>
      

        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
          class="q-gutter-xs"
        >
          
          <q-btn 
            color="purple"
            class="NextSlide" 
            align="right" 
            label="Next" 
            @click="(slide == 5)? $router.push('/') :  slide++; "
            >
          
          </q-btn>
            <br />
          <q-btn unelevated 
            class="skipsllide" 
            align="right" 
            label="Skip  >>>" 
            style="color:#807e7e;"
            to="/"
            >
          </q-btn>
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script>


export default {
  data () {
    return {
      slide: 1,
    }
  },methods:{
    slideView(){
        if(this.slide == 5){
             router.push({ path: '/' });
            }
        else{
            $refs.carousel.next();
        }
    },
      
    },
  }

</script>
