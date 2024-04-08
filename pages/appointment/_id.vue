<template>
  <v-container class="my-6">
    <v-row>
      <v-col cols="12" md="12" lg="12" xl="12">
        
        <doctorDetailVue v-if="data" :data="data" :doctor="data.doctor" />
      </v-col>
       <v-col cols="12" md="12" lg="12" xl="12">
        <timeSlot v-if="data" :availabilities="data.available"/>
       </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardCart from '@/components/cartCard/CardCart'
import doctorDetailVue from '~/components/appointment/doctorDetail.vue';
import timeSlot from '~/components/appointment/timeSlot.vue'
export default {
  components: {
    CardCart,
    doctorDetailVue,
    timeSlot,
  },
  head: {
    title: 'Single Product',
  },
  computed: {
    ...mapGetters(['getProducts']),
  },
  data() {
    return {
      tab: null,
       data:null,
      singleProductData: {
        id: 1,
        img: require('@/assets/images/products/flash-1.png'),
        title: 'Sneakers',
        category: 'Sneakers',
        amount: 300,
        rating: 3,
        qty: 0,
      },
      flashDeals: [
        {
          img: require('@/assets/images/products/flash-1.png'),
          name: 'Sneakers',
        },
        {
          img: require('@/assets/images/products/flash-2.png'),
          name: 'Watch',
        },
        {
          img: require('@/assets/images/products/flash-3.png'),
          name: 'Mobile',
         
        },
      ],
    }
  },
  mounted(){
    this.$axios.get(`doctor/availibility/${this.$route.params.id}`).then((response)=>{
       this.data =response.data.data;
    })
  },
  methods: {
    ...mapActions(['addCart', 'removeCart']),
    addCartx(data) {
      this.addCart(data)
    },
    removeCartx(data) {
      this.removeCart(data)
    },
  },
}
</script>
<style lang="scss" scoped>
.product-slider {
  .product-slider-click {
    display: flex;
    justify-content: center;
    ::v-deep .slick-slide {
      width: 80px !important;
      margin-right: 16px;
      border: 1px solid rgb(218, 225, 231);
      border-radius: 5px;
    }
    ::v-deep .slick-current {
      border: 1px solid #d23f57;
      border-radius: 5px;
    }
  }
}
</style>
