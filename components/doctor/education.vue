<template>
  <v-card elevation="0">
    <v-card-title>Education Details</v-card-title>
    <v-card-text>
      <v-text-field v-model="degree" label="Degree"></v-text-field>
      <v-text-field v-model="institution" label="Institution"></v-text-field>
      <v-text-field
        v-model="graduationYear"
        label="Graduation Year"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="saveEducationDetails">Save</v-btn>
      <v-btn @click="clearForm">Clear</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      degree: '',
      institution: '',
      graduationYear: '',
    }
  },
  methods: {
    saveEducationDetails() {
      // Here you can send the education details to your backend or perform any other action
      const educationDetails = {
        degree: this.degree,
        institution: this.institution,
        graduationYear: this.graduationYear,
        // user_id:this.$store.state.auth.user.id
      }
      console.log('Education Details:', educationDetails)
      this.$axios.post('education', educationDetails).then((response) => {
        this.education = false
        this.$toast.success('Education Added')
        this.$emit('closeModal')
      })
    },

    clearForm() {
      // Clear form fields
      this.degree = ''
      this.institution = ''
      this.graduationYear = ''
    },
  },
}
</script>

<style scoped>
/* Add custom styles here */
</style>
