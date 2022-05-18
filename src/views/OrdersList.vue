<template>
  <v-content>
    <v-container fluid>
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

      <template v-if="orderList">
        <v-expansion-panel v-model="panel" id="orders">
          <v-expansion-panel-content v-for="order in orderList" :key="order.id">
            <template v-slot:header>
              <v-layout row wrap>
                <v-flex xs12>
                  <div
                    :style="getColor(order.status_options.color)"
                    class="clip-width"
                  >{{order.status_options.title}}</div>
                </v-flex>
                <v-flex xs12 class="subheading font-weight-bold">{{order.distributor.name}}</v-flex>
                <v-flex xs12>
                  <div>Номер заказа - {{order.id}}</div>
                  <div>Дата доставки - {{order.shipdate}}</div>
                </v-flex>
                <v-flex xs12>Общая сумма - {{order.total}} сум</v-flex>
              </v-layout>
            </template>

            <v-card>
              <v-card-actions v-if="isShowBtns(order.status_options.status)">
                <v-spacer/>
                <v-btn
                  small
                  round
                  color="success"
                  :loading="SendOrderLoading"
                  @click="btnAccept(order)"
                >Принять</v-btn>
                <v-btn
                  small
                  round
                  color="error"
                  :loading="SendOrderLoading"
                  @click="btnCancel(order)"
                >Отменить</v-btn>
                <v-spacer/>
              </v-card-actions>

              <v-card-text class="grey lighten-3 pa-2">
                <v-list two-line>
                  <template v-for="(props, index) in products">
                    <v-list-tile :key="index" ripple>
                      <v-list-tile-avatar class="avatar-mr-16" tile size="60">
                        <img :src="`${url}storage/${props.product.image}`">
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title>{{ props.product.name }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">
                          <div>По цене {{props.product.price}}</div>
                          <div>Общая сумма {{ props.product.price * props.qty }}</div>
                        </v-list-tile-sub-title>
                        <v-list-tile-sub-title>количество {{ props.qty }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="`ol${index}`"></v-divider>
                  </template>
                </v-list>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </template>

      <template v-else>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs10 sm6 md4 lg3 xl2>
              <div style="text-align: center">
                <v-img
                  :src="require('../assets/image/product_notfound.png')"
                  aspect-ratio="2"
                  contain
                ></v-img>

                <div
                  style="margin: 0 auto; text-align: center"
                  class="title grey--text"
                >Заказы не найдены</div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </v-container>
  </v-content>
</template>


<script>
import staticConfig from "../utils/staticConfig";

export default {
  data() {
    return {
      panel: [],
      SendOrderLoading: false,
      url: staticConfig.ServerUrl
    };
  },

  watch: {
    panel() {
      const pi = this.orderList[this.panel];

      if (pi) {
        this.$store.dispatch("GET_PRODUCTS_FROM_ORDER", pi.id);
      }
    }
  },

  props: {
    isShow: Boolean
  },

  methods: {
    onbtnHome() {
      this.$store.dispatch("SET_DISABLE_LOAD_PRODUCTS", true);
      this.$router.push("/products");
    },

    isShowBtns(it) {
      return it == "accept_adjustment" || it == "delivered";
    },

    getColor(it) {
      return `backgroundColor: #${it}`;
    },

    async btnAccept(o) {
      if (o.status_options.status == "accept_adjustment") {
        const res = await this.$store.dispatch(
          "SET_ORDER_ACCEPT_ADJUSTMENT",
          o.id
        );
        this.$store.dispatch("SET_MES", res.data.msg);
        this.$store.dispatch("GETORDERLIST");
      }

      if (o.status_options.status == "delivered") {
        const res = await this.$store.dispatch("SET_ORDER_DELIVERED", o.id);
        this.$store.dispatch("SET_MES", res.data.msg);
        this.$store.dispatch("GETORDERLIST");
      }
    },

    async btnCancel(o) {
      const res = await this.$store.dispatch("SET_ORDER_CANCEL", o.id);
      if (res.data.msg) {
        this.$store.dispatch("SET_MES", res.data.msg);
        this.$store.dispatch("GETORDERLIST");
      }
    }
  },

  computed: {
    orderList: function() {
      return this.$store.getters.orders;
    },

    products: function() {
      return this.$store.getters.productsFromOrder;
    },

    ShowFormProp: {
      get: function() {
        return this.isShow;
      },
      set: function(v) {
        this.$emit("PersonCardListIsShow", v);
      }
    }
  }
};
</script>

<style>
#orders .v-list__tile {
  height: auto !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
}

.avatar-mr-16 {
  margin-right: 16px;
}

.status-txt {
  width: 125px;
}

.status-mes {
  position: absolute;
  top: -1px;
  right: -1px;
}

.clip-width {
  border: 1px solid #e0e0e0;
  padding: 5px 10px 5px 10px;
  height: 30px;
  text-align: center;
  color: white;
}
</style>
