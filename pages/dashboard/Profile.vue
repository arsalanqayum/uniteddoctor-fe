<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <div class="box-wrapper">
          <div
            class="box-overlay"
            :class="{ open: isSidebar }"
            @click="isSidebar = !isSidebar"
          ></div>
          <div class="box-sidebar pb-3 shadow-sm" :class="{ open: isSidebar }">
            <DashbordSidebarTwo />
          </div>
          <div class="box-content">
            <div class="d-flex justify-end pa-2 d-block d-md-none">
              <v-btn icon @click="isSidebar = !isSidebar">
                <v-icon dark> mdi-format-list-bulleted-square </v-icon>
              </v-btn>
            </div>
            <div class="box-container">
              <div class="d-flex align-center mb-5">
                <img
                  v-svg-inline
                  class="icon mr-3"
                  src="@/assets/images/icons/settings_filled.svg"
                  alt=""
                />
                <h2 class="mb-0">Account</h2>
              </div>
              <base-card>
                <v-form ref="profile" @submit.prevent="submit">
                  <div class="pa-5">
                    <v-row>
                      <v-col cols="12">
                        <v-img
                          cover
                          class="br-8"
                          height="173"
                          :src="
                            require('@/assets/images/banners/banner-10.png')
                          "
                        >
                          <div class="d-inline-flex p-absolute right-0 ma-5">
                            <label for="cover-upload-avatar">
                              <span
                                class="primary cursor-pointer lighten-5 pa-1 d-flex rounded-circle"
                              >
                                <img
                                  v-svg-inline
                                  class="icon primary--text"
                                  src="@/assets/images/icons/camera.svg"
                                  alt=""
                                />
                              </span>
                            </label>
                            <input
                              type="file"
                              ref="avatar"
                              @change="
                                handleChange()
                                previewFile()
                              "
                              id="cover-upload-avatar"
                              class="d-none"
                            />
                          </div>

                          <div class="d-inline-flex p-absolute bottom-0 ma-5">
                            <v-avatar size="80">
                              <img :src="filePreview" alt="" />
                            </v-avatar>
                            <div
                              class="d-inline-flex p-absolute right-0 bottom-0"
                            >
                              <label for="cover-upload-avatar">
                                <span
                                  class="grey lighten-2 cursor-pointer lighten-5 pa-1 d-flex rounded-circle"
                                >
                                  <img
                                    v-svg-inline
                                    class="icon secondary--text"
                                    src="@/assets/images/icons/camera.svg"
                                    alt=""
                                  />
                                </span>
                              </label>
                              <input
                                type="file"
                                id="cover-upload-avatar"
                                class="d-none"
                              />
                            </div>
                          </div>
                        </v-img>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <!-- <p class="text-14 mb-1">First Name</p> -->
                        <v-text-field
                          outlined
                          dense
                          label="First Name"
                          v-model="form.first_name"
                          hide-details
                          placeholder="First Name"
                          :rules="[(v) => !!v || 'This field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <!-- <p class="text-14 mb-1">Last Name</p> -->
                        <v-text-field
                          outlined
                          label="Last Name"
                          dense
                          hide-details
                          v-model="form.last_name"
                          placeholder="Last Name"
                          :rules="[(v) => !!v || 'This field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <!-- <p class="text-14 mb-1">Email</p> -->
                        <v-text-field
                          outlined
                          dense
                          hide-details
                          label="Email"
                          v-model="form.email"
                          placeholder="Email"
                          :rules="[(v) => !!v || 'This field is required']"
                        ></v-text-field>
                        <p
                          style="color: #ff5252 !important"
                          v-if="errors && errors.email"
                        >
                          {{ errors.email[0] }}
                        </p>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <!-- <p class="text-14 mb-1">Phone</p> -->
                        <v-text-field
                          outlined
                          dense
                          label="Phone"
                          hide-details
                          v-model="form.phone"
                          placeholder="Phone"
                          :rules="[(v) => !!v || 'This field is required']"
                        ></v-text-field>
                        <p
                          style="color: #ff5252 !important"
                          v-if="errors && errors.phone"
                        >
                          {{ errors.phone[0] }}
                        </p>
                      </v-col>
                      <v-col cols="12">
                        <p class="text-14 mb-1">Gender</p>
                        <v-radio-group
                          :rules="[(v) => !!v || 'This field is required']"
                          v-model="form.gender"
                          inline
                        >
                          <v-radio label="Male" value="male"></v-radio>
                          <v-radio label="Female" value="female"></v-radio>
                          <!-- <v-radio label="Radio Three" value="three"></v-radio> -->
                        </v-radio-group>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <!-- <p class="text-14 mb-1">Country</p> -->
                        <!-- <v-select
                        dense
                        :items="items"
                        placeholder="Select Category"
                        outlined
                        v-model="form.country"
                        hide-details
                      ></v-select> -->
                        <v-autocomplete
                          outlined
                          dense
                          v-model="form.country"
                          :items="countries"
                          label="countries"
                          :rules="[(v) => !!v || 'This field is required']"
                        ></v-autocomplete>
                      </v-col>
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
                          v-model="form.city"
                          dense
                          :items="cities"
                          label="Cities"
                          :rules="[(v) => !!v || 'This field is required']"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <!-- <p class="text-14 mb-1">City</p> -->
                        <!-- <v-text-field
                        outlined
                        dense
                        v-model="form.city"
                        hide-details
                        placeholder="City"
                      ></v-text-field> -->
                      </v-col>
                      <v-col cols="12">
                        <v-btn
                          type="submit"
                          color="primary"
                          class="font-600 text-capitalize"
                        >
                          Save Changes
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-form>
              </base-card>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
        first_name: this.$store.state.auth.user.first_name,
        last_name: this.$store.state.auth.user.last_name,
        email: this.$store.state.auth.user.email,
        phone: this.$store.state.auth.user.phone,
        country: this.$store.state.auth.user.country,
        city: this.$store.state.auth.user.city,
        gender:this.$store.state.auth.user.gender,
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
      errors: null,
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
        const formData = new FormData()
        formData.append('avatar', this.file)
        formData.append('first_name', this.form.first_name)
        formData.append('last_name', this.form.last_name)
        formData.append('email', this.form.email)
        formData.append('email', this.form.email)
        formData.append('phone', this.form.phone)
        formData.append('phone', this.form.phone)
        formData.append('id', this.$store.state.auth.user.id)
        formData.append('city', this.form.city)
        formData.append('country', this.form.country)
        formData.append('gender',this.form.gender);
        this.$axios
          .post('profile', formData)
          .then((response) => {
            console.log(response.data.data)
            this.$store.commit('SET_USER_DETAILS', response.data.data)
            this.$toast.success('Profile Updated')
            this.$router.push('/dashboard')
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.errors = error.response.data.errors
            }
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


