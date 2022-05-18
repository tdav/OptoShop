<template>
  <div>
    <v-content>
      <ProductCards/>
    </v-content>
  </div>
</template>

<script>
import ProductCards from "../components/ProductCards";

export default {
  components: {
    ProductCards
  },

  mounted() {
    this.$store.dispatch("FAV_LOAD");
    this.$store.dispatch("GET_CATEGORIES");
    this.$store.dispatch("GET_BRANDS");
    this.$store.dispatch("GET_DISTRIBUTORS");
    this.$store.dispatch("LOAD_LAST_BASKET");
  }
};
</script>
