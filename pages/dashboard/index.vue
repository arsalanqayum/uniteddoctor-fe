<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <div class="box-wrapper">
          <div class="box-overlay" :class="{ open: isSidebar }" @click="isSidebar = !isSidebar"></div>
          <div v-if="
            $store.state.auth &&
            $store.state.auth.user &&
            $store.state.auth.user.user_type == 'doctor'
          " class="box-sidebar pb-3 shadow-sm" :class="{ open: isSidebar }">
            <DashbordSidebar />
          </div>
          <div v-if="
            $store.state.auth &&
            $store.state.auth.user &&
            $store.state.auth.user.user_type == 'patient'
          " class="box-sidebar pb-3 shadow-sm" :class="{ open: isSidebar }">
            <DashbordSidebarPatient />
          </div>
          <div class="box-content">
            <v-dialog v-model="specialization" max-width="1000px">
              <template v-slot:activator="{ on }"> </template>

              <v-card>
                <v-card-title> Specialization </v-card-title>
                <v-card-text>
                  <specializationVue @closeModal="closeModal" />
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" text @click="specialization = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="education" max-width="1000px">
              <template v-slot:activator="{ on }"> </template>

              <v-card>
                <v-card-title> Education </v-card-title>
                <v-card-text>
                  <educationVue @closeModal="closeModal" />
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" text @click="education = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="experiance" max-width="1000px">
              <template v-slot:activator="{ on }"> </template>

              <v-card>
                <v-card-title> Experiance </v-card-title>
                <v-card-text>
                  <experianceVue @closeModal="closeModal" />
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" text @click="experiance = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div class="d-flex justify-end pa-2 d-block d-md-none">
              <v-btn icon @click="isSidebar = !isSidebar">
                <v-icon dark> mdi-format-list-bulleted-square </v-icon>
              </v-btn>
            </div>
            <div class="box-container">
              <div class="d-flex justify-space-between flex-wrap mb-5">
                <div class="d-flex align-center">
                  <v-avatar tile size="25" class="me-3">
                    <img src="@/assets/images/icons/user_filled.svg" alt="" />
                  </v-avatar>
                  <h2 class="mb-0">My Profile</h2>
                </div>
                <div v-if="
                  $store.state.auth &&
                  $store.state.auth.user &&
                  $store.state.auth.user.user_type == 'doctor'
                ">
                  <v-btn outlined color="primary" @click="experiance = !experiance" class="text-capitalize font-600">
                    Add Experience
                  </v-btn>
                  <v-btn outlined color="primary" @click="education = !education" class="text-capitalize font-600">
                    Add Education
                  </v-btn>
                  <v-btn outlined color="primary" @click="specialization = !specialization"
                    class="text-capitalize font-600">
                    Add Speciality
                  </v-btn>
                  <v-btn outlined color="primary" @click="$router.push('/dashboard/Profile')"
                    class="text-capitalize font-600">
                    Edit Profile
                  </v-btn>
                </div>
              </div>

              <v-row>
                <v-col cols="12" md="12" lg="2">
                  <base-card>
                    <div class="pa-5">
                      <div class="d-flex justify-space-between align-center flex-wrap">
                        <div class="d-flex align-center">
                          <v-avatar v-if="profile && profile.user" size="64" class="me-4">
                            <img :src="profile.user.avatar" alt="" />
                          </v-avatar>
                          <div>
                            <h4 v-if="profile && profile.user" class="font-600">
                              {{ profile.user.first_name }}
                              {{ profile.user.last_name }}
                            </h4>
                            <p class="mb-0 grey--text text--darken-1">
                              Balance: <span class="primary--text">$500</span>
                            </p>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </base-card>
                </v-col>
                <v-col cols="6" sm="6" md="4" lg="2">
                  <base-card class="h-100 pa-4 d-flex flex-column text-center align-center justify-center">
                    <h3 class="font-600 primary--text mb-0">{{stat.totalAllAppointments}}</h3>
                    <p class="mb-0 text-12 grey--text text--darken-1">
                      All Appointments
                    </p>
                  </base-card>
                </v-col>
                <v-col cols="6" sm="6" md="4" lg="2">
                  <base-card class="h-100 pa-4 d-flex flex-column text-center align-center justify-center">
                  <h3 class="font-600 primary--text mb-0">{{ stat.counts && stat.counts.completed ?
                      stat.counts.completed.total:0}}</h3>
                    <p class="mb-0 text-12 grey--text text--darken-1">
                      All Completed
                    </p>
                  </base-card>
                </v-col>
                <v-col cols="6" sm="6" md="4" lg="2">
                  <base-card class="h-100 pa-4 d-flex flex-column text-center align-center justify-center">
                    <!-- {{ stat.counts?stat.counts:''}} -->
                    <h3 class="font-600 primary--text mb-0">{{ stat.counts && stat.counts.pending ?
                      stat.counts.pending.total:0}}</h3>
                    <p class="mb-0 text-12 grey--text text--darken-1">
                      Awaiting Appointments
                    </p>
                  </base-card>
                </v-col>
                <v-col cols="6" sm="6" md="4" lg="2">
                  <base-card class="h-100 pa-4 d-flex flex-column text-center align-center justify-center">
                    <h3 class="font-600 primary--text mb-0">{{ stat.counts && stat.counts.rejected ?
                      stat.counts.rejected.total:0}}
                    </h3>
                    <p class="mb-0 text-12 grey--text text--darken-1">
                      Cancelled Appointments
                    </p>
                  </base-card>
                </v-col>
                <v-col cols="6" sm="6" md="4" lg="2">
                  <base-card class="h-100 pa-4 d-flex flex-column text-center align-center justify-center">
                    <h3 class="font-600 primary--text mb-0">{{ stat.counts &&
                      stat.counts.accepted ? stat.counts.accepted.total:0}}
                    </h3>
                    <p class="mb-0 text-12 grey--text text--darken-1">
                      Accepted Appointments
                    </p>
                  </base-card>
                </v-col>

                <v-col cols="12">
                  <base-card>
                    <div class="pa-4 d-flex justify-space-between flex-wrap">
                      <div class="mx-2 my-2">
                        <p class="text-sm grey--text text--darken-1 mb-1">
                          First Name
                        </p>
                        <span v-if="profile && profile.user">{{
                          profile.user.first_name
                          }}</span>
                      </div>
                      <div class="mx-2 my-2">
                        <p class="text-sm grey--text text--darken-1 mb-1">
                          Last Name
                        </p>
                        <span v-if="profile && profile.user">{{
                          profile.user.last_name
                          }}</span>
                      </div>
                      <div class="mx-2 my-2">
                        <p class="text-sm grey--text text--darken-1 mb-1">
                          Email
                        </p>
                        <span v-if="profile && profile.user">{{
                          profile.user.email
                          }}</span>
                      </div>
                      <div class="mx-2 my-2">
                        <p class="text-sm grey--text text--darken-1 mb-1">
                          Phone
                        </p>
                        <span v-if="profile && profile.user">{{
                          profile.user.phone
                          }}</span>
                      </div>
                      <div class="mx-2 my-2">
                        <p class="text-sm grey--text text--darken-1 mb-1">
                          Birth Date
                        </p>
                        <span>01 Jan, 1970</span>
                      </div>
                    </div>
                  </base-card>
                </v-col>
                <!-- <v-col cols="12">
                  <showExpereinceVue />
                </v-col>
                <v-col cols="12">
                  <showEducationVue />
                </v-col> -->
                <v-col v-if="
                  $store.state.auth &&
                  $store.state.auth.user &&
                  $store.state.auth.user.user_type == 'doctor'
                " cols="12">
                  <show-specialization ref="childRef" />
                </v-col>
                <v-col v-if="
                  $store.state.auth &&
                  $store.state.auth.user &&
                  $store.state.auth.user.user_type == 'patient'
                " cols="12">
                  <appointment />
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashbordSidebar from '@/components/DashboardSidebar'
import DashbordSidebarPatient from '@/components/DashboardSidebarPatient'
import educationVue from '~/components/doctor/education.vue'
import experianceVue from '~/components/doctor/experiance.vue'
import showExpereinceVue from '~/components/doctor/showExpereince.vue'
import showEducationVue from '~/components/doctor/showEducation.vue'
import Specialization from '~/components/doctor/specialization.vue'
import specializationVue from '~/components/doctor/specialization.vue'
import ShowSpecialization from '~/components/doctor/showSpecialization.vue'
import appointment from '~/components/patient/appointment.vue'
export default {
  computed: {
    profile() {
      return this.$store.state.auth
    },
  },
  components: {
    DashbordSidebar,
    educationVue,
    experianceVue,
    showExpereinceVue,
    showEducationVue,
    Specialization,
    specializationVue,
    ShowSpecialization,
    DashbordSidebarPatient,
    appointment,
  },
  head: {
    title: 'View Profile',
  },
  data() {
    return {
      isSidebar: false,
      stat: { counts: null, totalSum: null },
      experiance: false,
      education: false,
      specialization: false,
      doctorEducation: [],
    }
  },

  mounted() {
    this.getEducation()
    this.getStat();
  },
  methods: {
    getStat() {
      this.$axios.get('appointment/appointmentStat').then((response) => {
        this.stat = response.data
      })
    },
    closeModal() {
      this.experiance = false
      this.education = false
      this.specialization = false
      this.$refs.childRef.getDoctorDetails();
    },
    getEducation() {
      this.$axios.get('education').then((response) => {
        this.doctorEducation = response.data.data
      })
    },
  },
}
</script>
