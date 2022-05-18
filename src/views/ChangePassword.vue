<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs10 sm6 md4 lg3 xl2>
            <v-card>
              <v-card-title class="primary white--text title">Сменить пароль в систем</v-card-title>

              <v-card-text>
                <v-text-field
                  append-icon="lock"
                  name="old_password"
                  label="Старый пароль"
                  type="password"
                  v-model="old_password"
                ></v-text-field>
                <v-text-field
                  append-icon="lock"
                  name="password"
                  label="Пароль"
                  type="password"
                  v-model="password"
                ></v-text-field>
                <v-text-field
                  append-icon="done_all"
                  name="password1"
                  label="Подтвердите пароль"
                  type="password"
                  v-model="password1"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn round block @click="btnCancel">Отменить</v-btn>
                <v-btn round block color="primary" @click="btnSave" :loading="loading">Сохранить</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import http from "../service/axios_init";
import SysConf from "../utils/staticConfig";

export default {
  data: () => ({
    loading: false,
    old_password: "",
    password: "",
    password1: ""
  }),

  methods: {
    btnSave: async function() {
      try {
        this.loading = true;

        if (this.password == this.password1) {
          var fd = new FormData();
          fd.append("old_password", this.old_password);
          fd.append("new_password", this.password);

          let res = await http.post_formdata("/api/v1/profil", fd);

          if (res.status == 200) {
            this.$store.dispatch("SET_MES", "Пароль успешно изменен.");
            this.$router.push("/products");
          }
        } else {
          this.$store.dispatch("SET_MES", "Подтверждение пароля не совпадает.");
        }
      } catch (err) {
        console.log(err);
      }

      this.loading = false;
    },

    btnCancel: function() {
      this.$router.push("/products");
    }
  }
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>