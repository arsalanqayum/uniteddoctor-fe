<template>
  <div :class="[
    { 'sale-page-one': $route.path == '/salePage/SalePageOne' },
    { 'sale-page-two': $route.path == '/salePage/SalePageTwo' },
  ]">
    <Loader />
    <!-- <div
      class="secondary white--text top-bar"
      :class="{ 'd-none': $route.path == '/home/HomeTwo' }"
    >
      <v-container>
        <div class="d-flex justify-space-between align-center">
          <v-toolbar-title>
            <v-img
              class="me-2 logo d-md-none d-block"
              width="98"
              src="@/assets/images/logo.svg"
              alt=""
            ></v-img>
            <div class="mr-2 d-md-block d-none">
              <v-icon class="mr-2 white--text" small>mdi-phone-outline</v-icon>
              <span class="text-sm mr-5">+9012 3456 789</span>
              <v-icon class="mr-2 white--text" small>mdi-phone-outline</v-icon>
              <span class="text-sm">+9012 3456 7</span>
            </div>
          </v-toolbar-title>
          <v-toolbar-title>
            <span class="white--text text-sm mr-5 d-md-inline-block d-none"
              >Theme FAQ's</span
            >
            <span class="white--text text-sm mr-5 d-md-inline-block d-none"
              >Need Help ?</span
            >

            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="transparent" dark v-bind="attrs" v-on="on" small>
                  <v-avatar tile size="14" class="mr-2">
                    <img src="@/assets/images/flags/usa.png" alt="" />
                  </v-avatar>
                  <span>EN</span>
                  <v-icon right small>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
<v-list>
  <v-list-item v-for="(item, index) in items" :key="index">
    <v-list-item-title class="pa-0 ma-0">{{ item.title }}</v-list-item-title>
  </v-list-item>
