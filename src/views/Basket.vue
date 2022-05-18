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

      <v-expansion-panel freeze v-model="panel" id="basket">
        <v-expansion-panel-content v-for="dis in cartProduct" :key="dis.id">
          <template v-slot:actions>
            <div class="text-xs-center">
              <v-icon color="primary">$vuetify.icons.expand</v-icon>
            </div>
          </template>

          <template v-slot:header>
            <v-layout row wrap>
              <v-flex xs12 class="subheading text-uppercase font-weight-bold">{{dis.name}}</v-flex>

              <v-flex xs12>Kоличество : {{dis.qty}}</v-flex>
              <v-flex xs12 v-bind:class="{distributerMinTotal:dis.min_error}">
                <div v-if="isSaleDis(dis)" class="sale">скидка : {{calcSale( dis)}} сум</div>

                <div>
                  Общая сумма :
                  <span :style="checkSale(dis)">{{dis.total}} сум</span>
                  <!-- <span :style="checkSale(dis)">{{dis.total}} сум</span> -->
                </div>
              </v-flex>

              <v-flex xs12 v-bind:class="{distributerMinTotal:checkError(dis)}">
                <div class="caption">Мин-ный стоимость заказа : {{dis.min_sum}} сум</div>
              </v-flex>
              <v-flex
                xs12
                v-if="dis.sale_percentage > 0"
              >Скидка -{{dis.sale_percentage}}% на сумму : {{dis.sale_sum}} сум</v-flex>
            </v-layout>
          </template>

          <v-card>
            <v-card-actions>
              <v-layout align-center justify-space-around row wrap>
                <v-flex xs12 sm4 md3 lg3 xl2 class="flr">
                  <v-select
                    v-model="dis.type_pay"
                    :items=" getPayType(dis)"
                    item-text="name"
                    item-value="id"
                    label="Тип оплаты"
                    prepend-icon="attach_money"
                    menu-props="auto"
                    persistent-hint
                    single-line
                    @input="updateParam(dis)"
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm4 md3 lg3 xl2 class="flr">
                  <v-dialog
                    ref="dialog"
                    v-model="shipindDateDialog"
                    persistent
                    lazy
                    locale="ru"
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dis.shipdate"
                        label="Дата доставки товаров"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      scrollable
                      :title-date-format="format"
                      :allowed-dates="allowedDates"
                      v-model="dis.shipdate"
                      @input="updateParam(dis)"
                    >
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="shipindDateDialog = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="shipindDateDialog = false">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>

                <v-flex xs12 sm6 md3 lg3 xl2 class="flr">
                  <v-spacer />
                  <v-btn
                    small
                    round
                    color="success"
                    v-bind:class="[{warning: dis.min_error}]"
                    @click="btnSendOrder(dis)"
                    :loading="SendOrderLoading"
                  >Отправить заказ</v-btn>

                  <v-btn
                    small
                    round
                    color="error"
                    @click="deleteOrder(dis)"
                    :loading="SendOrderLoading"
                  >Удалить заказ</v-btn>
                  <v-spacer />
                </v-flex>
              </v-layout>
            </v-card-actions>

            <v-card-text class="grey lighten-3 pa-0">
              <v-list three-line dense>
                <template v-for="(props, index) in dis.product">
                  <v-list-tile :key="index">
                    <v-list-tile-avatar class="avatar-mr-16" tile size="60">
                      <img class="border" :src="`${url}storage/${props.image}`" />
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title class="caption">{{ props.name }}</v-list-tile-title>

                      <v-list-tile-sub-title class="text--primary">
                        <div>По цене : {{props.price}}</div>
                        <div>Общая сумма : {{ props.price * props.qty }}</div>
                        <div>количество блоке : {{props.c_type_count>1? `${props.c_type_count}`:"1"}} шт</div>
                      </v-list-tile-sub-title>

                      <v-list-tile-sub-title>
                        <v-layout align-center justify-start row>
                          <v-flex shrink>
                            <toggle-button
                              @change="tlgClick(props)"
                              :disabled="props.c_type=='block'"
                              :value="props.isBlock"
                              :width="75"
                              :height="40"
                              :labels="{unchecked: 'Штук', checked: 'Блок'}"
                              :color="{unchecked: '#43A047', checked: '#FB8C00', disabled: '#757575'}"
                            />
                          </v-flex>

                          <v-flex>
                            <BtnCounter
                              :options="getBtnCounterOption(props, dis)"
                              :isBlock="getBlockValue(props)"
                            />
                          </v-flex>
                        </v-layout>
                      </v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <!-- <v-layout align-center justify-end row> -->
                      <v-btn flex icon ripple @click="deleteProduct(dis.id, props.id)">
                        <v-icon dark color="error">delete</v-icon>
                      </v-btn>
                      <!-- </v-layout> -->
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider :key="`ol${index}`"></v-divider>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </v-content>
</template>

<script>
import staticConfig from "../utils/staticConfig";
import DialogForm from "../components/DialogForm";
import moment from "moment";
import guard from "../service/product-guard";
import BtnCounter from "../components/BtnCounter";

