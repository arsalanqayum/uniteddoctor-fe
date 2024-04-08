<template>
  <v-card outlined class="doctor-education">
    <v-card-title class="headline">Doctor Education</v-card-title>
    <v-divider></v-divider>
    <v-list dense>
        <div v-for="(education, index) in doctorEducations" :key="index">
      <template >
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">mdi-school</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ education.degree }}</v-list-item-title>
            <v-list-item-subtitle class="sub-info">
              <span>{{ education.institution }}</span>
              <span>{{ education.graduationYear }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- Add a divider if it's not the last item -->
        <v-divider v-if="index < doctorEducations.length - 1"></v-divider>
      </template>
        </div>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      doctorEducations: [
        {
          degree: "Doctor of Medicine (MD)",
          institution: "University of Medicine",
          graduationYear: "2021"
        },
        {
          degree: "Bachelor of Science in Biology",
          institution: "State University",
          graduationYear: "2017"
        }
        // Add more education objects as needed
      ]
    };
  },
  mounted(){
    this.$axios.get("education").then((response)=>{
        this.doctorEducations= response.data.data
    })
  }
  
};
</script>

<style scoped>
.doctor-education {
  border-radius: 10px;
  background: linear-gradient(to right, #64b5f6, #1976d2);
}

.sub-info {
  color: #fff;
}
</style>
