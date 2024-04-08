<template>
  <v-card outlined class="doctor-experience">
    <v-card-title class="headline">Doctor Experience</v-card-title>
    <v-divider></v-divider>
    <v-list dense>
        <div  v-for="(experience, index) in doctorExperiences" :key="index">
      <template>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">mdi-briefcase-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ experience.jobTitle }}</v-list-item-title>
            <v-list-item-subtitle class="sub-info">
              <span>{{ experience.employer }}</span>
              <span>{{ formatDate(experience.startDate) }} - {{ formatDate(experience.endDate) }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="sub-description">{{ experience.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- Add a divider if it's not the last item -->
        <v-divider v-if="index < doctorExperiences.length - 1"></v-divider>
      </template>
        </div>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      doctorExperiences: [
        {
          jobTitle: "Senior Physician",
          employer: "City Hospital",
          startDate: "2020-01-01",
          endDate: "2022-05-31",
          description: "Worked as a senior physician specializing in internal medicine."
        },
        {
          jobTitle: "Medical Intern",
          employer: "Regional Medical Center",
          startDate: "2018-06-01",
          endDate: "2019-12-31",
          description: "Completed medical internship, gaining experience in various departments."
        }
        // Add more experience objects as needed
      ]
    };
  },
  mounted(){
    this.$axios.get('expereince').then((response)=>{
       this.doctorExperiences = response.data.data
    })
  },
  methods: {
    formatDate(date) {
      // Format date in a desired way, e.g., using moment.js or a custom function
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  }
};
</script>
