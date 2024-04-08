<template>
    <v-text-field
      label="Location"
      append-icon="search"
      solo
      :value="placeName"
      @click:append="focusInput"
      readonly
    >
      <template v-slot:default="{ attrs }">
        <vue-google-places
          ref="placesRef"
          :api-key="yourApiKey"
          @placechanged="placeChanged"
          v-bind="attrs"
        ></vue-google-places>
      </template>
    </v-text-field>
  </template>
  
  <script>
  export default {
    data: () => ({
      placeName: '', // To display the selected place name
      yourApiKey: 'AIzaSyAhqMvzQfbz32EvGw0NuDYjrMIo',
    }),
    methods: {
      focusInput() {
        this.$refs.placesRef.focusInput();
      },
      placeChanged(place) {
        this.placeName = place.name; // Update the text field when a place is selected
        // Handle the selected place object
      },
    },
  };
  </script>
  
  <style scoped>
  .vue-google-places-input {
    border: none;
    outline: none;
    /* Any additional styling to match Vuetify's input fields */
  }
  </style>