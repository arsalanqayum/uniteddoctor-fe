<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-form ref="register" @submit.prevent="save">
          <v-card-title> Register As Patient </v-card-title>
          <v-card-text>
            <v-alert dense type="warning">
              Please register before making an appointment.
            </v-alert>
            <p class="text-14 mb-1">First Name</p>
            <v-text-field outlined dense hide-details :rules="[(v) => !!v || 'First Name is required']"
              placeholder="Enter First Name" v-model="form.first_name" class="mb-4"></v-text-field>
            <p class="text-14 mb-1">Last Name</p>
            <v-text-field outlined dense v-model="form.last_name" :rules="[(v) => !!v || 'Last Name is required']"
              hide-details placeholder="Enter Last Name" class="mb-4"></v-text-field>
            <p class="text-14 mb-1">Email</p>
            <v-text-field outlined dense :rules="[(v) => !!v || 'Email is required']" v-model="form.email" hide-details
              placeholder="Enter Email" class="mb-4"></v-text-field>
            <p class="text-14 mb-1">City</p>
            <v-text-field outlined dense v-model="form.city" :rules="[(v) => !!v || 'City is required']" hide-details
              placeholder="Enter City" class="mb-4"></v-text-field>
            <p class="text-14 mb-1">Phone</p>
            <v-text-field outlined dense v-model="form.phone" :rules="[(v) => !!v || 'Phone number is required']"
              hide-details placeholder="Enter Phone number" class="mb-4"></v-text-field>
            <p class="text-14 mb-1">Password</p>
            <v-text-field outlined dense type="password" v-model="form.password" hide-details
              :rules="[(v) => !!v || 'Password is required']" placeholder="Enter Password" class="mb-4"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialog = false">Close</v-btn>
            <v-btn type="submit" color="primary">Register</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-col cols="12" md="8" lg="6">
      <v-card class="doctor-card" outlined tile>
        <v-sheet elevation="0">
          <v-tabs background-color="#fff" next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline" show-arrows v-model="selectedTab">
            <v-tab v-for="(day, index) in 30" :key="index">
              {{ formatDate(getDate(index)) }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="selectedTab">
            <v-tab-item v-for="(day, index) in 30" :key="index">
              <v-card class="slot-card" outlined tile v-if="getTimeSlots(getDate(index)).length > 0">
                <div class="slot-buttons pa-15">
                  <v-btn v-for="(slot, slotIndex) in getTimeSlots(getDate(index))" :key="slotIndex" outlined
                    color="primary" @click="selectTimeSlot(slot, getDate(index))">
                    {{ slot }}
                  </v-btn>
                </div>
              </v-card>
              <v-card v-else>
                <v-card-title class="slot-title">{{ formatDate(getDate(index)) }}</v-card-title>
                <v-card-text>No available time slots for this date</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-sheet>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['availabilities'],
  data() {
    return {
      selectedTab: 0,
      selectedDate: null,
      selectedSlot: null,
      dialog: false,
      form: {
        first_name: '',
        last_name: '',
        email: '',
        city: '',
        password: '',
        phone: '',
        avatar: 'test.png',
        user_type: 'patient',
        lat: '',
        long: '',
      }
    }
  },
  methods: {
    save() {
      const valid = this.$refs.register.validate()
      if (valid) {
        this.$axios.post(`register`, this.form).then((response) => {
          let reqPayload = {}
          const selectedApt =
            this.availabilities[
              this.selectedTab > 0 ? this.selectedTab - 1 : this.selectedTab
            ]
          reqPayload.doctor_availability_id = selectedApt.id
          reqPayload.date = selectedApt.date
          reqPayload.start_time = `${this.selectedSlot.split('-')[0].trim()}:00`
          reqPayload.end_time = `${this.selectedSlot.split('-')[1].trim()}:00`
          reqPayload.schedule_id = selectedApt.schedule_id
          reqPayload.doctor_id = selectedApt.doctor_id
          this.bookAppointment(reqPayload)
          this.$store.commit('SET_TOKEN', response.data.token)
          this.$store.commit('SET_USER_DETAILS', response.data.data)
        })
      }
    },
    bookAppointment(data) {
      this.$axios.post('appointment', data).then((response) => {
        this.$router.push('/dashboard')
      })
    },
    getDate(index) {
      const today = new Date()
      const date = new Date(today)
      date.setDate(today.getDate() + index)
      return date.toISOString().split('T')[0]
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    },
    getTimeSlots(selectedDate) {
      const selectedDayOfWeek = new Date(selectedDate).getDay();
      let matchingSlots = [];

      this.availabilities.forEach((availability) => {
        if (availability.day && availability.validUntil) {
          const validUntilDate = new Date(availability.validUntil);
          const currentSelectedDate = new Date(selectedDate);

          if (currentSelectedDate <= validUntilDate && selectedDayOfWeek === new Date(availability.date).getDay()) {
            availability.timeslots.forEach((slot) => {
              matchingSlots.push(`${slot.start_time.split(':').slice(0, 2).join(':')} - ${slot.end_time.split(':').slice(0, 2).join(':')}`);
            });
          }
        } else if (!availability.day && availability.date === selectedDate) {
          availability.timeslots.forEach((slot) => {
            matchingSlots.push(`${slot.start_time.split(':').slice(0, 2).join(':')} - ${slot.end_time.split(':').slice(0, 2).join(':')}`);
          });
        }
      });

      return matchingSlots;
    },
    selectTimeSlot(slot, date) {
      this.selectedSlot = slot;
      this.selectedDate = date;

      const selectedDayOfWeek = new Date(date).getDay();
      const availability = this.availabilities.find(avail => {
        const availabilityDayOfWeek = new Date(avail.date).getDay();
        return availabilityDayOfWeek === selectedDayOfWeek && avail.is_repeated;
      });

      if (availability) {
        const reqPayload = {
          doctor_availability_id: availability.id,
          date: date,
          start_time: `${slot.split('-')[0].trim()}:00`,
          end_time: `${slot.split('-')[1].trim()}:00`,
          schedule_id: availability.schedule_id,
          doctor_id: availability.doctor_id
        };

        if (this.$store.state && this.$store.state.auth && !this.$store.state.auth.user) {
          this.$toast.error("Please login to complete booking an appointment");
          return false;
        }
        if (this.$store.state && this.$store.state.auth && this.$store.state.auth.user.user_type !== 'doctor') {
          this.bookAppointment(reqPayload);
        } else {
          this.$toast.error("Please create a patient account to book an appointment");
        }
      } else {
        console.log('No availability found for the selected day of the week:', selectedDayOfWeek);
        const nextAvailability = this.availabilities.find(avail => {
          const availabilityDayOfWeek = new Date(avail.date).getDay();
          return availabilityDayOfWeek > selectedDayOfWeek && avail.is_repeated;
        });

        if (nextAvailability) {
          const reqPayload = {
            doctor_availability_id: nextAvailability.id,
            date: nextAvailability.date,
            start_time: `${slot.split('-')[0].trim()}:00`,
            end_time: `${slot.split('-')[1].trim()}:00`,
            schedule_id: nextAvailability.schedule_id,
            doctor_id: nextAvailability.doctor_id
          };

          if (this.$store.state && this.$store.state.auth && this.$store.state.auth.user.user_type !== 'doctor') {
            this.bookAppointment(reqPayload);
          } else {
            this.$toast.error("Please create a patient account to book an appointment");
          }
        } else {
          console.log('No further availability found.');
        }
      }
    }
  }
}
</script>

<style scoped>
.doctor-card {
  margin: 10px;
}

.slot-card {
  margin-top: 10px;
}

.slot-title {
  background-color: #3f51b5;
  color: white;
  padding: 12px;
}

.slot-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
}

.slot-buttons v-btn {
  margin: 5px;
}
</style>