export default {
  data() {
    return {
      dddd: false,
      SendOrderLoading: false,
      shipindDateDialog: false,
      panel: [],
      select: {},
      curDistributer: {},
      url: staticConfig.ServerUrl
    };
  },

  components: {
    BtnCounter
  },

  watch: {
    panel() {
      const pi = this.cartProduct[this.panel];
      if (pi) {
        this.curDistributer = this.$store.getters.distributorById(pi.id);
      }
    }
  },

  methods: {
    isSaleDis(di) {
      return di.sale_sum > 0 && di.sale_sum <= di.total;
    },

    checkSale(di) {
      if (this.isSaleDis(di)) return "text-decoration:line-through";
      else return "";
    },

    calcSale(di) {
      if (this.isSaleDis(di)) {
        return di.total - Math.round((di.sale_percentage / 100) * di.total);
      } else return "";
    },

    checkError(di) {
      return (di.min_error = di.total < di.min_sum);
    },

    format(date) {
      var now = moment(date, "YYYY-MM-DD");
      moment.locale("ru");
      return now.format("dddd, DD MMMM");
    },

    allowedDates(val) {
      if (val == this.curDistributer.shipdate) {
        return true;
      } else {
        var new_date = moment().add(1, "days");
        if (moment(val, "YYYY-MM-DD") < new_date) {
          return false;
        } else {
          var weeknumber = moment(val, "YYYY-MM-DD").day();
          var res = this.curDistributer.shipdays.indexOf(weeknumber);
          return res > -1;
        }
      }
    },

    updateCounter(it, di, ci) {
      let cu = parseInt(it.qty);

      if (ci == -1 && cu == 1) return;

      cu += ci;
      it.qty = cu;
      di.total = di.product.sumDistProducts();
      di.min_error = di.total < di.min_sum;
    },

    updateQty(it, di) {
      di.total = di.product.sumDistProducts();
      di.min_error = di.total < di.min_sum;
    },

    updateParam(di) {
      di.min_error = di.total < di.min_sum;
    },

    calcDistriburetTotalSum(di) {
      di.total = di.product.sumDistProducts();
    },

    getPayType(it) {
      const di = this.$store.getters.distributorById(it.id);
      let ls = [];

      if (di["isNal"] == 1) ls.push({ id: "N", name: "Наличные" });
      if (di["isPer"] == 1) ls.push({ id: "P", name: "Перечисления" });
      if (di["isTer"] == 1) ls.push({ id: "T", name: "Терминал" });
      if (di["isKons"] == 1) ls.push({ id: "K", name: "Консигнация" });
      return ls;
    },

    deleteOrder(it) {
      this.$modal.show(
        DialogForm,
        {
          caption: "Информация",
          text: "Удалить заказ..."
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
              this.$store.dispatch("DEL_DISTRIBUT", { id: it.id });
              if (this.cartProduct.length == 0) {
                this.$router.push("/products");
              }
            }
          }
        }
      );
    },

    deleteProduct(di, pi) {
      this.$modal.show(
        DialogForm,
        {
          caption: "Информация",
          text: "Удалить товар..."
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
              this.$store.dispatch("DEL_PRODUCT", { id: pi, did: di });
              if (this.cartProduct.length == 0) {
                this.$router.push("/products");
              }
            }
          }
        }
      );
    },

    btnSendOrder(order) {
      if (order.type_pay && order.shipdate && !order.min_error) {
        this.$store
          .dispatch("SEND_ORDER", order)
          .then(() => {
            this.SendOrderLoading = false;

            if (this.cartProduct.length == 0) {
              this.ShowFormProp = false;
            }
          })
          .catch(e => {
            this.$store.dispatch("SETERROR", e);
          });
      } else {
        if (!order.type_pay) {
          this.$store.dispatch("SETERROR", "Поле -Тип оплаты- обязательное.");
          return;
        }

        if (!order.shipdate) {
          this.$store.dispatch(
            "SETERROR",
            "Поле -Дата доставки товаров- обязательное."
          );
          return;
        }

        if (order.min_error) {
          this.$store.dispatch("SETERROR", "Сумма недостаточно.");
          return;
        }
      }
    },

    tlgClick(e) {
      if (e.c_type == "block") {
        e.isBlock = true;
      } else {
        e.isBlock = !e.isBlock;
      }

      // Bloc узгарганда донаси узгаради ва кайта хисобланади
      const param = {
        id: e.id,
        qty: e.qty,
        isBlock: e.isBlock,
        c_type: e.c_type,
        c_type_count: e.c_type_count,
        distributorId: e.distributorID
      };
      this.$store.dispatch("SET_CHANGE_CTYPE", param);
    },

    getBlockValue(vi) {
      if (vi.c_type == "block") return true;
      else return vi.isBlock;
    },

    getBtnCounterOption(pi, di) {
      pi.distributorID = di.id;
      return pi;
    },

    onbtnHome() {
      this.$store.dispatch("SET_DISABLE_LOAD_PRODUCTS", true);
      this.$router.push("/products");
    }
  },

  beforeRouteEnter: guard,

  computed: {
    cartProduct: function() {
      return this.$store.getters.cart;
    }
  }
};
</script>

<style >
#basket .v-list__tile {
  height: auto !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
}

.sale {
  background-color: #4caf50;
  color: white;
  /* margin-left: 10px; */
  margin-right: 10px;
  width: fit-content;
  padding: 3px;
}

.border {
  padding: 1px;
  border-radius: 5px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
}
.distributerMinTotal {
  color: #f14821;
}

.avatar-mr-16 {
  margin-right: 16px;
}

.card-actions-bgc {
  background-color: #f5f5f5;
}

.flr {
  margin-left: 16px !important;
  margin-right: 16px !important;
}

.w150 {
  width: 150px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition-delay: 0.2s;
}
</style>
