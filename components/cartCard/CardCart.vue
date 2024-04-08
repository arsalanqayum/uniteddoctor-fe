<template>


  <base-card>
    <div class="pa-5">
      <v-dialog v-model="showSchedules" max-width="400px">
        <template v-slot:activator="{ on }">

        </template>

        <v-card>
          <v-card-title>
            Doctor Availibility
          </v-card-title>
          <v-card-text>
            <div style="display: flex;flex-direction:column; gap: 5px; width: 100%; align-items: start">
              <v-card v-for="(schedule, index) in available" :key="index" class="mx-auto" max-width="100%" outlined
                @click="$router.push(`/appointment/${schedule.id}`)">

                <!-- <v-card-item>
            <div class="pa-lg-2">
              <div class="text-overline mb-1">
                {{ variant }}
              </div>
              <div class="text-h6 mb-1">
                <b
                  >{{ schedule.location }} ({{
                    schedule.type == 'onsite' ? 'Mardam' : 'online'
                  }})</b
                >
              </div>
              <div
                style="display: flex; justify-content: space-between"
                class="text-caption"
              >
                <div v-if="schedule.available">
                  <small style="color: green"
                    >Available {{ schedule.available[0].date }} to
                    {{
                      schedule.available[schedule.available.length - 1].date
                    }}</small
                  >
                </div>
                <div>
                  <small style="font-weight: 800"
                    >RS. {{ schedule.consultation_fee }}</small
                  >
                </div>
              </div>
            </div>
          </v-card-item> -->

                <v-card-actions class="card-footer">
                  <small>{{ schedule.offer_label }}</small>
                </v-card-actions>
              </v-card>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="showSchedules = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="d-flex justify-space-between align-center flex-wrap">
        <div class="d-flex align-center">
          <v-avatar size="150" class="me-4">
            <img :src="contentImg" alt="" />
          </v-avatar>
          <div>
            <h4 class="font-600">Assist. Prof. Dr.{{ contentText }}</h4>
            <p class="mb-0 grey--text text--darken-1">
              <span v-for="(education, index) in speciality" :key="index">
                {{ education.specialization.name
                }}{{ speciality.length - 1 > index ? ',' : '' }}</span>
            </p>

            <p class="mb-0 grey--text text--darken-1">
              <span v-for="(education, index) in speciality" :key="index">{{ education.specialization.name }},</span>
            </p>
            <div class="mb-2">
          <template v-for="i in 5">
            <v-icon :key="i" :color="i <= contentRating ? 'yellow darken-2' : 'grey lighten-2'">
              {{ i <= contentRating ? 'mdi-star' : 'mdi-star-outline' }}
            </v-icon>
          </template>
          <span class="ml-2">{{ Math.round(contentRating*10)/10 }}</span>
        </div>

        <!-- Review Count -->
        <p class="mb-0 grey--text text--darken-1">
          {{ reviewsCount }} reviews
        </p>
            <!-- <div class="mt-3">
              <v-row>
                <v-col cols="4">
                  <b>Under 15 Min</b>
                  <br />
                  <small>Wait time</small>
                </v-col>
                <v-col cols="4">
                  <b>Under 15 Min</b>
                  <br />
                  <small>Experience</small>
                </v-col>
                <v-col cols="4">
                  <b>Under 15 Min</b>
                  <br />
                  <small>Satisfied Patients</small>
                </v-col>
              </v-row>
            </div> -->
          </div>
        </div>
        <div style="display: flex; flex-direction: column">
          <v-btn large outlined> Video Consultation </v-btn>
          <v-btn @click="showAvailibility(availibility)" large color="#ff9e15" class="mt-1"> Book Appointment </v-btn>
        </div>
        <!-- <p class="mb-0 grey--text text--darken-1">SILVER USER</p> -->
      </div>
     
        <carousel class="mt-5" :perPage="3">
          <slide v-for="(schedule, index) in available" :key="index">
          <v-card :key="index" class="mx-auto" max-width="544" outlined
            @click="$router.push(`/appointment/${schedule.id}`)">
            <v-card-item>
              <div class="pa-lg-2">
                <div class="text-overline mb-1">
                  {{ variant }}
                </div>
                <div class="text-h6 mb-1">
                  <b>{{ schedule.location }} ({{
                    schedule.type == 'onsite' ? 'Mardam' : 'online'
                  }})</b>
                </div>
                <div style="display: flex; justify-content: space-between" class="text-caption">

                  <div>
                    <small style="color: green">Available {{ schedule.available[0] ? schedule.available[0].date : '' }} to
                      {{
                        schedule.available[schedule.available.length - 1] ? schedule.available[schedule.available.length -
                          1].date : ''
                      }}</small>
                  </div>
                  <div>
                    <small style="font-weight: 800">RS. {{ schedule.consultation_fee }}</small>
                  </div>
                </div>
              </div>
            </v-card-item>

            <v-card-actions class="card-footer">
              <small>{{ schedule.offer_label }}</small>
            </v-card-actions>
          </v-card>
          </slide>
        </carousel>
     
    </div>
  </base-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import OwlCarousel from "./OwlCarousel.vue"

import { Carousel, Slide } from 'vue-carousel';


export default {
  components: {
    
    Carousel,
    Slide
  },
  props: {
    btnText: {
      type: String,
      default: '',
    },
    cardHoverShadow: {
      type: Boolean,
      default: false,
    },
    counter: {
      type: Number,
      default: 0,
    },
    contentImg: String,
    reviewsCount:String,
    contentText: String,
    speciality: Array,
    availibility: Array,
    amount: {
      type: Number,
      default: 200,
    },
    contentRating: {
      type: Number,
      default: 4.5,
    },
  },
  computed: {
    ...mapGetters(['getProducts']),
  },
  data() {
    return {
      showSchedules: false,
      available:[],
      
    }
  },
  mounted(){
    this.available=this.availibility;
  },
  methods: {
    ...mapActions(['addCart']),
    showAvailibility(item) {
      this.showSchedules = true;
      this.available = item;
    }
  },
}
</script>
<style lang="scss" scoped>
.br-t-8 {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

.card-footer {
  background: #3333ac;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  font-weight: 800;
  color: #fff;
  align-items: center;
  animation: 4.5s ease-in-out infinite discountplaceholderShimmer;
}

.card-hover {
  &:hover {
    .card-hover-icon {
      display: block;
    }
  }

  .card-hover-icon {
    display: none;
  }
}
</style>