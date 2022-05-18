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
        <v-flex xs12 sm8, md6, lg6>
          <v-card>
            <v-card-title style="padding-bottom: 0px;">
              <div class="headline">Мои баллы: {{ms.my_money}}</div>
            </v-card-title>
            <v-card-text style="padding-top: 0px;">
              <v-list>
                <template v-for="(item, index) in ms.bonus">
                  <v-divider :key="index" :inset="item.inset"></v-divider>

                  <v-list-tile :key="item.title">
                    <v-list-tile-avatar>
                      <v-list-tile-title v-html="item.ball"></v-list-tile-title>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.name"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
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
      ms: {}
    };
  },
  async mounted() {
    const res = await http.get("/api/v1/cashbacks");
    if (res.data) this.ms = res.data;
  },

  methods: {
    onbtnHome() {
      this.$store.dispatch("SET_DISABLE_LOAD_PRODUCTS", true);
      this.$router.push("/products");
    }
  }
};
</script>
