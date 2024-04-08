<template>
  <v-app>
    <base-app-bar />
    
    <base-view />

    <footer-view />
    <mobile-navigation />
  </v-app>
</template>

<script>
  export default {
    name: 'BaseLayout',
    components: {
      BaseAppBar: () => import('./base/AppBar'),
      BaseView: () => import('./base/View'),
      FooterView: () => import('./base/Footer'),
      MobileNavigation: () => import('./base/MobileNavigationBar'),
    },
    async mounted() {
    // Wait for Pusher to be initialized
    await this.$pusherPromise;
   
    const id= this.$store.state && this.$store.state.auth && this.$store.state.auth.user && this.$store.state.auth.user.id ? this.$store.state.auth.user.id:0
    console.log(`call-to-${id}`);
    // Now $pusher should be available
    this.$pusher.subscribe("initiate-call").bind(`call-to-${id}`,data=>{
      console.log(data,"sssssssssssssssssssssssssssssssssssss")
      this.$toast.success(data.description)
      this.$store.commit("SET_NOTIFICATIONS",data);
    });
    this.getNotifications();
  },
  methods:{
    getNotifications(){
      this.$axios.get('notifications').then((response)=>{
       this.$store.commit("ASSIGN_NOTIFICATIONS",response.data.data);
      })
    }
  }
  }
</script>
