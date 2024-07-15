<template>
  <v-container class="py-6">
      <v-row>
        <v-col cols="12">
            <div class="box-wrapper">
                <div class="box-overlay" :class="{'open': isSidebar}"  @click="isSidebar = !isSidebar"></div>
                <div class="box-sidebar pb-3 shadow-sm" :class="{'open': isSidebar}">
                     <DashbordSidebar />
                </div>
                <div class="box-content">
                    <div class="d-flex justify-end pa-2 d-block d-md-none">
                    <v-btn
                        icon   
                        @click="isSidebar = !isSidebar"
                    >
                        <v-icon dark>
                            mdi-format-list-bulleted-square
                        </v-icon>
                    </v-btn>
                    </div>
                    <div class="box-container">
                        <div class="d-flex justify-space-between flex-wrap mb-5">
                           <div class="d-flex align-center ">
                                <img class="icon mr-3 primary--text" src="@/assets/images/icons/heart_filled.svg" alt="" />
                                <h2 class="mb-0">Practace List</h2>
                            </div>
                            <v-btn 
                                color="primary"
                                outlined
                                @click="$router.push('/dashboard/schedule/create')"
                                class="text-capitalize font-600"
                            >
                                Add Clincal Pratace
                            </v-btn>
                       </div>
                       <div class="d-none px-4 d-md-flex mb-5">
                           <h4 class="font-600 grey--text text--darken-2 flex-1 mr-3">Clinic/Hospital Name </h4>
                           <h4 class="font-600 grey--text text--darken-2 flex-1 mr-3">Type </h4>
                           <h4 class="font-600 grey--text text--darken-2 flex-1 mr-3">Offer </h4>
                           <h4 class="font-600 grey--text text--darken-2 flex-1 mr-3">Consultation Fee </h4>
                           <h4 class="font-600 grey--text text--darken-2 flex-1 mr-3">Total Number Available Days </h4>
                           <div class="px-5">
                            
                           </div>
                       </div>
                       
                       <v-data-iterator
                            :items="items"
                            :items-per-page.sync="itemsPerPage"
                            :page.sync="page"
                            hide-default-footer
                        >
                            

                            <template v-slot:default="props">
                            <v-row>
                                <v-col
                                v-for="item in props.items"
                                :key="item.name"
                                cols="12"
                               
                                
                                >
                                 <a href="#" class="text-decoration-none">
                                    <base-card class="">
                                        <div class="pa-4 d-flex align-center flex-wrap">
                                            <div class="flex-1 mr-3">
                                                <h4 >{{item.type =='remote' ? 'Online consultation':item.location}}</h4>
                                            </div>
                                            <div class="flex-1 mr-3">
                                                
                                                    {{item.type=='onsite' ?'Physical visit':'Video Calling'}}
                                               
                                            </div>
                                            <div class="flex-1 mr-3">
                                                <p class="mb-0">{{item.offer_label}}</p>
                                            </div>
                                            
                                            <div class="flex-1 mr-3">
                                                <p class="mb-0">${{item.consultation_fee}}</p>
                                            </div>
                                            <div class="flex-1 mr-3">
                                                <p class="mb-0">{{item && item.available ? item.available.length: 0}}</p>
                                            </div>
                                            <v-btn
                                                icon
                                                color="grey"
                                                class=""
                                                :to="`/dashboard/schedule/${item.id}`"
                                            >
                                                <v-icon>mdi-arrow-right</v-icon>
                                            </v-btn>
                                        </div>
                                    </base-card>
                                 </a>
                                </v-col>
                            </v-row>
                            </template>

                            <template v-slot:footer>
                            <v-row
                                class="my-5 me-1"
                                align="center"
                                justify="center"
                            >
                                

                                <v-spacer></v-spacer>

                                <span
                                class="mr-4
                                grey--text"
                                >
                                Page {{ page }} of {{ numberOfPages }}
                                </span>
                                <v-btn
                                fab
                                :disabled="page == 1"
                                small
                                color="primary"
                                class="mr-1"
                                
                                @click="formerPage"
                                >
                                <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                                <v-btn
                                fab
                                
                                :disabled="page == numberOfPages"
                                small
                                color="primary"
                                class="ml-1"
                                @click="nextPage"
                                >
                                <v-icon>mdi-chevron-right</v-icon>
                                </v-btn>
                            </v-row>
                            </template>
                        </v-data-iterator>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardCart from "@/components/cartCard/CardCart";
import DashbordSidebar from "@/components/DashboardSidebar.vue";
export default {
    components: {
        CardCart,
        DashbordSidebar
    },
    head: {
        title: 'Appointment List'
    },
    data() {
        return{
            isSidebar: false,
            page: 1,
            itemsPerPage: 5,
            items: [0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20],
            
            range: [0, 100, 500, 1000],
            itemsTwo: ['Low to High', 'High to Low', 'Date'],
            
            
        }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      }, 
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
        this.getSchedule();
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        getSchedule(){
         return this.$axios.get('doctor/availability').then((response)=>{
          this.items = response.data.data;
         })
        },
        nextPage () {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage () {
            if (this.page - 1 >= 1) this.page -= 1
        },
        season (val) {
            return this.range[val]
        },
    }
}
</script>

