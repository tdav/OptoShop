<template>
  <v-card>
    <v-card-title v-if="onlyImage" class="subheading">Описания товара</v-card-title>

    <v-img :src="`${serverUrl}storage/${item.image}`" aspect-ratio="2" contain></v-img>

    <v-card-title v-if="onlyImage">
      <div>
        <span class="grey--text">{{item.name}}</span>
      </div>
    </v-card-title>

    <v-card-text v-if="!onlyImage">
      <div>
        <span>{{item.text}}</span>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" round flat @click="$emit('close')">Закрыть</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import staticConfig from "../utils/staticConfig";
export default {
  data() {
    return {
      serverUrl: staticConfig.ServerUrl
    };
  },

  props: ["item", "onlyImage"]
};
</script>
