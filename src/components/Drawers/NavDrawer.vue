<template>
  <v-layout wrap>
    <v-navigation-drawer dark v-model="drawerProp" fixed temporary>
      <v-layout column fill-height>
        <v-list class="pa-1">
          <v-list-tile avatar tag="div" to="/myball">
            <v-list-tile-avatar>
              <img src="images/avatar.webp">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Мои баллы: {{my_ball}}</v-list-tile-title>
              <v-list-tile-title>{{phone}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider light></v-divider>
          <v-list-tile @click="showPersonCardModal">
            <v-list-tile-action>
              <v-icon>card_travel</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="subheading">Заказы</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider light></v-divider>
          <v-list-tile @click="showPromotions">
            <v-list-tile-action>
              <v-icon>redeem</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="subheading">Акции</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider light></v-divider>
          <v-list-tile @click="showBasket">
            <v-list-tile-action>
              <v-icon>shopping_cart</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="subheading">Корзина</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider light></v-divider>

          <v-divider light></v-divider>
          <v-list-tile @click="showCategories">
            <v-list-tile-action>
              <v-icon>dns</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">Категории</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider light></v-divider>

          <v-list-tile @click="showBrands">
            <v-list-tile-action>
              <v-icon>thumb_up</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">Бренды</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider light></v-divider>
          <v-list-tile @click="showDistributors">
            <v-list-tile-action>
              <v-icon>business</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">Поставщики</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider light></v-divider>
          <v-list-tile @click="showFavProducts">
            <v-list-tile-action>
              <v-icon>grade</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">Избранное</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider light></v-divider>

          <v-list-tile @click="Profilclick" ripple="ripple" rel="noopener">
            <v-list-tile-action>
              <v-icon>how_to_reg</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">Мой профиль</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider light></v-divider>

          <v-list-tile @click="Supportclick" ripple="ripple" rel="noopener">
            <v-list-tile-action>
              <v-icon>build</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">Тех. поддержка</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider light></v-divider>

          <v-list-tile @click="Aboutclick" ripple="ripple" rel="noopener">
            <v-list-tile-action>
              <v-icon>contact_support</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">О приложения</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider light></v-divider>

          <v-list-tile @click="LogoutClick" ripple="ripple" rel="noopener">
            <v-list-tile-action>
              <v-icon>lock</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">Выход</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider light></v-divider>
        </v-list>

        <v-spacer></v-spacer>

        <v-list class="pt-0" dense>
          <v-list-tile>
            <v-list-tile-title>Версия: {{version}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import staticConfig from "../../utils/staticConfig";
import DialogForm from "../DialogForm";

export default {
  data() {
    return {
      ud: {},
      my_ball: "",
      phone: "",
      version: "",
      aimg: staticConfig.ServerUrl
    };
  },

  props: {
    isShow: Boolean
  },

  created() {
    this.ud = this.$store.getters.user;
    this.version = this.$store.getters.version;
    this.aimg += this.ud.user.avatar;
    this.my_ball += this.ud.user.my_ball;
    this.phone += this.ud.user.phone;
  },

  computed: {
    drawerProp: {
      get: function() {
        return this.isShow;
      },
      set: function(v) {
        this.$emit("DrawerIsShow", v);
      }
    }
  },

  methods: {
    showPersonCardModal() {
      this.$root.$emit("evtPersonOrders");
      this.drawerProp = false;
    },

    showPromotions() {
      this.$root.$emit("evtPromotions");
      this.drawerProp = false;
    },

    showBasket() {
      this.$root.$emit("evtBasket");
      this.drawerProp = false;
    },

    showCategories() {
      this.$root.$emit("evtCategories");
      this.drawerProp = false;
    },

    showBrands() {
      this.$root.$emit("evtBrands");
      this.drawerProp = false;
    },

    showDistributors() {
      this.$root.$emit("evtDistributors");
      this.drawerProp = false;
    },

    showFavProducts() {
      this.$root.$emit("evtFavProducts");
      this.drawerProp = false;
    },

    Profilclick() {
      this.$router.push("/chpsw");
    },

    UserBallsclick() {
      this.$router.push("/myball");
    },

    Supportclick() {
      this.$router.push("/support");
    },

    Aboutclick() {
      this.$router.push("/about");
    },

    LogoutClick() {
      this.drawerProp = false;
      this.$modal.show(
        DialogForm,
        {
          caption: "Информация",
          text: "Вы действительно хотите выйти из системы..."
        },
        {
          height: "auto",
          width: "300px",
          clickToClose: false
        },
        {
          closed: () => {
            let res = this.$store.getters.getDialogValue;
            if (res) {
              this.$store.dispatch("LOGOUTAC");
              this.$router.push("/login");
            }
          }
        }
      );
    }
  }
};
</script>
 