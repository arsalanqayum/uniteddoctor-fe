<template>
 <v-row justify="center">
    <v-col cols="12" md="6" lg="6">
  <base-card>
    <div class="pa-5">
      <div class="d-flex justify-space-between align-center flex-wrap">
        <div class="d-flex align-center">
          <v-avatar v-if="doctor" size="150" class="me-4">
            <img :src="doctor.avatar" alt="" />
          </v-avatar>
          <div>
            <h4 class="font-600">
              Assist. Prof. Dr.{{ doctor.first_name }} {{ doctor.last_name }}
            </h4>
            <p class="mb-0 grey--text text--darken-1">
              <span v-for="(education, index) in doctor.education" :key="index">
                {{ education.degree
                }}{{ education.length - 1 > index ? ',' : '' }}</span
              >
            </p>

            <p class="mb-0 grey--text text--darken-1">
              <span
                v-for="(expereince, index) in doctor.expereince"
                :key="index"
                >{{ expereince.jobTitle }},</span
              >
            </p>
            <p class="mb-0 grey--text text--darken-1">
              <span
                v-for="(
                  doctor_specialities, index
                ) in doctor.doctor_specialities"
                :key="index"
                >{{ doctor_specialities.specialization.name }},</span
              >
            </p>
            <div class="mb-2">
          <template v-for="i in 5">
            <v-icon :key="i" :color="i <= doctor.average_rating ? 'yellow darken-2' : 'grey lighten-2'">
              {{ i <= doctor.average_rating ? 'mdi-star' : 'mdi-star-outline' }}
            </v-icon>
          </template>
          <span class="ml-2">{{ Math.round(doctor.average_rating*10)/10 }}</span>
        </div>

        <!-- Review Count -->
        <p class="mb-0 grey--text text--darken-1">
          {{ doctor.reviews_count }} reviews
        </p>
            <p class="mt-2">
              
                {{ data.location }}
           
            </p>
            <p class="mt-2">
              <v-chip color="green">
                {{ data.offer_label }}
              </v-chip>
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
          <!-- <v-btn large outlined> Video Consultation </v-btn> -->
          <!-- <v-btn @click="showAvailibility(availibility)" large color="#ff9e15" class="mt-1"> Book Appointment </v-btn> -->
        </div>
      </div>
      <div style="display: flex; gap: 5px; width: 62%; align-items: start">
        <!-- <v-card
          v-for="(schedule, index) in availibility"
          :key="index"
          class="mx-auto"
          max-width="544"
          outlined
        >
          <v-card-item>
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
                <div>
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
          </v-card-item>

          <v-card-actions class="card-footer">
            <small>{{ schedule.offer_label }}</small>
          </v-card-actions>
        </v-card> -->
      </div>
    </div>
  </base-card>
    </v-col>
 </v-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['doctor', 'data'],

  computed: {
    ...mapGetters(['getProducts']),
  },
  data() {
    return {
      showSchedules: false,
      availibility: [],
    }
  },
  methods: {
    ...mapActions(['addCart']),
    showAvailibility(item) {
      this.showSchedules = true
      this.availibility = item
    },
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