<template>
    <v-container>
        <!-- {{ data.available }} -->
        <!-- {{ data.doctor }} -->
      <doctor-profile v-if="data && data.doctor" :consultation_fee="data.consultation_fee" :doctor="data.doctor" :location="data.location" :speciality="data.doctor.doctor_specialities[0].specialization"></doctor-profile>
      <available-slots v-if="data && data.available" :available="data.available"></available-slots>
    </v-container>
  </template>
  
  <script>
  import DoctorProfile from './DoctorProfile.vue';
  import AvailableSlots from './AvailableSlots.vue';
  
  export default {
    components: {
      DoctorProfile,
      AvailableSlots
    },
    data() {
      return {
        data: {
            available:[],
            doctor:null
        } // Your data here
      }
    },
    mounted(){
      this.getAvailability();
        this.$bus.$on('schedule', () => {
            // this.dialog = false;
            this.getAvailability()
        });
    },
    methods:{
      getAvailability(){
        this.$axios.get(`doctor/availibility/${this.$route.params.id}`).then((response)=>{
            console.log(response.data.data.available)
           this.data.doctor = response.data.data.doctor;
           this.data.location = response.data.data.location;
           this.data.consultation_fee = response.data.data.consultation_fee;
           this.data.available= response.data.data.available
        })
      }
    }
    
  }
  </script>
  