<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-items-center">
          <!-- <v-text-field  outlined dense></v-text-field> -->
          <v-autocomplete
            v-model="city"
            placeholder="Enter Locality or City"
            :items="cities"
            item-text="name"
            item-value="id"
            outlined
            solo
          >
            <!-- <template v-slot:append>
              <v-btn
                :to="{ path: '/search', query: { city: selectedCity } }"
                color="primary"
              >
                Find Doctors
              </v-btn>
            </template> -->
          </v-autocomplete>
          <v-autocomplete
            v-model="specialization"
            placeholder="Search for doctors,specialties,services,diseases"
            outlined
            solo
            :items="specializations"
            item-text="name"
            item-value="id"
          >
            <template v-slot:append>
              <v-btn @click="searchDoctor" color="#ff9e15">
                Find Doctors
              </v-btn>
            </template>
          </v-autocomplete>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      city: '',
      specialization: '',
      cities: [
        'New York',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix', // United States
        'London',
        'Manchester',
        'Birmingham',
        'Glasgow',
        'Liverpool', // United Kingdom
        'Toronto',
        'Montreal',
        'Vancouver',
        'Calgary',
        'Ottawa', // Canada
        'Sydney',
        'Melbourne',
        'Brisbane',
        'Perth',
        'Adelaide', // Australia
        'Mumbai',
        'Delhi',
        'Bangalore',
        'Hyderabad',
        'Chennai', // India
        // Add more cities here as needed
      ],
      specializations: [
        { id: 1, name: 'Cardiology' },
        // ... other specializations
      ],
    }
  },
  mounted(){
    this.getSpecialization();
  },
  methods: {
     getSpecialization() {
      this.$axios.get(`specialization`).then((response) => {
        this.specializations = response.data.data
      })
    },
    searchDoctor() {
      console.log( {
          query:'' ,
          city: this.city, 
          spcialization: this.specialization 
        });
    // return false;
       this.$router.push({ path: '/doctor/search', 
        query: {
          query:'' ,
          city: this.city, 
          spcialization: this.specialization 
        }
      });
      // this.$axios
      //   .post('/doctor-search', {
      //     city: this.city,
      //     spcialization: this.specialization,
      //   })
      //   .then((response) => {
      //     this.$store.commit('SEARCH_DOCTOR', {
      //       city: this.city,
      //       spcialization: this.specialization,
      //     })
      //     this.$store.commit("DOCTOR_LIST",response.data.data);
      //     this.$router.push('doctor/search');
          
      //   })
    },
  },
}
</script>

<style scoped>
.d-flex {
  display: flex;
}
.mr-3 {
  margin-right: 16px;
}
</style>