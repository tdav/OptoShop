
<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs10 sm8 md5 lg4 xl3>
            <div class="primary dark parent" style="min-height: 200px;">
              <img src="../assets/image/logo_white_f.png" class="img-logo inner" alt="Лого" />
            </div>

            <v-card class="elevation-22 pa-3">
              <v-card-text>
                <v-form>
                  <v-text-field
                    autofocus
                    append-icon="person"
                    name="login"
                    label="Логин"
                    type="text"
                    v-model="phoneNumber"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Пароль"
                    id="password"
                    type="password"
                    v-model="password"
                    v-on:keyup.enter="dologin"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn round to="reg">Регистрация</v-btn>
                <v-spacer></v-spacer>
                <v-btn block round color="primary" @click="dologin" :loading="loading">Вход</v-btn>
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
    loading: false,
    phoneNumber: "998",
    password: ""
  }),
 
  methods: {
    dologin: function() {
      this.loading = true;

      let formData = {};     
      formData.phoneNumber=this.phoneNumber,
      formData.password=this.password; 
      formData.deviceId='11111';
      formData.lang = 'UZ'

      this.$store
        .dispatch("LOGINAC", formData)
        .then(() => {
          this.$router.push("/");
          this.loading = false;
        })
        .catch(() => {
          this.$store.dispatch(
            "SETERROR",
            "Неправильный пароль или ошибка соединения."
          );

          this.loading = false;
        });
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

.img-logo {
  width: 250px;
  height: 60px;
  object-fit: contain;
}

.parent {
  height: 80px;
  position: relative;
}

.inner {
  width: 320px;
  height: 100px;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
}
</style>