</v-list>
</v-menu>
<v-menu offset-y>
  <template v-slot:activator="{ on, attrs }">
                <v-btn color="transparent" dark v-bind="attrs" v-on="on" small>
                  <v-avatar tile size="14" class="mr-2">
                    <img src="@/assets/images/flags/usa.png" alt="" />
                  </v-avatar>
                  <span>USD</span>
                  <v-icon right small>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
  <v-list>
    <v-list-item v-for="(item, index) in items" :key="index">
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
</v-toolbar-title>
</div>
</v-container>
</div> -->
    <v-app-bar height="72" app scroll-off-screen class="sub-topbar" color="white py-1">
      <v-container>
        <div class="d-flex justify-space-between align-center">
          <v-toolbar-title class="d-flex align-center">
            <nuxt-link to="/">
              <v-img class="me-2 logo d-md-block d-none" width="120" :src="require('~/assets/images/logo.png')"
                alt=""></v-img>
            </nuxt-link>
            <div class="dropdown-ecommerce" :class="{ 'd-none': $route.path == '/home/HomeTwo' }">
              <HeaderNavbar />
            </div>
          </v-toolbar-title>
          <v-col cols="12" md="7">
            <div v-if="$route.path == '/home/HomeTwo'" class="search-bar d-flex p-relative">
              <v-text-field class="" placeholder="Searching For" filled rounded hide-details dense
                prepend-inner-icon="mdi-magnify"></v-text-field>
              <v-btn color="primary" class="text-capitalize search-bar-dropdown px-10 font-600">
                Search
              </v-btn>
            </div>

            <div v-else class="search-bar d-flex p-relative">
              <v-text-field class="" placeholder="Searching For" filled rounded dense
                prepend-inner-icon="mdi-magnify"></v-text-field>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="white" class="text-capitalize search-bar-dropdown" v-bind="attrs" v-on="on">
                    All Categories
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in items" :key="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
          <div class="">
            <div class="d-md-block d-none">
              <ul class="navbar-nav navigation-navbar d-flex flex-row">
                <li v-if="$store.state.auth && $store.state.auth.user" class="nav-item mt-3">
                  <v-avatar tile size="25" class="me-3">
                    <img :src="$store.state.auth.user.avatar" alt="" />
                  </v-avatar>
                  <a v-if="$store.state.auth && $store.state.auth.user" class="nav-link" href="#">{{
    $store.state.auth.user.first_name }}
                    {{ $store.state.auth.user.last_name }}</a>

                  <ul>
                    <li>
                      <a href="javascript:void(0);" @click="logout">
                        <p class="mb-0">Logout</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li v-if="$store.state.auth && $store.state.auth.user" class="nav-item me-3">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-badge :content="notifications.length" color="red" overlap class="small-badge">
                        <v-btn icon v-bind="attrs" class="small-btn" v-on="on">
                          <v-icon class="small-icon">mdi-bell</v-icon>
                        </v-btn>
                      </v-badge>

                    </template>
                    <v-list>
                      <v-list-item v-for="(notification, index) in notifications"
                        @click="handleNotificationClick(notification)" :key="index">
                        <v-list-item-content>
                          <v-list-item-title>{{ notification.title }}</v-list-item-title>
                          <v-list-item-subtitle>{{ notification.description }}</v-list-item-subtitle>
                          <v-list-item-subtitle class="grey--text">{{ notification.created_at }}</v-list-item-subtitle>
                          <!-- Display created_at detail -->
                          <v-divider></v-divider>
                        </v-list-item-content>


                      </v-list-item>
                    </v-list>

                  </v-menu>
                </li>

                <li v-if="$store.state.auth && $store.state.auth.user" class="nav-item mt-3">
                  <nuxt-link to="/dashboard">
                    <p class="mb-0">Dashboard</p>
                  </nuxt-link>
                </li>

                <li v-if="!$store.state.auth.user" class="nav-item me-3">
                  <nuxt-link to="/login">
                    <p class="mb-0">Login</p>
                  </nuxt-link>
                </li>
                <li v-if="!$store.state.auth.user" class="nav-item me-3">
                  <nuxt-link to="/sign-up/doctor">
                    <p class="mb-0">Register As Doctor</p>
                  </nuxt-link>
                </li>
                <li v-if="!$store.state.auth.user" class="nav-item me-3">
                  <nuxt-link to="/sign-up/patient">
                    <p class="mb-0">Register As Patient</p>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary right width="320" class="z-999">
      <div class="secondary-siebar-content">
        <v-list-item>
          <v-list-item-avatar class="mr-0">
            <v-icon color="">mdi-shopping-outline</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="">{{ getCartProducts.length }} Items</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="" @click="drawer = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <div>
          <div>
            <div class="cart-item d-flex justify-space-between align-center px-2 py-3">
              <div class="d-flex flex-column align-center">
                <v-btn class="mx-2" fab outlined dark x-small color="primary">
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
                <span>545</span>
                <v-btn class="mx-2" fab outlined dark x-small color="primary">
                  <v-icon dark> mdi-minus </v-icon>
                </v-btn>
              </div>
              <v-avatar tile size="76">
                <img
                  :src="`http://localhost:8000/storage/profile_pictures/D69mNUonfy8Nq7XQ2Yivs8dyuqSuIQTERGBdSM0h.jpg`"
                  alt="" />
              </v-avatar>
              <div class="col-5">
                <h5 class="text-truncate">sdsad</h5>
                <p class="text-tiny">test</p>
                <h5 class="primary--text">test</h5>
              </div>
            </div>
            <v-divider></v-divider>
          </div>
        </div>

      </div>

    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HeaderNavbar from '@/pages/home/header-navbar'
