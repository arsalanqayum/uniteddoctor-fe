<template>
  
      <v-autocomplete outlined v-model="selectedPlace" :items="places" :loading="isLoading" :search-input.sync="search"
        item-text="name" item-value="id" label="Location" return-object @change="onSelect"></v-autocomplete>
   
</template>

<script>
import { debounce } from 'lodash';

export default {
  computed: {
    location: {
      get() {
        return this.$store.state.schedule.location
      },
      set(value) {
        this.$store.commit('SET_LOCATION', value)
      },
    },
  },
  data() {
    return {
      search: null,
      isLoading: false,
      selectedPlace: null,
      places: [],
    };
  },
  created() {
    // Bind the debounced method to the Vue instance
    this.debouncedFetchPlaces = debounce(this.fetchPlaces, 300);
  },
  watch: {
    search(val) {
      this.isLoading = true; // Move loading indicator inside watch for immediate feedback
      // Prevent making request if the search is empty or the same as selected
      if (val && val !== this.selectedPlace) {
        this.debouncedFetchPlaces(val);
      } else {
        this.isLoading = false; // Ensure loading is handled correctly when not fetching
      }
    },
  },
  methods: {
    fetchPlaces(searchQuery) {
      this.$axios.get(`/search-places?query=${encodeURIComponent(searchQuery)}`)
        .then(response => {
          console.log(JSON.stringify(response.data.results));
          this.places = response.data.results.map(place => ({
            id: place.place_id, // Assuming place_id is still correct for the identifier
            name: place.name,   // Assuming name is still correct for the place name
            address: place.formatted_address, // If you need the formatted address
            rating: place.rating, // If you need the rating
            latitude: place.geometry.location.lat, // Accessing latitude
            longitude: place.geometry.location.lng // Accessing longitude
          }));
        })
        .catch(error => {
          console.error("There was an error fetching the places:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    onSelect(item) {
      this.location = item;
      // Handle selection logic here
    }
  }
}
</script>
