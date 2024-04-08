<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="elevation-12" outlined>
            <v-toolbar color="deep-purple accent-4" dark flat>
              <v-toolbar-title>Doctor Review</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-subheader class="pb-0">We appreciate your feedback!</v-subheader>
              <v-form ref="form" v-model="valid">
                <v-row>
                  <v-col cols="12">
                    <v-rating
                      v-model="review.rating"
                      color="yellow darken-3"
                      empty-icon="$ratingFull"
                      size="24"
                      half-increments
                      clearable
                    ></v-rating>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="review.comment"
                      outlined
                      label="Share your experience"
                      rows="5"
                      auto-grow
                      clearable
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="deep-purple darken-1"
                dark
                :disabled="!valid"
                @click="submitReview"
              >
                Submit Review
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        valid: true,
        review: {
          rating: 0,
          comment: '',
        },
      };
    },
    methods: {
      async submitReview() {
        if (this.$refs.form.validate()) {
          // Placeholder for submission logic
          console.log('Review:', this.review);
          this.$axios.post(`submit-review/${this.$route.query.token}`,this.review).then((response)=>{
            this.$toast.success('Reveiw Submitted Successfully');

          }).catch((error)=>{
            if(error.response.status==400){
              this.$toast.error('Invalid URL to submit a reveiw');
            }
          })
          // Reset the form after submission
          this.resetForm();
        }
      },
      resetForm() {
        this.review.rating = 0;
        this.review.comment = '';
      },
    },
  };
  </script>
  
  <style>
  /* Optionally, you can add specific styles to adjust the look further */
  </style>
  