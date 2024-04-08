<template>
  <v-card elevation="0">
    <v-card-title>Experience Details</v-card-title>
    <v-card-text>
      <v-text-field v-model="jobTitle" label="Job Title"></v-text-field>
      <v-text-field v-model="employer" label="Employer"></v-text-field>
      <v-row>
        <v-col cols="6">
          <v-menu v-model="startDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field v-model="startDateFormatted" label="Start Date" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="startDate" @input="startDateMenu = false" scrollable>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-menu v-model="endDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field v-model="endDateFormatted" label="End Date" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="endDate" @input="endDateMenu = false" scrollable>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-textarea v-model="description" label="Description"></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="saveExperienceDetails">Save</v-btn>
      <v-btn @click="clearForm">Clear</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      jobTitle: '',
      employer: '',
      startDate: null,
      endDate: null,
      startDateMenu: false,
      endDateMenu: false,
      description: ''
    };
  },
  computed: {
    startDateFormatted() {
      return this.startDate ? this.formatDate(this.startDate) : '';
    },
    endDateFormatted() {
      return this.endDate ? this.formatDate(this.endDate) : '';
    }
  },
  methods: {
    saveExperienceDetails() {
      // Here you can send the experience details to your backend or perform any other action
      const experienceDetails = {
        jobTitle: this.jobTitle,
        employer: this.employer,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description
      };
      this.$axios.post('expereince',experienceDetails).then((response)=>{
         this.$toast.success('Experience Added')
        this.$emit('closeModal')
      })
    },
    clearForm() {
      // Clear form fields
      this.jobTitle = '';
      this.employer = '';
      this.startDate = null;
      this.endDate = null;
      this.description = '';
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toISOString().substr(0, 10);
    }
  }
};
</script>

<style scoped>
/* Add custom styles here */
</style>
