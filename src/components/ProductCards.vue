<template>
  <v-container grid-list-xl>
    <v-fab-transition v-if="fabHome">
      <v-btn
        fab="fab"
        small
        dark="dark"
        fixed="fixed"
        bottom="bottom"
        right="right"
        color="red"
        to="/products"
      >
        <v-icon>home</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-layout row wrap>
      <template v-if="productsItems">
        <CardItem v-for="it in productsItems" :key="it.id" :item="it"/>
        <FabMain/>
      </template>

      <template v-else>
        <EmptyProduct/>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import EmptyProduct from "../components/EmptyProduct";
import CardItem from "../components//CardItem";
import staticConfig from "../utils/staticConfig";
import FabMain from "../components/FabMain";

export default {
  name: "ProductCards",
  components: {
    FabMain,
    CardItem,
    EmptyProduct
  },

  data() {
    return {
      fabHome: true,
      fabScroll: false,
      serverUrl: staticConfig.ServerUrl
    };
  },

  watch: {
    "$route.params.url": function() {
      this.loadProducts();
    }
  },

  beforeMount() {
    this.loadProducts();
  },

  computed: {
    productsItems: function() {
      return this.$store.getters.products;
    },

    product_loading: function() {
      return this.$store.getters.loading;
    }
  },

  methods: {
    onScroll() {
      if (typeof window === "undefined") return;

      const top = window.pageYOffset || document.documentElement.offsetTop || 0;
      if (top > 300) {
        this.$root.$emit("evtShowFabMain", 1);
      }

      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight + 1 >=
        document.documentElement.offsetHeight;

      if (bottomOfWindow && !this.$store.getters.loading) {
        let cg = this.$store.getters.getConfig;
        if (cg.current_page != cg.total_page) {
          this.$root.$emit("evtShowFabMain", 2);
          this.$store.dispatch("GET_PRODUCT_INFINITE");
        }
      }
    },

    loadProducts() {
      this.fabHome = true;

      switch (this.$route.params.url) {
        case "cas":
          break;

        case "fabs":
          this.$store.dispatch("GET_FAVLIST");
          break;

        case "sale":
          this.$store.dispatch("GET_PROMOTIONLIST");
          break;

        default:
          this.fabHome = false;
          this.$store.dispatch("GET_PRODUCTLIST");
          break;
      }
    },

    toTop() {
      this.$router.push({ hash: "" });
      this.$vuetify.goTo(0);
    }
  },

  created: function() {
    window.addEventListener("scroll", this.onScroll);
  },

  destroyed: function() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>


<style>
.v-text-field--box .v-input__slot,
.v-text-field--outline .v-input__slot {
  min-height: 40px !important;
}

.mt-45 {
  margin-top: -70px !important;
}

.flexcard {
  display: flex;
  flex-direction: column;
}

.name {
  height: 48px;
  font-weight: 600;
  font-size: 16px;
}

.product-price-bloc {
  margin-top: 10px;
  display: inline-flex;
}

.product-caption {
  align-self: center;
  margin-right: 10px;
}

.product-price {
  font-weight: 400 !important;
  color: red;
}

.product-title {
  padding-bottom: 0px !important;
}
.brand {
  padding-top: 16px;
  padding-bottom: 0px !important;
}

.product-card-title {
  padding-top: 10px;
  padding-bottom: 0px;
  padding-bottom: 0px !important;
}

.product-actions {
  padding-top: 0px !important;
}

.col {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.btn-favorite1 {
  padding-left: 30px !important;
}

.btn-add-card {
  padding-left: 0px !important;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>

 