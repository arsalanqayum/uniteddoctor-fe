<template>
  <v-app>
    <v-content>
      <v-stepper v-model="step" vertical>
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1"
            >Practace Details</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2"
            >Schedule Details</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step step="3">Summary</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <schedule-type />
          </v-stepper-content>
          <v-stepper-content step="2"> <scheduleDataVue/> </v-stepper-content>
          <v-stepper-content step="3">
           <confirmScheduleVue/>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-content>
  </v-app>
</template>

<script>
import confirmScheduleVue from './confirmSchedule.vue'
import scheduleDataVue from './scheduleData.vue'
import scheduleType from './scheduleType.vue'

export default {
  components: { scheduleType, scheduleDataVue,confirmScheduleVue },
  computed: {
    step() {
      return this.$store.state.schedule.step
    },
  },
  data() {
    return {
      type: 'remote',
      formData: {
        name: '',
        email: '',
        phone: '',
        address: '',
      },
    }
  },
  methods: {
    removeSchedule(index) {
      this.schedules.splice(index, 1)
    },
    next(e) {
      e.preventDefault()
      const isValid = this.$refs.schedule.validate()
      console.log('yes', isValid, this.$refs.schedule)
      if (isValid && this.step < 3) {
        this.step++
      }
    },
    
  },
}
</script>

<style>
/* Optional styling for the example */
.v-stepper-content p {
  margin-bottom: 10px;
}

.navigation-buttons {
  display: flex;
  align-content: flex-start;
  gap: 68px;
}
</style>