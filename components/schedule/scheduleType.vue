<template>
  <v-card class="pa-4" outlined>
    <v-form ref="schedule" @submit.prevent="next">
      <v-card-title class="headline mb-3">Schedule Details</v-card-title>

      <v-radio-group v-model="type" :rules="[(v) => !!v || 'This field is required']" label="Type:" dense>
        <v-radio label="Remote" value="remote"></v-radio>
        <v-radio label="OnSite" value="onsite"></v-radio>
      </v-radio-group>

      <v-row>
        <v-col cols="12" md="6" v-if="type == 'onsite'">
          <v-text-field outlined label="Location" :rules="[(v) => !!v || 'Location is required']" v-model="location" placeholder="Enter Hospital Name" class="mb-3"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field outlined type="number" label="Consultation Fee" :rules="[(v) => !!v || 'Fee field  is required']" v-model="fee" placeholder="Enter Consultation Fee" class="mb-3"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field outlined label="Offer Title" :rules="[(v) => !!v || 'Offer Field  is required']" v-model="offer_label" placeholder="Enter Offer Title" class="mb-3"></v-text-field>
        </v-col>
      </v-row>

      <div class="d-flex justify-end mt-4">
        <v-btn type="submit" color="primary" dark class="px-5">
          Next
          <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import location from "./location.vue";
export default {
  components:{
    location
  },
  computed: {
    offer_label:{
      get(){
        return this.$store.state.schedule.offer_label;
      },
      set(value){
        this.$store.commit("SET_OFFER_LABEL",value);
      }
    },
    fee:{
        get(){
            return this.$store.state.schedule.fee
        },
        set(value){
          this.$store.commit("SET_FEE",value);
        }
    },
    step: {
      get() {
        return this.$store.state.schedule.step
      },
      set(value) {
        this.$store.commit('SET_STEPS',value)
      },
    },
    type: {
      get() {
        return this.$store.state.schedule.type
      },
      set(value) {
        this.$store.commit('SET_TYPE', value)
      },
    },
    location: {
      get() {
        return this.$store.state.schedule.location
      },
      set(value) {
        this.$store.commit('SET_LOCATION', value)
      },
    },
  },
  methods: {
    placeChanged(){

    },
    next(e) {
      e.preventDefault()
      const isValid = this.$refs.schedule.validate()
    
      if (isValid && this.step < 3) {
        this.step=2
      }
    },
  },
}
</script>