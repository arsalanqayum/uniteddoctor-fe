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
            <v-text-field outlined dense v-model="form.city" :rules="[(v) => !!v || 'Phone number is required']"
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
                <!-- <v-card-title class="slot-title">{{ formatDate(getDate(index)) }}</v-card-title> -->
                <div class="slot-buttons pa-15">
                  <v-btn v-for="(slot, slotIndex) in getTimeSlots(getDate(index))" :key="slotIndex" outlined
                    color="primary" @click="selectTimeSlot(slot, getDate(index))">
                    {{ slot }}
                  </v-btn>
                </div>
              </v-card>
              <v-card v-else>
                <v-card-title class="slot-title">{{
      formatDate(getDate(index))
    }}</v-card-title>
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
        first_name: 'Arsalan',
        last_name: 'Qayum',
        email: 'arsalanqayum24@gmail.com',
        city: 'Mardan',
        password: 'Mardan',
        phone: '+923499041832',
        avatar: 'test.png',
        user_type: 'patient',
        lat: '343434',
        long: '5555',
      },

      //   availabilities: [] // Assign your availabilities data here
    }
  },
  methods: {
    save() {
      // console.log(this.form)
      const valid = this.$refs.register.validate()
      if (valid) {
        this.$axios.post(`register`, this.form).then((response) => {
          console.log('yes')
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
        console.log(response.data)
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
    // For repeated availabilities, check day of the week
    if (availability.is_repeated) {
      const availabilityDayOfWeek = new Date(availability.date).getDay();
      if (availabilityDayOfWeek === selectedDayOfWeek) {
        // Aggregate timeslots for the matching day of the week
        availability.timeslots.forEach((slot) => {
          const startTime = slot.start_time.split(':').slice(0, 2).join(':');
          const endTime = slot.end_time.split(':').slice(0, 2).join(':');
          matchingSlots.push(`${startTime} - ${endTime}`);
        });
      }
    }
    // Handle non-repeated availabilities directly based on date match here if needed
  });

  return matchingSlots;
},



    selectTimeSlot(slot, date) {
  // Handle the click event when a time slot is selected
  this.selectedSlot = slot;
  this.selectedDate = date; // Update the selected date

  console.log('Selected date:', date);
  console.log('Selected time slot:', slot);

  // Get the day of the week (0-6, where 0 is Sunday) for the selected date
  const selectedDayOfWeek = new Date(date).getDay();

  // Find the availability that matches the selected day of the week
  const availability = this.availabilities.find(avail => {
    const availabilityDayOfWeek = new Date(avail.date).getDay();
    return availabilityDayOfWeek === selectedDayOfWeek && avail.is_repeated === 1;
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

    console.log(reqPayload);
   
    if(this.$store.state && this.$store.state.auth && this.$store.state.auth.user.user_type!='doctor'){
      this.bookAppointment(reqPayload);
      }else{
        this.$toast.error("please create patient account to book an appointment")
      }
  } else {
    // Handle the case where no availability is found for the selected day of the week
    console.log('No availability found for the selected day of the week:', selectedDayOfWeek);

    // Find the availability for the next available day of the week
    const nextAvailability = this.availabilities.find(avail => {
      const availabilityDayOfWeek = new Date(avail.date).getDay();
      return availabilityDayOfWeek > selectedDayOfWeek && avail.is_repeated === 1;
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

      console.log('Using next available day:', reqPayload);
      if(this.$store.state && this.$store.state.auth && this.$store.state.auth.user.user_type!='doctor'){
      this.bookAppointment(reqPayload);
    }else{
        this.$toast.error("please create patient account to book an appointment")
      }
    } else {
      console.log('No further availability found.');
      // Handle the case where no further availability is found
    }
  }
},

  },
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
