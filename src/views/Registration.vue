<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs10 sm8 md5 lg4 xl3>
            <div class="primary dark parent" style="min-height: 200px;">
              <img src="../assets/image/logo_white_f.png" class="img-logo inner" alt="Лого">
            </div>

            <v-card class="elevation-22 pa-3">
              <v-card-text>
                <v-form>
                  <v-text-field
                    autofocus
                    append-icon="person_outline"
                    name="name"
                    label="ФИО"
                    v-model="fio"
                  ></v-text-field>

                  <v-text-field
                    append-icon="contact_phone"
                    name="login"
                    label="Логин"
                    type="text"
                    v-model="login"
                  ></v-text-field>
                  <v-text-field
                    sm6
                    append-icon="lock"
                    name="password"
                    label="Пароль"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-text-field
                    sm6
                    append-icon="done_all"
                    name="password1"
                    label="Подтвердите Пароль"
                    type="password"
                    v-model="password1"
                  ></v-text-field>

                  <v-text-field
                    append-icon="shopping_cart"
                    name="point-name"
                    label="Торговый точка"
                    v-model="pointname"
                  ></v-text-field>

                  <v-text-field
                    @input="doMap"
                    label="Координаты торговый точки"
                    v-model="myLocation"
                  >
                    <template v-slot:append>
                      <v-btn small @click="doMap">Получить</v-btn>
                    </template>
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn round to="/login">Логин</v-btn>
                <v-spacer></v-spacer>
                <v-btn round block color="primary" @click="doRegUser" :loading="loading">Регистрация</v-btn>
              </v-card-actions>
            </v-card>

            <YandexMap v-if="mapShow" :isShow="mapShow" v-on:MapIsShow="mapShow = $event"></YandexMap>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import YandexMap from "../components/YandexMap.vue";

export default {
  data: () => ({
    loading: false,
    mapShow: false,
    login: "998911366446",
    password: "123456",
    password1: "",
    pointname: "",
    locationStr: null,
    location: null,
    email: "",
    fio: ""
  }),

  components: {
    YandexMap
  },

  methods: {
    doRegUser: function() {
      if (this.password1 != this.password) {
        this.$store.dispatch(
          "SETERROR",
          "Пароль не совпадают с подтверждением."
        );
      } else {
        this.loading = true;
        debugger;

        let fd = new FormData();
        fd.append("login", this.login);
        fd.append("password", this.password);
        fd.append("point-name", this.pointname);
        fd.append("email", this.email);
        fd.append("name", this.fio);
        fd.append("latitude", this.myLocation[0]);
        fd.append("longitude", this.myLocation[1]);
        // fd.append("point-image", undefined);

        this.$store
          .dispatch("REG_USER", fd)
          .then(() => {
            this.$store.dispatch("SET_MES", "Дождитесь активации пользователя");
            this.$router.push("/login");
            this.loading = false;
          })
          .catch(e => {
            this.$store.dispatch("SETERROR", e);
            this.loading = false;
          });
      }
    },

    doMap() {
      this.mapShow = !this.mapShow;
    }
  },

  computed: {
    myLocation() {
      return this.$store.getters.getMyLocation;
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