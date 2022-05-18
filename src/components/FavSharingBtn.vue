<template>
  <v-flex xs12 sm6>
    <div class="text-xs-right">
      <div>
        <v-btn flat icon small dark color="warning" @click="btnShare">
          <v-icon>share</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn flat icon small dark color="warning" @click="btnFavProduct">
          <v-icon>{{fav_icon}}</v-icon>
        </v-btn>
      </div>
    </div>
  </v-flex>
</template>

 <script>
import Share from "../service/share";
import SysConf from "../utils/staticConfig";

export default {
  props: ["value", "isShowFavs"],

  computed: {
    fav_icon() {
      return this.$store.getters.fabById(this.value) ? "star" : "star_border";
    }
  },

  methods: {
    btnFavProduct() {
      this.$store.dispatch("FAV_LIST", this.value);
    },

    btnShare() {
      const url = `${SysConf.ServerUrl}products/${this.value}`;
      Share(url);
    }
  }
};
</script>
 