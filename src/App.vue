<template>
  <v-app>
    <template v-if="!$route.meta.public">
      <v-toolbar app prominent dark>
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>

        <v-toolbar-items v-if="isShowLogo">
          <a @click="updPage" class="img-contener">
            <img
              class="logo"
              style="vertical-align: middle;"
              src="./assets/image/logo_black_w.png"
              alt="Logo"
            />
          </a>
        </v-toolbar-items>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" v-if="searchIcon!='check'">
          <v-btn flat @click="showPromotionsDrawer()">Акции</v-btn>

          <v-btn flat @click="showCategoriesDrawer()">КАТЕГОРИИ</v-btn>

          <v-btn flat @click="showBrandsDrawer()">БРЕНДЫ</v-btn>

          <v-btn flat @click="showDistributorsDrawer()">Поставщики</v-btn>

          <v-btn flat @click="showOrders()">ЗАКАЗЫ</v-btn>
        </v-toolbar-items>

        <v-spacer class="hidden-sm-and-down"></v-spacer>

        <v-text-field
          autofocus
          v-if="searchIcon=='clear'"
          v-model="searchValue"
          color="white"
          placeholder="Поиск"
          type="text"
          style="width: 100px !important;"
          @input="onSearchValueChange"
        ></v-text-field>

        <v-btn icon @click="btnSearch">
          <v-icon>{{searchIcon}}</v-icon>
        </v-btn>

        <v-btn icon @click="getFavProducts">
          <v-badge :color="isProductInFav ? 'red' :'transparent'" overlap>
            <span slot="badge" v-if="isProductInFav">{{productInFav}}</span>
            <v-icon medium>grade</v-icon>
          </v-badge>
        </v-btn>

        <v-menu
          offset-y
          origin="center center"
          class="elelvation-1"
          :nudge-bottom="14"
          transition="fade-transition"
        >
          <v-btn icon flat slot="activator" @click="showBasket">
            <v-badge :color="isProductInCard ? 'red' :'transparent'" overlap>
              <span slot="badge" v-if="isProductInCard">{{productInCard}}</span>
              <v-icon medium>shopping_cart</v-icon>
            </v-badge>
          </v-btn>
        </v-menu>
      </v-toolbar>

      <modals-container />

      <router-view></router-view>

      <NavDrawer :isShow="drawer" v-if="drawer" v-on:DrawerIsShow="drawer = $event" />
      <CategoriesDrawer
        :isShow="categoriesDrawer"
        v-if="categoriesDrawer"
        v-on:DrawerIsShow="categoriesDrawer = $event"
      />
      <BrandsDrawer
        v-if="brandsDrawer"
        :isShow="brandsDrawer"
        v-on:DrawerIsShow="brandsDrawer = $event"
      />
      <DistributorsDrawer
        v-if="distributorsDrawer"
        :isShow="distributorsDrawer"
        v-on:DrawerIsShow="distributorsDrawer = $event"
      />

      <!-- <v-footer class="pa-3">
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
      </v-footer>-->
    </template>

    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
        </keep-alive>
      </transition>
    </template>

    <template v-if="error">
      <v-snackbar
        :timeout="3000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      >{{error}}</v-snackbar>
    </template>

    <template v-if="message">
      <v-snackbar
        :timeout="3000"
        :multi-line="true"
        color="success"
        @input="closeMessage"
        :value="true"
      >{{message}}</v-snackbar>
    </template>
  </v-app>
</template>

<script>
import NavDrawer from "./components/Drawers/NavDrawer";
import CategoriesDrawer from "./components/Drawers/CategoriesDrawer";
import BrandsDrawer from "./components/Drawers/BrandsDrawer";
import DistributorsDrawer from "./components/Drawers/DistributorsDrawer";
import { debounce } from "debounce";

export default {
  components: {
    NavDrawer,
    CategoriesDrawer,
    BrandsDrawer,
    DistributorsDrawer
  },

  mounted() {
    this.$root.$on("evtPersonOrders", this.showOrders);
    this.$root.$on("evtBasket", this.showBasket);
    this.$root.$on("evtCategories", this.showCategoriesDrawer);
    this.$root.$on("evtDistributors", this.showDistributorsDrawer);
    this.$root.$on("evtPromotions", this.showPromotionsDrawer);
    this.$root.$on("evtBrands", this.showBrandsDrawer);
    this.$root.$on("evtFavProducts", this.getFavProducts);
    this.$root.$on("evtPromotions", this.showPromotionsDrawer);

    // window.addEventListener("beforeunload", this.onRefresh);
  },

  data: () => ({
    drawer: false,
    isShowLogo: true,
    categoriesDrawer: false,
    brandsDrawer: false,
    distributorsDrawer: false,
    isFavProductClick: false,
    searchIcon: "search",
    btncolor: "error",
    searchValue: ""
  }),

  computed: {
    error() {
      return this.$store.getters.error;
    },
    message() {
      return this.$store.getters.message;
    },

    productInCard() {
      return this.$store.getters.cartProductsCount;
    },
    productInFav() {
      return this.$store.getters.favCount;
    },

    isProductInCard() {
      return this.productInCard > 0;
    },

    isProductInFav() {
      return this.productInFav > 0;
    }
  },

  props: {
    source: String
  },

  methods: {
    onRefresh() {
      this.$store.dispatch("SAVE_BASKET");
    },

    getFavProducts() {
      this.$router.push("/products/fabs");
    },

    showPromotionsDrawer() {
      this.$router.push("/products/sale");
    },

    showCategoriesDrawer() {
      this.categoriesDrawer = !this.categoriesDrawer;
    },

    showBrandsDrawer() {
      this.brandsDrawer = !this.brandsDrawer;
    },

    showDistributorsDrawer() {
      this.distributorsDrawer = !this.distributorsDrawer;
    },

    async showOrders() {
      await this.$store.dispatch("GETORDERLIST");
      this.$router.push("/orders");
    },

    async showBasket() {
      if (this.productInCard > 0) {
        this.$router.push("/basket");
      } else {
        this.$store.dispatch("SETERROR", "Корзина пуста.");
      }
    },

    btnSearch() {
      this.$router.push("/products");

      if (this.searchIcon == "search") {
        this.searchIcon = "clear";
        this.searchValue = "";
        this.btncolor = "info";
        this.isShowLogo = false;
      } else {
        this.isShowLogo = true;
        this.btncolor = "error";
        this.searchIcon = "search";
      }
    },

    onSearchValueChange: debounce(function(e) {
      if (e != "" && e.length > 2) {
        this.$store.dispatch("FIND_PRODUCT", e);
      }
    }, 400),

    closeMessage() {
      this.$store.dispatch("CLEAR_MES");
    },

    closeError() {
      this.$store.dispatch("CLEARERROR");
    },

    updPage() {
      this.$router.push("/");
      window.location.reload(true);
    }
  }
};
</script>


<style>
.logo {
  object-fit: contain;
  width: 100px;
}

.img-contener {
  display: flex;
  align-items: center;
}

.theme--dark.v-toolbar {
  background-color: #5e35b1d1 !important;
  color: #fff;
}
</style>
