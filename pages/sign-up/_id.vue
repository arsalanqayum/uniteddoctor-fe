<template>
  <div
    :class="[
      { 'sale-page-one': $route.path == '/salePage/SalePageOne' },
      { 'sale-page-two': $route.path == '/salePage/SalePageTwo' },
    ]"
  >
    <v-container>
      <base-card class="ma-auto w-33">
        <div class="px-3 px-md-10 py-8">
          <!-- <h3 class="mb-2 text-center">Welcome To Ecommerce</h3> -->
          <h5
            class="font-600 grey--text text--darken-3 text-sm mb-9 text-center"
          >
            Register as {{ $route.params.id }}
          </h5>
          <v-form ref="registration" @submit.prevent="save">
          <p class="text-14 mb-1">First Name</p>
          <v-text-field
            outlined
            dense
            hide-details
            :rules="[(v) => !!v || 'First Name is required']"
            placeholder="Enter First Name"
            v-model="form.first_name"
            class="mb-4"
          ></v-text-field>
          <p class="text-14 mb-1">Last Name</p>
          <v-text-field
            outlined
            dense
            v-model="form.last_name"
            :rules="[(v) => !!v || 'Last Name is required']"
            hide-details
            placeholder="Enter Last Name"
            class="mb-4"
          ></v-text-field>
          <p class="text-14 mb-1">Email</p>
          <v-text-field
            outlined
            dense
            :rules="[(v) => !!v || 'Email is required']"
            v-model="form.email"
            hide-details
            placeholder="Enter Email"
            class="mb-4"
          ></v-text-field>
          <p style="color:#ff5252 !important" v-if="errors && errors.email">{{errors.email[0]}}</p>
          <p class="text-14 mb-1">City</p>
          <!-- <v-text-field
            outlined
            dense
            v-model="form.city"
            :rules="[(v) => !!v || 'City is required']"
            hide-details
            placeholder="Enter City"
            class="mb-4"
          ></v-text-field> -->
          <v-autocomplete
            outlined
            v-model="form.city"
            dense
            :items="cities"
            :rules="[(v) => !!v || 'This field is required']"
          ></v-autocomplete>
          <p class="text-14 mb-1">Gender</p>
          <v-radio-group :rules="[(v) => !!v || 'This field is required']" v-model="form.gender" inline>
            <v-radio label="Male" value="male"></v-radio>
            <v-radio label="Female" value="female"></v-radio>
            <!-- <v-radio label="Radio Three" value="three"></v-radio> -->
          </v-radio-group>

          <p class="text-14 mb-1">Password</p>

          <v-text-field
            outlined
            dense
            type="password"
            v-model="form.password"
            hide-details
            :rules="[(v) => !!v || 'Password is required']"
            placeholder="Enter Password"
            class="mb-4"
          ></v-text-field>

           <p class="text-14 mb-1">Confirm Password</p>

          <v-text-field
            outlined
            dense
            type="password"
            v-model="form.password_confirmation"
            hide-details
           :rules="[(v) => !!v || 'Password is required', (v) => v === form.password || 'Passwords do not match']"
            placeholder="Enter Password"
            class="mb-4"
          ></v-text-field>
          <v-btn
            block
           type="submit"
            color="primary"
            class="text-capitalize font-600"
            >Login</v-btn
          >
          </v-form>
          <!-- <v-col cols="10" lg="8" class="mx-auto">
            <div class="d-flex align-center my-1">
              <v-divider></v-divider>
              <span class="mx-4">on</span>
              <v-divider></v-divider>
            </div>
          </v-col> -->

          <div class="text-14 text-center my-3">
            Login
            <router-link to="/login" class="grey--text text--darken-4 font-600"
              >login</router-link
            >
          </div>
        
        </div>
        <!-- <div class="py-4 grey lighten-2">
          <div class="text-center">
            <span class="grey--text text--darken-1"
              >Forgot Your Password
              <router-link
                to="/"
                class="ms-2 grey--text text--darken-4 font-600"
                >Reset It</router-link
              >
            </span>
          </div>
        </div> -->
      </base-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HeaderNavbar from '@/pages/home/header-navbar'
import Navbar from '@/pages/home/navbar'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  name: 'BaseAppBar',
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    HeaderNavbar,
    Navbar,
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
  },
  data: () => ({
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
      //
    ],
    errors:null,
    form: {
      first_name: '',
      gender: '',
      last_name: '',
      email: '',
      city: '',
      password: '',
      password_confirmation:'',
      avatar: 'test.png',
      user_type: null,
      lat: '',
      long: '',
    },
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
  mounted() {
    this.form.user_type = this.$route.params.id
  },

  methods: {
    ...mapActions(['addCart', 'removeCart']),
    save() {
      const validate = this.$refs['registration'].validate();
      if(validate){
      this.$axios.post(`register`, this.form).then((response) => {
        console.log(response.data.data)
          this.form.first_name= null;
          this.form.last_name=null;
          this.form.email= null;
          this.form.city= null;
          this.form.password= null;
          this.form.password_confirmation=null;
          this.form.avatar= 'test.png';
         
          this.form.lat= null;
          this.form.long= null;
    
        this.$toast.success(`${this.form.first_name} ${this.form.last_name} a verification email sent to your inbox.`)
        // this.$store.commit('SET_TOKEN', response.data.token)
        // this.$store.commit('SET_USER_DETAILS', response.data.data)
        // this.$router.push('/dashboard')
      }).catch((error)=>{
        if(error.response.status == 422){
          this.errors = error.response.data.errors;
        }
        
      })
      }
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
  @media (max-width: $md) {
  }
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
</style>