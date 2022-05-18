<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs10 sm6 md4 lg3 xl2>
            <v-card>
              <v-card-title class="primary white--text title">Тех. поддержка</v-card-title>
              <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      autofocus
                      prepend-icon="business"
                      placeholder="Сообщения"
                      v-model="usd.title"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select
                      :items="mesType"
                      label="Тип сообщения"
                      prepend-icon="map"
                      v-model="usd.type"
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 sm12 md12>
                    <v-textarea
                      prepend-icon="notes"
                      placeholder
                      label="Комментария к проблеме"
                      v-model="usd.message"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn round @click="btnCancel">Отменить</v-btn>
                <v-btn round @click="btnOk" color="primary">Отправить</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
 

<script>
export default {
  data: () => ({
    usd: {},
    showSupport: true,
    mesType: ["Ошибка", "Комментарии", "Пожелания", "Отзыв программе"]
  }),

  props: {
    isShow: Boolean
  },
  methods: {
    btnCancel: function() {
      this.$store.dispatch("SET_DISABLE_LOAD_PRODUCTS", true);
      this.$router.push("/products");
    },

    btnOk() {
      this.$store
        .dispatch("USER_SUPPORT", this.usd)
        .then(() => {
          this.$store.dispatch("SET_MES", "Сообщение отправлено");
          this.loading = false;
          this.$router.push("/products");
        })
        .catch(e => {
          this.$store.dispatch("SETERROR", e);
          this.loading = false;
        });

      this.$emit("close");
    }
  }
};
</script>
