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
          <h3 class="mb-2 text-center mb-11"> Log in with email & password</h3>
          <!-- <h5
            class="font-600 grey--text text--darken-3 text-sm mb-9 text-center"
          >
            Log in with email & password
          </h5> -->
          <v-alert color="green" v-if="message">{{ message }}</v-alert>
          <p class="text-14 mb-1">Email or Phone Number</p>
          <v-text-field
            outlined
            dense
            hide-details
            placeholder="example@mail"
            v-model="form.email"
            class="mb-4"
          ></v-text-field>
          <p class="text-14 mb-1">Password</p>
          <v-text-field
            outlined
            dense
            type="password"
             v-model="form.password"
            hide-details
            placeholder="example@mail"
            class="mb-4"
          ></v-text-field>
          <v-btn @click="save" block color="primary" class="text-capitalize font-600"
            >Login</v-btn
          >
          <!-- <v-col cols="10" lg="8" class="mx-auto">
            <div class="d-flex align-center my-1">
              <v-divider></v-divider>
              <span class="mx-4">on</span>
              <v-divider></v-divider>
            </div>
          </v-col> -->
        
         
          <div class="text-14 text-center my-3">
            Sign up as Doctor?
            <router-link to="/sign-up/doctor" class="grey--text text--darken-4 font-600"
              >sign up</router-link
            >
          </div>
          <div class="text-14 text-center my-3">
            Sign up as Patient?
            <router-link to="/sign-up/patient" class="grey--text text--darken-4 font-600"
              >sign up</router-link
            >
          </div>
        </div>
        <div class="py-4 grey lighten-2">
          <div class="text-center">
            <span class="grey--text text--darken-1"
              >Forgot Your Password
              <router-link
                to="/forgot-password"
                class="ms-2 grey--text text--darken-4 font-600"
                >Reset It</router-link
              >
            </span>
          </div>
        </div>
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
    cartCount: 0,
    colorNav: false,
    dialog: false,
    isToggleNavbar: false,
    form:{
      email:null,
      password:null
    },
    items: [
      { title: 'Car' },
      { title: 'Clothes' },
      { title: 'Electronics' },
      { title: 'Laptop' },
    ],
    message:null,
    itemTwo: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    drawer: false,
    group: null,
  }),
mounted(){
  if(this.$route.query.email){
this.$axios.post(`verify`,{email:this.$route.query.email}).then((response)=>{
  this.message=response.data.message;
})
}
},
  methods: {
    ...mapActions(['addCart', 'removeCart']),
    save() {
      this.$axios.post(`login`, this.form).then((response) => {
        console.log(response.data.data)

        this.$store.commit('SET_TOKEN', response.data.token)
        this.$store.commit('SET_USER_DETAILS', response.data.data)
        this.$router.push('/dashboard');
      }).catch((error)=>{
        if(error.response.status==400){
          console.log(error.response.data)
          this.$toast.error(error.response.data.message);
        }
        if(error.response.status==401){
          this.$toast.error("Invalid credential");
        }
      })
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