<template>
  <v-card>
    <v-card-text>
      <v-form ref="schedule" @submit.prevent="next">
        <v-row v-for="(schedule, index) in schedules" :key="index" style="border-radius: 5px;" class=" border-primary d-flex mb-2 row">
          <v-col cols="2" class="mt-5">
            <v-radio-group v-model="schedule.type" row>
              <v-radio label="Date" value="date" dense></v-radio>
              <v-radio label="Day" value="day" dense></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="3" class="mt-5" v-if="schedule.type === 'date'">
            <v-menu dense v-model="schedule.dateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on }">
                <v-text-field dense v-model="schedule.date" label="Date" append-icon="mdi-calendar" readonly v-on="on" outlined :rules="[(v) => !!v || 'Date is required']"></v-text-field>
              </template>
              <v-date-picker dense v-model="schedule.date" @input="schedule.dateMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="3" class="mt-5" v-else>
            <v-select dense v-model="schedule.day" :items="daysOfWeek" label="Day" append-icon="mdi-calendar" outlined :rules="[(v) => !!v || 'Day is required']"></v-select>
          </v-col>
          <v-col cols="3" class="mt-5" v-if="schedule.type === 'day'">
            <v-menu dense v-model="schedule.validUntilMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on }">
                <v-text-field dense v-model="schedule.validUntil" label="Valid Until" append-icon="mdi-calendar" readonly v-on="on" outlined :rules="[(v) => !!v || 'Valid Until date is required']"></v-text-field>
              </template>
              <v-date-picker dense v-model="schedule.validUntil" @input="schedule.validUntilMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="3" class="mt-5">
            <v-menu dense v-model="schedule.fromMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on }">
                <v-text-field dense v-model="schedule.fromTime" label="From" format="24hr" append-icon="mdi-clock-time-four" readonly v-on="on" outlined :rules="[(v) => !!v || 'From time is required']"></v-text-field>
              </template>
              <v-time-picker dense v-model="schedule.fromTime" @input="schedule.fromMenu = false" format="24hr"></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="3" class="mt-5">
            <v-menu dense v-model="schedule.toMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on }">
                <v-text-field dense v-model="schedule.toTime" label="To" format="24hr" append-icon="mdi-clock-time-four" readonly v-on="on" outlined :rules="[
                  (v) => !!v || 'To time is required',
                  (v) => (!!schedule.fromTime && schedule.toTime > schedule.fromTime) || 'To time must be after From time',
                ]"></v-text-field>
              </template>
              <v-time-picker dense v-model="schedule.toTime" @input="schedule.toMenu = false" format="24hr"></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="3" class="mt-5">
            <v-menu dense v-model="schedule.durationMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on }">
                <v-text-field dense v-model="schedule.duration" label="Duration" append-icon="mdi-clock-time-four" readonly v-on="on" outlined :rules="[(v) => !!v || 'Duration is required']"></v-text-field>
              </template>
              <v-time-picker dense v-model="schedule.duration" @input="schedule.durationMenu = false" format="24hr"></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="3" class="mt-5 d-flex justify-center">
            <v-btn dense fab small color="error" icon @click="removeSchedule(index)" v-if="schedules.length > 1 && shouldShowButtons">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn dense fab small color="primary" icon @click="addSchedule" v-if="shouldShowButtons">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <div v-if="!shouldShowButtons" class="ml-11 navigation-buttons">
          <v-btn small color="primary" type="submit">
            Update
          </v-btn>
        </div>
        <v-row justify="space-between" class="mt-3">
          <v-col cols="12" class="d-flex justify-space-between align-center">
            <v-btn v-if="shouldShowButtons && step > 1" @click="prev" small color="primary" class="me-2">
              <v-icon left>mdi-chevron-left</v-icon>
              Previous
            </v-btn>
            <div v-else></div>
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
  data() {
    return {
      daysOfWeek: [
        { text: 'Monday', value: 'Monday' },
        { text: 'Tuesday', value: 'Tuesday' },
        { text: 'Wednesday', value: 'Wednesday' },
        { text: 'Thursday', value: 'Thursday' },
        { text: 'Friday', value: 'Friday' },
        { text: 'Saturday', value: 'Saturday' },
        { text: 'Sunday', value: 'Sunday' }
      ]
    }
  },
  computed: {
    shouldShowButtons() {
      return this.$route.path === "/dashboard/schedule/create";
    },
    step: {
      get() {
        return this.$store.state.schedule.step;
      },
      set(value) {
        this.$store.commit('SET_STEPS', value);
      },
    },
    schedules: {
      get() {
        return this.$store.state.schedule.schedules;
      },
      set(value) {
        this.$store.commit('SET_SCHEDULE', value);
      },
    },
  },
  methods: {
    prev() {
      this.step = 1;
    },
    next() {
      const isValid = this.$refs.schedule.validate();
      if (!this.shouldShowButtons && isValid) {
        let schedule = this.schedules[0];
        if (!this.validateSchedule(schedule)) {
          return;
        }
        delete schedule.dateMenu;
        schedule.start_time = schedule.fromTime;
        schedule.end_time = schedule.toTime;
        delete schedule.fromTime;
        delete schedule.fromMenu;
        delete schedule.toTime;
        delete schedule.toMenu;
        delete schedule.durationMenu;
        delete schedule.type;
        delete schedule.validUntilMenu;
        this.$axios.put(`doctor/availability/${this.$store.state.schedule.id}`, schedule).then((response) => {
          this.$bus.$emit('schedule');
        });
      }
      if (isValid && this.step < 3) {
        this.step = 3;
      }
    },
    validateSchedule(schedule) {
      const now = new Date();
      const twoMonthsLater = new Date();
      twoMonthsLater.setMonth(now.getMonth() + 2);
      if (schedule.type === 'day') {
        const selectedDay = schedule.day;
        let nextValidDate = new Date();
        let dayIndex = this.daysOfWeek.findIndex(day => day.value === selectedDay);
        while (nextValidDate.getDay() !== dayIndex) {
          nextValidDate.setDate(nextValidDate.getDate() + 1);
        }
        if (nextValidDate > twoMonthsLater) {
          this.$toast.error(`The selected day (${selectedDay}) is outside the next two months.`);
          return false;
        }
      } else if (schedule.type === 'date') {
        const selectedDate = new Date(schedule.date);
        if (selectedDate > twoMonthsLater) {
          this.$toast.error(`The selected date (${selectedDate.toDateString()}) is outside the next two months.`);
          return false;
        }
      }
      return true;
    },
    removeSchedule(index) {
      this.schedules.splice(index, 1);
    },
    addSchedule() {
      const schedules = [...this.schedules, {
        type: 'date',
        day: null,
        date: null,
        dateMenu: false,
        validUntil: null, // Add validUntil field for "day" type
        validUntilMenu: false,
        fromTime: null,
        fromMenu: false,
        toTime: null,
        toMenu: false,
        duration: null,
        durationMenu: false,
      }];
      this.schedules = schedules;
    },
  },
}
</script>
