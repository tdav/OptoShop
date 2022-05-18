<template>
  <v-layout wrap>
    <v-navigation-drawer right width="380" v-model="drawerProp" fixed temporary>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-toolbar dark>
              <v-btn flat icon @click="drawerProp=false">
                <v-icon>navigate_before</v-icon>
              </v-btn>
              <v-toolbar-title v-if="searchIcon!='check'">Поставщики</v-toolbar-title>

              <v-spacer></v-spacer>
              <v-text-field
                dark
                autofocus
                ref="edValue"
                v-if="searchIcon=='check'"
                v-model="searchValue"
                placeholder="Поиск"
                type="text"
                style="width: 100px !important;"
              ></v-text-field>
              <v-spacer></v-spacer>

              <v-btn :color="btncolor" fab small dark @click="btnSearch">
                <v-icon>{{searchIcon}}</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list two-line>
              <template v-for="(item, index) in filteredList">
                <v-list-tile :key="item.id" avatar @click="selectItem(item)">
                  <v-list-tile-avatar>
                    <myimg
                      :url="`${serverUrl}storage/${item.image}`"
                      :errorurl="`https://cdn.vuetifyjs.com/images/cards/sunshine.jpg`"
                    />
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.name"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="index + 1 < filteredList.length" :key="`B${index}`"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import staticConfig from "../../utils/staticConfig";
import myimg from "../../components/Image";

export default {
  props: {
    isShow: Boolean
  },

  components: { myimg },

  mounted() {
    this.$store.dispatch("GET_SUBCATEGORIES");
  },

  computed: {
    filteredList() {
      const sp = this.searchValue.toLowerCase();
      if (sp == "") {
        return this.items;
      } else
        return this.items.filter(item => {
          const s = item.name.toLowerCase();
          return s.indexOf(sp) > -1;
        });
    },

    drawerProp: {
      get: function() {
        return this.isShow;
      },
      set: function(v) {
        this.$emit("DrawerIsShow", v);
      }
    },

    items: function() {
      return this.$store.getters.distributors;
    }
  },

  data() {
    return {
      searchIcon: "search",
      btncolor: "error",
      serverUrl: staticConfig.ServerUrl,
      searchValue: ""
    };
  },

  methods: {
    selectItem(item) {
      this.$store.dispatch("GET_PRODUCTLIST_BYPARAM", `distributor=${item.id}`);
      this.$router.push("/products");
      this.$emit("DrawerIsShow", false); // close drawer
    },

    btnSearch() {
      if (this.searchIcon == "search") {
        this.searchIcon = "check";
        this.searchValue = "";
        this.btncolor = "info";
      } else {
        this.btncolor = "error";
        this.searchIcon = "search";
      }
    }
  }
};
</script>