import Navbar from '@/pages/home/navbar'
import { directive as onClickaway } from 'vue-clickaway'
import Loader from "../../components/Loader.vue";
export default {
  name: 'BaseAppBar',
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    HeaderNavbar,
    Navbar,
    Loader
  },

  computed: {
    ...mapGetters(['getCartProducts']),
    cartTotal() {
      let total = 0
      this.getCartProducts.forEach((product) => {
        total += product.amount * product.qty
      })
      return total
    },
    notifications() {
      return this.$store.state.notification.notifications;
    }
  },
  data: () => ({
    cartCount: 0,

    colorNav: false,
    dialog: false,
    isToggleNavbar: false,
    items: [
      { title: 'Car' },
      { title: 'Clothes' },
      { title: 'Electronics' },
      { title: 'Laptop' },
    ],
    itemTwo: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    drawer: false,
    group: null,
  }),


  methods: {
    ...mapActions(['addCart', 'removeCart']),
    handleNotificationClick(notification) {
      // Handle click on notification in the detail page list
      console.log('Clicked on detail page notification:', notification);
      // Perform any action you want here
      this.$axios.put(`notifications/${notification.id}`).then((response) => {
        console.log(response);
        this.getNotifications();
      })
    },
    getNotifications() {
      this.$axios.get('notifications').then((response) => {
        this.$store.commit("ASSIGN_NOTIFICATIONS", response.data.data);
      })
    },
    logout() {
      this.$store.commit('LOGOUT_USER');
      this.$router.push('/login')
    },
    toggleNavbar() {
      if (this.$route.path == '/') {
        this.isToggleNavbar = false
      } else {
        this.isToggleNavbar = !this.isToggleNavbar
      }
    },
    away() {
      this.isToggleNavbar = false
    },
    removeCartx(item) {
      this.removeCart(item)
    },
    addCartx(item) {
      this.addCart(item)
    },
  },
}
</script>
<style lang="scss" scoped>
$z-index-sub-topbar: 2;
$md: 959px;
$z-99: 99;

.z-999 {
  z-index: 999;
}

.v-list-item {
  min-height: 34px;
}

.top-bar {
  height: 40px;
  display: flex;
  align-items: center;
}

.sale-page-one {
  .sub-topbar {
    &.v-app-bar--is-scrolled {
      position: relative;

      .dropdown-ecommerce {
        display: none;
      }
    }
  }

  .navbar {
    &.v-app-bar--is-scrolled {
      top: 0;
      margin-bottom: 0px;
    }
  }
}

.sale-page-two {
  .sub-topbar {
    &.v-app-bar--is-scrolled {
      position: relative;

      .dropdown-ecommerce {
        display: none;
      }
    }
  }

  .navbar {
    &.v-app-bar--is-scrolled {
      top: 0;
      margin-bottom: 0px;
    }
  }
}

.sub-topbar {
  position: relative;
  box-shadow: none !important;
  width: 100%;
  height: 80px !important;
  z-index: $z-99;

  .dropdown-ecommerce {
    display: none;
  }

  &.v-app-bar--fixed {
    position: unset;
  }

  // z-index: $z-index-sub-topbar;

  &.v-app-bar--is-scrolled {
    position: fixed;
    top: 0;
    box-shadow: none !important;

    .dropdown-ecommerce {
      display: block;
    }
  }

  @media (max-width: $md) {}
}

.navbar {
  height: 60px;
  width: 100%;
  z-index: 2;
  box-shadow: rgb(43 52 69 / 10%) 0px 16px 16px -16px !important;

  &.v-app-bar--is-scrolled {
    position: relative;
    top: 64px;
    margin-bottom: 64px;
    box-shadow: rgb(43 52 69 / 10%) 0px 16px 16px -16px !important;
    // box-shadow: none !important;
  }

  @media (max-width: 992px) {
    display: none;
  }
}

.search-bar {
  ::v-deep .v-input__slot {
    border: 1px solid rgb(218, 225, 231);
    background-color: #fff !important;
  }

  .search-bar-dropdown {
    height: 39px;
    position: absolute;
    top: 20px;
    transform: translateY(-50%);
    right: 2px;
    border-radius: 22px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-left: 1px solid rgb(218, 225, 231) !important;
    box-shadow: none !important;

    @media (max-width: $md) {
      display: none;
    }
  }

  ::v-deep .v-text-field__details {
    display: none;
  }
}

// toggleNavbarButton
.navbar-toggle-dropdown {
  z-index: 98;
  display: none;

  &.open {
    display: block;
    top: 64px;
  }
}

.v-hidden {
  visibility: hidden;
}

.empty-cart-sidebar {
  height: 80vh;
}

/* Custom styles.css */
.small-badge .v-badge__badge {
  min-width: 16px;
  /* Reduce badge size */
  height: 16px;
  padding: 0;
  /* Adjust padding to tighten the layout */
}

.small-badge .v-badge__badge .v-icon {
  font-size: 12px;
  /* Adjust icon size within the badge */
}

.small-btn .v-btn {
  min-width: 30px;
  /* Reduce button size */
  height: 30px;
  padding: 2px;
  /* Adjust padding */
}

.small-icon {
  font-size: 18px;
  /* Adjust standalone icon size */
}
</style>