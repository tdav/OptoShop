<template>
  <v-flex xs6 sm6 md4 lg3 xl2 pa-1>
    <template v-if="item.loading">
      <CardLoadingPlaceholder />
    </template>

    <template v-if="!item.loading">
      <v-card elevation="15" style=" height:'100%'" class="flexcard ch-100" hover tile>
        <v-img          
          src="/images/shkl.jpg"
          aspect-ratio="1.4"
          contain
          @click="showDetails(item, true)"
        >
          <v-layout align-start justify-space-between row fill-height>
            <SaleLabel v-model="sale"></SaleLabel>
            <FavSharingBtn v-model="item.id" class="product-favBtn" />
          </v-layout>
        </v-img>

        <v-card-title class="brand">
          <span class="grey--text">{{item.brand | isNull}}</span>
        </v-card-title>

        <v-card-text class="grow pa-2">
          <v-layout align-start justify-center column fill-height>
            <v-flex xs12 sm12 md12 pb-0>
              <div class="product-name">
                <a @click="showDetails(item, true)">{{item.name}}</a>
              </div>
            </v-flex>
            <v-flex xs12 sm12 md12 pt-1>
              <span class="product-price">{{ item.price}} сум</span>
              <span class="caption">{{getBlockText()}}</span>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <toggle-button
            v-if="item.c_type_count>1"
            @change="tlgClick"
            :disabled="item.c_type=='block'"
            :value="isBlock"
            :width="75"
            :height="40"
            :labels="{unchecked: 'Штук', checked: 'Блок'}"
            :color="{unchecked: '#43A047', checked: '#FB8C00', disabled: '#757575'}"
          />
          <v-spacer></v-spacer>
          <BtnCounter :options="item" :isBlock="getBlockValue()" />
        </v-card-actions>
      </v-card>
    </template>
  </v-flex>
</template>

<script>
import staticConfig from "../utils/staticConfig";
import BtnCounter from "../components/BtnCounter";
import ProductDetails from "../views/ProductDetails";
import FavSharingBtn from "../components/FavSharingBtn";
import SaleLabel from "../components/SaleLabel";
import CardLoadingPlaceholder from "./CardLoadingPlaceholderCss";

export default {
  data() {
    return {
      sale: 0,
      isBlock: true,
      isProductBlock: false,
      serverUrl: staticConfig.ServerUrl
    };
  },

  components: {
    CardLoadingPlaceholder,
    BtnCounter,
    SaleLabel,
    FavSharingBtn
  },

  props: {
    item: {}
  },

  filters: {
    isNull: function(value) {
      if (!value) return "-";
      else return value;
    }
  },

  created() {
    this.isBlock = this.item.c_type == "block";
    const p = this.$store.getters.getProductById(this.item.id);
    if (p) this.isBlock = p.isBlock;

    this.SalaCalc();
  },

  methods: {
    SalaCalc() {
      if (this.item.real_price != this.item.price) {
        this.sale =
          100 - Math.round((this.item.price * 100) / this.item.real_price, 2);
      } else {
        this.sale = 0;
      }
    },

    tlgClick(e) {
      if (this.item.c_type == "block") this.isProductBlock = true;
      else this.isBlock = e.value;
    },

    getBlockValue() {
      if (this.item.c_type == "block") {
        return (this.isProductBlock = true);
      } else {
        return this.isBlock;
      }
    },

    showDetails(it, oi) {
      let w = window.screen.width;
      let ws = "350px";
      if (w > 700) ws = "750px";

      this.$modal.show(
        ProductDetails,
        {
          item: it,
          onlyImage: oi
        },
        {
          height: "auto",
          width: ws,
          clickToClose: true
        }
      );
    },

    getBlockText() {
      return this.item.c_type_count > 1
        ? ` блоке ${this.item.c_type_count} шт`
        : "";
    },

    onCardMouseover() {
      this.isActionVisible = true;
    },

    onCardMouseout() {
      this.isActionVisible = false;
    }
  }
};
</script>

<style>
.product-img {
  z-index: 1;
}

.product-favBtn {
  z-index: 2;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .product-name {
    height: 70px;
    font-size: 12px;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media only screen and (min-device-width: 481px) and (max-device-width: 3480px) {
  .product-name {
    height: 70px;
  }
}

.v-text-field--box .v-input__slot,
.v-text-field--outline .v-input__slot {
  min-height: 40px !important;
}

.mt-star {
  top: 15px !important;
}

.flexcard {
  display: flex;
  flex-direction: column;
}

.price-bloc {
  margin-top: 10px;
  display: inline-block;
  vertical-align: bottom;
}

.product-caption {
  align-self: center;
  margin-right: 10px;
}

.product-price {
  font-weight: 400 !important;
  color: red;
}

.product-title {
  padding-bottom: 0px !important;
}

.brand {
  font-size: 12px !important;
  padding-top: 16px;
  padding-bottom: 0px !important;
}

.product-card-title {
  padding-top: 10px;
  padding-bottom: 0px;
  padding-bottom: 0px !important;
}

.product-actions {
  padding-top: 0px !important;
}

.col {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.btn-favorite1 {
  padding-left: 30px !important;
}

.btn-add-card {
  padding-left: 0px !important;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>

 