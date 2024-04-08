<template>
    <v-card>
      <v-card-title>
        Dr. {{ doctor.first_name }} {{ doctor.last_name }} - {{ speciality.name }}
      </v-card-title>
      <v-card-text>
        <v-avatar size="100">
          <img :src="doctor.avatar" alt="doctor's avatar">
        </v-avatar>
        <p>Location: {{ location }}</p>
        <p>Consultation Fee: {{ consultation_fee }}</p>
        <v-btn color="primary" @click="payNow">Pay Now (20% Discount)</v-btn>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      doctor: Object,
      location: String,
      consultation_fee: Number,
      speciality: Object
    },
    methods: {
      payNow() {
        // Implement payment logic
        alert('Payment logic goes here');
      }
    }
  }
  </script>
  