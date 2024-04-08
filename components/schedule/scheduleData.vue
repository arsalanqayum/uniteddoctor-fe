<template>
  <v-card>
    <v-card-text>
        <v-form ref="schedule" @submit.prevent="next">
          <!-- {{ }} -->
          <v-row v-for="(schedule, index) in schedules" :key="index">
  <v-col cols="2">
    <v-menu dense v-model="schedule.dateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
      <template v-slot:activator="{ on }">
        <v-text-field dense v-model="schedule.date" label="Date" prepend-icon="mdi-calendar" readonly v-on="on" outlined :rules="[(v) => !!v || 'Date is required']"></v-text-field>
      </template>
      <v-date-picker dense v-model="schedule.date" @input="schedule.dateMenu = false"></v-date-picker>
    </v-menu>
  </v-col>
  <v-col cols="2">
    <v-menu dense v-model="schedule.fromMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
      <template v-slot:activator="{ on }">
        <v-text-field dense v-model="schedule.fromTime" label="From" format="24hr" prepend-icon="mdi-clock-time-four" readonly v-on="on" outlined :rules="[(v) => !!v || 'From time is required']"></v-text-field>
      </template>
      <v-time-picker dense v-model="schedule.fromTime" @input="schedule.fromMenu = false" format="24hr"></v-time-picker>
    </v-menu>
  </v-col>
  <v-col cols="2">
    <v-menu dense v-model="schedule.toMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
      <template v-slot:activator="{ on }">
        <v-text-field dense v-model="schedule.toTime" label="To" format="24hr" prepend-icon="mdi-clock-time-four" readonly v-on="on" outlined :rules="[(v) => !!v || 'To time is required', (v) => (!!schedule.fromTime && schedule.toTime > schedule.fromTime) || 'To time must be after From time',]"></v-text-field>
      </template>
      <v-time-picker dense v-model="schedule.toTime" @input="schedule.toMenu = false" format="24hr"></v-time-picker>
    </v-menu>
  </v-col>
  <v-col cols="2">
    <v-menu dense v-model="schedule.durationMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
      <template v-slot:activator="{ on }">
        <v-text-field dense v-model="schedule.duration" label="Duration" prepend-icon="mdi-clock-time-four" readonly v-on="on" outlined :rules="[(v) => !!v || 'Duration is required']"></v-text-field>
      </template>
      <v-time-picker dense v-model="schedule.duration" @input="schedule.durationMenu = false" format="24hr"></v-time-picker>
    </v-menu>
  </v-col>
  <v-col cols="3">
    <v-checkbox dense v-model="schedule.is_repeated" label="Is Repeated" color="primary"></v-checkbox>
  </v-col>
  <v-col cols="1">
    <v-btn dense fab small color="error" icon @click="removeSchedule(index)" v-if="schedules.length > 1 && shouldShowButtons">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <v-btn dense fab small color="primary" icon @click="addSchedule" v-if="shouldShowButtons">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-col>
</v-row>

      <div v-if="!shouldShowButtons" class="ml-11 navigation-buttons">
        <v-btn  small  color="primary" type="submit">
          update
          <!-- <v-icon>mdi-chevron-right</v-icon> -->
        </v-btn>
        </div>
        <v-row justify="space-between" class="mt-3">
          <v-col cols="12" class="d-flex justify-space-between align-center">
            <!-- Previous Button: Only show if `shouldShowButtons` is true and not on the first step -->
            <v-btn v-if="shouldShowButtons && step > 1" @click="prev" small color="primary" class="me-2">
              <v-icon left>mdi-chevron-left</v-icon>
              Previous
            </v-btn>

            <!-- Placeholder to keep the space if Previous button is not shown -->
            <div v-else></div>

            <!-- Next or Update Button -->
            <v-btn v-if="shouldShowButtons" type="submit" small color="primary">
              Next
              <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
            <v-btn v-else type="submit" small color="primary">
              Update
            </v-btn>
          </v-col>
        </v-row>
        </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    shouldShowButtons(){
      return this.$route.path == "/dashboard/schedule/create" ? true : false;
    },
    step: {
      get() {
        return this.$store.state.schedule.step
      },
      set(value) {
        this.$store.commit('SET_STEPS', value)
      },
    },
    schedules: {
      get() {
        return this.$store.state.schedule.schedules
      },
      set(value) {
        console.log(value,'ddddddddddddddd')
        this.$store.commit('SET_SECHEDULE', value)
      },
    },
  },
  methods: {
    prev(){
        this.step =1;
    },
    next(e) {
      //   e.preventDefault()
        const isValid = this.$refs.schedule.validate()
        console.log(this.$store.state.schedule.id)
        if(!this.shouldShowButtons && isValid){
         let schedule = this.schedules[0];
         delete schedule.dateMenu;
         schedule.start_time = schedule.fromTime;
         schedule.end_time = schedule.toTime;
         delete schedule.fromTime;
         delete schedule.fromMenu;
         delete schedule.toTime;
         delete schedule.toMenu;
         delete schedule.durationMenu;
        //  schedule.id = this.$store.state.schedule.id;
          this.$axios.put(`doctor/availibility/${this.$store.state.schedule.id}`,schedule).then((response)=>{
            console.log(response);
            this.$bus.$emit('schedule');
          })
        }
      if (isValid && this.step < 3) {
        this.step = 3
      }
    },
    removeSchedule(index) {
      this.schedules.splice(index, 1)
    },
    addSchedule() {
      const schedules = this.schedules
      schedules.push({
        date: null,
        dateMenu: false,
        is_repeated:true,
        fromTime: null,
        fromMenu: false,
        toTime: null,
        toMenu: false,
        duration: null,
        durationMenu: false,
      })
      this.schedules= schedules;
      //   this.schedules.push({
      //     date: null,
      //     dateMenu: false,
      //     fromTime: null,
      //     fromMenu: false,
      //     toTime: null,
      //     toMenu: false,
      //     duration: null,
      //     durationMenu: false,
      //   })
    },
  },
}
</script>