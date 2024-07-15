<template>
  <v-card class="ma-5">
    <v-card-text>
      <div>
        <h4 class="my-4">Type : {{ schedules.type }}</h4>
        <h4 v-if="schedules.type == 'onsite' && schedules.location" class="my-3">
          Location : {{ schedule.location.name }}
        </h4>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">Date</th>
              <th v-if="schedule && schedule.type === 'day'" class="text-left">Valid Until</th>
              
              <th class="text-left">From</th>
              <th class="text-left">To</th>
              <th class="text-left">Appointment Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(schedule, index) in schedules.schedules" :key="index">
              <td>{{ schedule && schedule.type === 'day' ? `${schedule.day} valid till ${schedule.validUntil}` : schedule.date }}</td>
              <!-- <td v-if="schedule.type === 'day'">{{ schedule.validUntil }}</td> -->
              <td>{{ schedule.fromTime }}</td>
              <td>{{ schedule.toTime }}</td>
              <td>{{ schedule.duration }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
      <div class="d-flex justify-end align-center mt-5 space-x-2">
        <!-- Previous Button -->
        <v-btn outlined color="primary" @click="prev" :disabled="step === 2" class="mr-2">
          <v-icon left>mdi-chevron-left</v-icon>
          Previous
        </v-btn>
        
        <!-- Confirm and Save Schedule Button -->
        <v-btn color="green" dark @click="save">
          Confirm and Save
          <v-icon right>mdi-check</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    schedules() {
      return this.$store.state.schedule
    },
    step: {
      get() {
        return this.$store.state.schedule.step
      },
      set(value) {
        this.$store.commit('SET_STEPS', value)
      },
    },
  },
  methods: {
    save() {
      const reqPayload = {}
      reqPayload.type = this.schedules.type
      reqPayload.is_repeated = true;
      if (reqPayload.type === 'onsite') {
        reqPayload.location = this.schedules.location
      }
      reqPayload.offer_label = this.schedules.offer_label;
      reqPayload.consultation_fee = this.schedules.fee;
      reqPayload.schedules = this.schedules.schedules.map((item) => ({
        type:item.type,
        date: item.date,
        day:item.day,
        validUntil: item.validUntil,  // Include validUntil date for "day" type
        from: item.fromTime,
        to: item.toTime,
        duration: item.duration,
      }))
      this.$axios.post(`doctor/availability`, reqPayload).then((response) => {
        this.step = 1;
        this.$store.commit("RESET_SCHEDULER");
        this.$toast.success('Clinical Practice Added');
        this.$router.push('/dashboard/schedule');
      })
    },
    prev() {
      if (this.step > 1) {
        this.step = 2
      }
    },
  },
}
</script>

<style scoped>
.navigation-buttons {
  display: flex;
  align-content: flex-start;
  gap: 10px;
}
.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}
.my-3 {
  margin-top: 12px;
  margin-bottom: 12px;
}
</style>
