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
                                  <!-- <img class="icon mr-3 primary--text" src="@/assets/images/icons/heart_filled.svg" alt="" /> -->
                                  <h2 class="mb-0"> Schedule</h2>
                              </div>
                              
                         </div>
                        <!-- here -->
                        <availability/>
                      </div>
                  </div>
              </div>
          </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import CardCart from "@/components/cartCard/CardCart";
  import scheduleCreate from "@/components/schedule/create.vue";
  import DashbordSidebar from "@/components/DashboardSidebar.vue";
  import availability from "@/components/availibility/index.vue"
  export default {
      components: {
          CardCart,
          DashbordSidebar,
          scheduleCreate,
          availability
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
      },
      destroyed () {
          window.removeEventListener('scroll', this.handleScroll);
      },
     
      methods: {
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
  
  