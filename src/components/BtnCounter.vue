<template>
  <div>
    <v-container fluid style="padding:10px">
      <div class="btnClick">
        <v-layout v-if="!showCounter" row>
          <v-flex shrink pa-0>
            <v-btn outline round color="red" @click="btnClick" class="btn-cart">
              <v-icon color="red">shopping_cart</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>

      <div class="btnCounter">
        <v-layout v-if="showCounter" align-center row>
          <v-flex shrink pa-0>
            <v-btn small @click="btnCounter(-1)" color="warning" class="btn1">
              <v-icon small dark>remove</v-icon>
            </v-btn>
          </v-flex>

          <v-flex shrink pa-0>
            <input id="edcounter" v-model="content" @input="changeCounter" />
          </v-flex>

          <v-flex shrink pa-0>
            <v-btn small @click="btnCounter(1)" color="warning" class="btn2">
              <v-icon small dark>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["options", "isBlock"],

  data() {
    return {
      content: 0,
      product: {},
      showCounter: false
    };
  },

  mounted() {
    this.calcValues();
    const it = this.options;
  },

  methods: {
    btnCounter(c) {
      this.showCounter = true;

      let cu = parseInt(this.content);
      if (c == -1 && cu == 1) return;

      let qty = 0;

      if (this.isBlock) {
        if (c == 1) {
          qty = cu * this.options.c_type_count + this.options.c_type_count;
        } else {
          qty = cu * this.options.c_type_count - this.options.c_type_count;
        }
      } else {
        qty = cu + c;
      }

      let distributorID = -1;
      if (this.options.distributor) {
        distributorID = this.options.distributor.id;
      } else {
        distributorID = this.options.distributorID;
      }

      const dis = this.$store.getters.distributorById(distributorID);
      const total_price = this.options.price * qty;

      const param = {
        id: this.options.id,
        qy: qty,
        productName: this.options.name,
        price: this.options.price,
        to: total_price,
        isBlock: this.isBlock,
        image: this.options.image,
        c_type: this.options.c_type,
        c_type_count: this.options.c_type_count,
        distributor: dis
      };

      this.$store.dispatch("ADD_PRODUCT", param);
      this.calcValues();
    },

    btnClick() {
      this.isShowBtn = !this.isShowBtn;
      this.btnCounter(1);
    },

    calcValues() {
      this.product = this.$store.getters.getProductById(this.options.id);

      if (this.product) {
        if (this.isBlock) {
          this.content = this.product.qty / this.options.c_type_count;
        } else {
          this.content = this.product.qty;
        }

        this.showCounter = true;
      } else {
        this.showCounter = false;
      }
    },

    changeCounter(e, p) {
      let cu = parseInt(this.content);

      if (isNaN(cu)) cu = 1;

      let qty = 0;
      if (this.isBlock) {
        qty = cu * this.options.c_type_count;
      } else {
        qty = cu;
      }

      let distributorID = -1;
      if (this.options.distributor) {
        distributorID = this.options.distributor.id;
      } else {
        distributorID = this.options.distributorID;
      }

      const dis = this.$store.getters.distributorById(distributorID);
      const total_price = this.options.price * qty;

      const param = {
        id: this.options.id,
        qy: qty,
        productName: this.options.name,
        price: this.options.price,
        to: total_price,
        isBlock: this.isBlock,
        image: this.options.image,
        c_type: this.options.c_type,
        c_type_count: this.options.c_type_count,
        distributor: dis
      };

      this.$store.dispatch("ADD_PRODUCT", param);
      this.calcValues();
    }
  }
};
</script>


<style >
.btn-cart {
  min-width: 75px !important;
  height: 40px !important;
}

.btnCounter .v-text-field {
  padding-top: 8px !important;
  margin-top: 0px !important;
}

#edcounter {
  width: 27px;
  text-align: center !important;
  padding-top: 0px !important;
}

.btn1 {
  border-radius: 50px 5px 0px 50px !important;
  -moz-border-radius: 50px 5px 0px 50px !important;
  -webkit-border-radius: 50px 5px 0px 50px !important;

  margin-right: 0px !important;
  padding-right: 0px !important;
  min-width: 20px !important;
  height: 38px !important;
}

.btn2 {
  border-radius: 0px 50px 50px 0px !important;
  -moz-border-radius: 0px 50px 50px 0px !important;
  -webkit-border-radius: 0px 50px 50px 0px !important;

  margin-left: 0px !important;
  padding-left: 0px !important;
  min-width: 20px !important;
  height: 38px !important;
}

.btn1 .v-btn--small {
  font-size: 13px;
  height: 38px;
  padding: 0 8px;
}
</style>
