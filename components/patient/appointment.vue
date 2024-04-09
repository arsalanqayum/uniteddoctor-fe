<template>
  <div class="my-5">
    <v-container>
      <h2 class="text-center mb-5">My Appointments</h2>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        :footer-props="{
          'items-per-page-options': [5, 10, 15, -1]
        }"
        class="elevation-1"
      >
      <template v-slot:item.avatar="{ item }">
        <v-avatar>
          <img v-if="isDoctor && item.patient" :src="item.patient.avatar" alt="Avatar">
          <img v-if="!isDoctor && item.doctor" :src="item.doctor.avatar" alt="Avatar">
        </v-avatar>
      </template>
      <template v-slot:item.name="{ item }">
        <span v-if="isDoctor && item.patient">{{ item.patient.first_name }} {{ item.patient.last_name }}</span>
        <span v-if="!isDoctor && item.doctor">Dr.{{ item.doctor.first_name }} {{ item.doctor.last_name }}</span>
      </template>
      <template v-slot:item.phone="{ item }">
        <span v-if="isDoctor && item.patient">{{ item.patient.phone }} </span>
        <span v-if="!isDoctor && item.doctor">Dr.{{ item.doctor.phone }} </span>
      </template>
        <template v-slot:item.actions="{ item }">
          <div style="display: flex; gap: 4px;">
          <v-btn v-if="item.google_meet_link && isDoctor && item.status == 'accepted'" @click="joinMeeting(item.google_meet_link)" x-small outlined color="blue">Join</v-btn>
          <v-btn v-if="isDoctor && item.status == 'accepted'" @click="updateStatus(item.id, 'completed')" x-small outlined color="green">Complete</v-btn>
          <v-btn v-if="isDoctor && item.status == 'pending'" @click="updateStatus(item.id, 'accepted')" x-small outlined color="primary">Accept</v-btn>
          <v-btn v-if="isDoctor && item.status == 'pending'" @click="updateStatus(item.id, 'rejected')" x-small outlined color="red">Cancel</v-btn>
          </div>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import CardCart from '@/components/cartCard/CardCart'
import DashbordSidebar from '@/components/DashboardSidebar.vue'
export default {
  components: {
    CardCart,
    DashbordSidebar,
  },
  head: {
    title: 'Order List',
  },
  data() {
    return {
      isSidebar: false,
      page: 1,
      itemsPerPage: 5,
      headers: [
        { text: 'Avatar', value: 'avatar', sortable: false },
        { text: 'Name', value: 'name' },
        { text: 'Phone', value: 'phone' },
        { text: 'Status', value: 'status' },
        { text: 'Date', value: 'date' },
        { text: 'Start Time', value: 'start_time' },
        { text: 'End Time', value: 'end_time' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20,
      ],

      range: [0, 100, 500, 1000],
      itemsTwo: ['Low to High', 'High to Low', 'Date'],
    }
  },
  computed: {
    isDoctor(){
      return this.$store.state.auth.user.user_type == 'doctor' ? true :false
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
    this.getApt()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    joinMeeting(link){
      window.open(link, '_blank');
    },
    updateStatus(id, status) {
      this.$axios
        .post(`appointment/${id}`, { status: status })
        .then((response) => {
         this.getApt();
        })
    },
    getApt() {
      this.$axios.get('appointment').then((response) => {
        this.items = response.data.data
      })
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    season(val) {
      return this.range[val]
    },
  },
}
</script>
<style scoped>
.elevated-table .v-data-table__wrapper table tbody tr {
  height: 100px; /* Adjust row height as needed */
}

/* Increased specificity for Vuetify components */
>>>.elevated-table tbody tr td .v-avatar {
  height: 60px; /* Adjust avatar size as needed */
  width: 60px;
  margin-right: 8px; /* Add some space between the avatar and the next cell content */
}

/* Ensure the cell content is vertically aligned in the middle */
>>>.elevated-table .v-data-table__wrapper table tbody tr td {
  vertical-align: middle;
  line-height: normal; /* Adjust based on your design needs */
}
</style>