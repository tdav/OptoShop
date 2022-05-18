<template>
  <v-container fluid pa-0>
    <v-layout @mouseover="hover = false" @mouseleave="hover = true">
      <v-carousel interval="6000" :max="max_width" :height="car_height" hide-delimiters cycle>
        <v-carousel-item
          style="cursor: pointer;"
          lazy
          v-for="(item,i) in items"
          @click.native="onSelect(item)"
          :key="i"
          reverse-transition="fade"
          :src="`${serverUrl}storage/${item.image}`"
        ></v-carousel-item>
      </v-carousel>
    </v-layout>
  </v-container>
</template>

<script>
import staticConfig from "../utils/staticConfig";

export default {
  name: "Carousel",
  data() {
    return {
      serverUrl: staticConfig.ServerUrl,
      hover: true,
      car_width: 0,
      car_height: 0,
      max_width: 0,
      items: []
    };
  },

  mounted() {
    this.max_width = window.screen.width;
    this.car_height = this.max_width > 400 ? 500 : 250;
  },

  async created() {
    this.items = await this.$store.dispatch("GET_BANNERLIST");
  },

  methods: {
    onSelect(pi) {
      this.$router.push("/products/cas");

      if (pi.product_id != 0) {
        this.$store.dispatch(
          "GET_PRODUCTLIST_BYPARAM",
          `product=${pi.product_id}`
        );
        return;
      } else if (pi.distributor_id != 0) {
        this.$store.dispatch(
          "GET_PRODUCTLIST_BYPARAM",
          `distributor=${pi.distributor_id}`
        );
        return;
      } else if (pi.category_id != 0) {
        this.$store.dispatch(
          "GET_PRODUCTLIST_BYPARAM",
          `category=${pi.category_id}`
        );
        return;
      } else if (pi.brand_id != 0) {
        this.$store.dispatch("GET_PRODUCTLIST_BYPARAM", `brand=${pi.brand_id}`);
        return;
      }
    }
  }
};
</script>