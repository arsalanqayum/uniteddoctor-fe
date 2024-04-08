<template>
    <div class="text-center">
     
  
      <v-overlay :value="loader">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </div>
  </template>
  
  <script>
  
  import { mapState } from "vuex";
    export default {
        computed: {
      ...mapState({
        loader: (state) => state.Loader.loader,
      }),
    },
      data: () => ({
        overlay: false,
      }),
  
      watch: {
        overlay (val) {
          val && setTimeout(() => {
            this.overlay = false
          }, 3000)
        },
      },
    }
  </script>