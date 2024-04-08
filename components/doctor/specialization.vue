<template>
  <v-form ref="profile" @submit.prevent="submit">
    <div class="pa-5">
      <v-row>
        

        <v-col cols="12" sm="6">
          <!-- <p class="text-14 mb-1">City</p> -->
          <!-- <v-text-field
                        outlined
                        dense
                        v-model="form.city"
                        hide-details
                        placeholder="City"
                      ></v-text-field> -->
          <v-autocomplete
            outlined
            v-model="form.specialization"
            multiple
            dense
            item-text="name"
            item-value="id"
            :items="specializations"
            :rules="[(v) => !!v || 'This field is required']"
            label="Specialization"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-btn type="submit" color="primary" class="font-600 text-capitalize">
            Save Changes
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>
<script>
import DashbordSidebarTwo from '@/components/DashboardSidebar.vue'
export default {
  components: {
    DashbordSidebarTwo,
  },
  head: {
    title: 'Profile',
  },
  data() {
    return {
      form: {
        specialization:[]
      },
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
      countries: [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bhutan',
        'Bolivia',
        'Bosnia and Herzegovina',
        'Botswana',
        'Brazil',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cabo Verde',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Comoros',
        'Congo (Congo-Brazzaville)',
        'Costa Rica',
        'Croatia',
        'Cuba',
        'Cyprus',
        'Czechia (Czech Republic)',
        'Democratic Republic of the Congo',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        "Eswatini (fmr. 'Swaziland')",
        'Ethiopia',
        'Fiji',
        'Finland',
        'France',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Greece',
        'Grenada',
        'Guatemala',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Holy See',
        'Honduras',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Israel',
        'Italy',
        'Ivory Coast',
        'Jamaica',
        'Japan',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Micronesia',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Morocco',
        'Mozambique',
        'Myanmar (formerly Burma)',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'North Korea',
        'North Macedonia',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Palestine State',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Qatar',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Korea',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'Sudan',
        'Suriname',
        'Sweden',
        'Switzerland',
        'Syria',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        'Timor-Leste',
        'Togo',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'United States of America',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Venezuela',
        'Vietnam',
        'Yemen',
        'Zambia',
        'Zimbabwe',
      ],
      file: this.$store.state.auth.user.avatar,
      specializations: [],
      filePreview: this.$store.state.auth.user.avatar,
      isSidebar: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }
  },
  mounted() {
    this.getSpecialization()
  },
  methods: {
    submit() {
      const isValid = this.$refs.profile.validate()
      if (isValid) {
       const reqPayload = {};
       reqPayload.specialization_id = this.form.specialization;
       
        this.$axios.post("doctor/speciliality",reqPayload).then((response)=>{
          this.$toast.success('Doctor Speciality Added');
          this.$emit("closeModal");
        //   console.log(response.data.data);
        //    this.$store.commit("SET_USER_DETAILS",response.data.data)
        })
      }
    },
    getSpecialization() {
      this.$axios.get(`specialization`).then((response) => {
        this.specializations = response.data.data
      })
    },
    previewFile() {
      // Access the file input element using the ref
      const fileInput = this.$refs.avatar

      // Check if a file is selected
      if (fileInput.files.length === 0) {
        console.error('No file selected')
        return
      }

      // Retrieve the selected file
      const file = fileInput.files[0]

      // Read the file as a data URL
      const reader = new FileReader()
      reader.onload = (event) => {
        // Set the file preview
        this.filePreview = event.target.result
      }
      reader.readAsDataURL(file)
    },
    handleChange(e) {
      const fileInput = this.$refs.avatar
      this.file = fileInput.files[0]
    },
  },
}
</script>
