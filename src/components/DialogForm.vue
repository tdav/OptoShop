<template>
  <v-card>
    <v-card-title class="subheading">{{caption}}</v-card-title>

    <v-card-text>
      <div>
        <span>{{text}}</span>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" round @click="onClick(false)">Нет</v-btn>
      <v-btn color="success" round @click="onClick(true)">Да</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["caption", "text"],

  data() {
    return {
      content: this.value
    };
  },

  methods: {
    onClick(v) {
      this.$store.dispatch("SET_DIALOG_VALUE", v);
      this.$emit("close", v);
    }
  }
};
</script>
