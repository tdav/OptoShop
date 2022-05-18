<template>
  <v-content>
    <v-container fluid fill-height>
      <v-fab-transition>
        <v-btn
          fab="fab"
          small
          dark="dark"
          fixed="fixed"
          bottom="bottom"
          right="right"
          color="red"
          @click="onbtnHome"
        >
          <v-icon>home</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-layout align-center justify-center>
        <v-flex xs10 sm8 md5 lg4 xl3>
          <div v-html="ms"></div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import http from "../service/axios_init";

export default {
  data() {
    return {
      ms: ""
    };
  },
  async mounted() {
    const res = await http.get("/api/v1/about");
    if (res.data) {
      this.ms = res.data.text;
    }
  },

  methods: {
    onbtnHome() {
      this.$store.dispatch("SET_DISABLE_LOAD_PRODUCTS", true);
      this.$router.push("/products");
    }
  }
};
</script>
 