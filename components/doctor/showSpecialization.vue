<template>
  <v-container>
    <v-card outlined class="doctor-info">
      <v-card-title class="headline">Doctor Information</v-card-title>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">mdi-school</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Education</v-list-item-title>
            <v-list-item-subtitle>
                <div v-for="(education, index) in doctorEducations" :key="index">
              <template >
                <div>{{ education.degree }}</div>
                <div>{{ education.institution }} ({{ education.graduationYear }})</div>
              </template>
                </div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">mdi-briefcase-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Experience</v-list-item-title>
            <v-list-item-subtitle>
                <div v-for="(experience, index) in doctorExperiences" :key="index">
              <template >
                <div>{{ experience.jobTitle }}</div>
                <div>{{ experience.employer }} ({{ formatDate(experience.startDate) }} - {{ formatDate(experience.endDate) }})</div>
              </template>
                </div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">mdi-account-star</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Specialization</v-list-item-title>
            <v-list-item-subtitle><span class="py-1" v-for="(item,index) in doctorSpecialization">{{ item.specialization.name }}{{doctorSpecialization.length-1>index?',':''}}</span></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
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
      ],
      doctorExperiences: [
        {
          jobTitle: "Senior Physician",
          employer: "City Hospital",
          startDate: "2020-01-01",
          endDate: "2022-05-31"
        },
        {
          jobTitle: "Medical Intern",
          employer: "Regional Medical Center",
          startDate: "2018-06-01",
          endDate: "2019-12-31"
        }
        // Add more experience objects as needed
      ],
      doctorSpecialization:[]
    };
  },
  mounted(){
    this.getDoctorDetails();
  },
  methods: {
    getDoctorDetails(){
       this.$axios.get("education").then((response)=>{
        this.doctorEducations= response.data.data
    })
    this.$axios.get('expereince').then((response)=>{
       this.doctorExperiences = response.data.data
    })
    this.$axios.get('doctor/speciliality').then((response)=>{
       this.doctorSpecialization = response.data.data
    })
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  }
};
</script>

<style scoped>
.doctor-info {
  border-radius: 10px;
  background: linear-gradient(to right, #64b5f6, #1976d2);
}

.sub-info {
  color: #fff;
}
</style>
