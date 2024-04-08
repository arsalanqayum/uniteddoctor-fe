<template>
  <v-container class="mt-6">
    <v-row>
      <v-col cols="12">
        <base-card>
          <v-card-text
            class="ps-6 d-flex justify-space-between align-center flex-wrap"
          >
            <div class="my-2">
              <h4 class="">Searching for "Doctors"</h4>
              <p class="gray--text text--darken-1 mb-0">{{items.length}} results found</p>
            </div>
            <div class="d-flex align-center flex-wrap">
              <div class="grey--text text--darken-1 me-2 my-2">Sort by :</div>
              <v-select
                class="border me-5"
                :items="itemsTwo"
                label="Relevance"
                dense
                v-model="select"
                @change="relevance('amount')"
                outlined
                hide-details
                flat
              ></v-select>
              <div class="grey--text text--darken-1 me-2 my-2">View :</div>
              <v-btn icon>
                <img class="icon" src="@/assets/images/icons/grid.svg" alt="" />
              </v-btn>
              <v-btn icon>
                <img class="icon" src="@/assets/images/icons/menu.svg" alt="" />
              </v-btn>
            </div>
          </v-card-text>
        </base-card>
      </v-col>
      <v-col cols="12">
        <div class="box-wrapper">
          <div
            class="box-overlay"
            :class="{ open: isSidebar }"
            @click="isSidebar = !isSidebar"
          ></div>
          <div class="box-sidebar pb-3 shadow-sm" :class="{ open: isSidebar }">
            <h5 class="ps-6 mb-6 mt-6">Search</h5>
            <div class="mx-6 pt-3">
              <v-text-field
                outlined
                hide-details
                v-model="form.query"
                placeholder="Enter Hospital Name"
                class="mb-4"
                @input="handleInput"
              ></v-text-field>
            </div>

            <v-divider class="mx-6 my-1"></v-divider>

            <div class="mx-6 pt-3">
              <h5 class="mb-6">City</h5>
              <v-autocomplete
                v-model="form.city"
                placeholder="Search for doctors,specialties,services,diseases"
                outlined
                :items="cities"
                @change="updateForm"
                item-text="name"
                item-value="id"
              >
              </v-autocomplete>

              <v-divider class="pa-0 ma-0"></v-divider>
              <h5 class="mb-6">Specialization</h5>
              <v-autocomplete
                v-model="form.specialization"
                placeholder="Search for doctors,specialties,services,diseases"
                outlined
                :items="specializations"
                @change="updateForm"
                item-text="name"
                item-value="id"
              >
              </v-autocomplete>

              <v-divider class="pa-0 ma-0"></v-divider>
              <h5 class="mb-6">Gender</h5>
              <v-radio-group
                @change="updateForm"
                :rules="[(v) => !!v || 'This field is required']"
                v-model="form.gender"
                inline
              >
                <v-radio label="Male" value="male"></v-radio>
                <v-radio label="Female" value="female"></v-radio>
                <!-- <v-radio label="Radio Three" value="three"></v-radio> -->
              </v-radio-group>

              <v-divider class="pa-0 ma-0"></v-divider>
              <h5 class="pt-3">Consultation Fee</h5>
              
              <v-range-slider
                class="mt-10"
                :value="[1, 2]"
                @change="updateForm"
                min="500"
                max="6000"
                v-model="form.consultation_fee"
                tick-size="1"
              >
                <template v-slot:thumb-label="props">
                  {{ season(props.value) }}
                </template>
              </v-range-slider>
            </div>
          </div>
          <div class="box-content">
            <div class="d-flex justify-end pa-2 d-block d-md-none">
              <v-btn icon @click="isSidebar = !isSidebar">
                <v-icon dark> mdi-format-list-bulleted-square </v-icon>
              </v-btn>
            </div>
            <div class="box-container">
              <v-row>
                <v-col cols="12">
                 
                  <v-data-iterator
                    v-if="items"
                    :items="items"
                    :items-per-page.sync="itemsPerPage"
                    :page.sync="page"
                    hide-default-footer
                  >
                    <template v-slot:default="props">
                      <v-row>
                        <v-col
                          v-for="(item, index) in props.items"
                          :key="index"
                          cols="12"
                          sm="12"
                          md="12"
                          lg="12"
                          xl="12"
                        >
                          <CardCart
                            :content-img="item.avatar"
                            v-if="item"
                            :content-text="`${item.first_name} ${item.last_name}`"
                            :amount="item.amount"
                            :contentRating="item.average_rating"
                            :counter="item.qty"
                            :reviewsCount="item.reviews_count"
                            :speciality="item.doctor_specialities"
                            :availibility="item.schedules"
                            @cartRemove="removeCart(item)"
                            @cartAdd="addCart(item)"
                          >
                          </CardCart>
                        </v-col>
                      </v-row>
                    </template>

                    <template v-slot:footer>
                      <v-row class="my-5 me-1" align="center" justify="center">
                        <v-spacer></v-spacer>

                        <span class="mr-4 grey--text">
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
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardCart from '@/components/cartCard/CardCart'
import debounce from 'lodash/debounce';
export default {
  components: {
    CardCart,
  },
  data() {
    return {
      cities: [
        'New York',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix', // United States
        'London',
        'Manchester',
        'Birmingham',
        'Glasgow',
        'Liverpool', // United Kingdom
        'Toronto',
        'Montreal',
        'Vancouver',
        'Calgary',
        'Ottawa', // Canada
        'Sydney',
        'Melbourne',
        'Brisbane',
        'Perth',
        'Adelaide', // Australia
        'Mumbai',
        'Delhi',
        'Bangalore',
        'Hyderabad',
        'Chennai', // India
        // Add more cities here as needed
      ],
      city: '',
      isSidebar: false,
      page: 1,
      itemsPerPage: 8,
      specializations: [],
      range: [500, 1000, 2000, 3000,4000,5000],
      itemsTwo: ['Low to High', 'High to Low'],
      select: '',
      items:[],
      cartCount: 0,
      filterProductList: [],
      filterProduct: [],
      selected: [],
      specialization: 0,
      form: {
        query: this.$route.query && this.$route.query.query ? this.$route.query.query : '',
        city:  this.$route.query && this.$route.query.city ?this.$route.query.city :'',
        consultation_fee: [500,4000],
        specialization: null,
        gender: this.$route.query && this.$route.query.gender ? this.$route.query.gender : ''
      },
    }
  },
  head: {
    title: 'Search Product',
  },
  computed: {
    ...mapGetters(['getProducts', 'getCategory', 'getRatings']),
    doctors() {
      return this.$store.state.doctor
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
  },
  mounted() {
   this.form.specialization=this.$route.query.spcialization?parseInt(this.$route.query.spcialization):null
    this.getSpecialization()
    this.updateForm();
   
  },

  methods: {
    ...mapActions(['addCart', 'removeCart']),
    handleInput() {
      // Call the debounced function with the input value
      this.debouncedSearch(this.form.query);
    },
    debouncedSearch: debounce(function(query) {
      // Your search logic goes here
      // console.log('Searching for:', query);
      this.updateForm();
    }, 500),
    updateForm() {
      console.log( this.form);
      this.$router.push({ path: '/doctor/search', query: this.form })
      this.$axios
        .get('/doctor-search', {params:this.form})
        .then((response) => {
          
        this.items=response.data.data
          
        })
    },
    getSpecialization() {
      this.$axios.get(`specialization`).then((response) => {
        this.specializations = response.data.data
       
        
      })
    },
    relevance(amount) {
      if (this.select == 'Low to High') {
        this.items = this.items.sort((a, b) => (a[amount] < b[amount] ? -1 : 1))
      } else {
        this.items = this.items.sort((a, b) => (a[amount] > b[amount] ? -1 : 1))
      }
    },
    // fullProducts () {
    //   this.items = this.getProducts
    // },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    season(val) {
      return this.range[val]
    },

    filterCategory(category) {
      this.items = this.getProducts.filter((x) =>
        this.selected.includes(x.category)
      )
      if (this.selected.length <= 0) {
        this.items = this.getProducts
      }
    },
    filterRatings(rating) {
      this.items = this.getProducts.filter((x) =>
        this.selected.includes(x.rating)
      )
      if (this.selected.length <= 0) {
        this.items = this.getProducts
      }
    },
    productRate(rate) {
      this.items = this.getProducts.filter((x) => x.rating == rate.rates)
      // this.items = this.filterProduct.sort((a, b) => a[rate.rates] < b[rate.rates] ? -1 : 1)
    },
  },
}
</script>

