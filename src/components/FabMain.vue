<template>
  <div>
    <v-progress-circular
      v-show="showLoading"
      indeterminate
      color="red"
      class="v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right v-btn--small"
    ></v-progress-circular>

    <v-fab-transition v-if="showComponent">
      <v-btn fab small dark fixed bottom right color="red" v-show="showFab" @click="toTop">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFab: false,
      showLoading: false,
      showComponent: false
    };
  },

  created() {
    this.$root.$on("evtShowFabMain", this.onShow);
  },

  methods: {
    onShow(v) {
      switch (v) {
        case 0:
          this.showComponent = false;
          break;

        case 1:
          this.showFab = true;
          this.showLoading = false;
          this.showComponent = true;
          break;

        case 2:
          this.showFab = false;
          this.showLoading = true;
          this.showComponent = true;
          break;

        case 3:
          this.showFab = false;
          this.showLoading = false;
          this.showComponent = true;
          break;
      }
    },

    toTop() {
      this.$router.push({ hash: "" });
      this.$vuetify.goTo(0);
    }
  }
};
</script>

<style>
</style>
