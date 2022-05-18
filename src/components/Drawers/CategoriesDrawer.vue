<template>
  <v-layout wrap>
    <v-navigation-drawer right width="380" v-model="drawerProp" fixed temporary>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-toolbar dark>
              <v-btn flat icon @click="onClick">
                <v-icon>{{btnIcon}}</v-icon>
              </v-btn>
              <v-toolbar-title v-if="searchIcon!='check'">Категории</v-toolbar-title>

              <v-spacer></v-spacer>
              <v-text-field
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

            <v-list three-line>
              <template v-for="(item, index) in filteredList">
                <v-list-tile avatar ripple :key="item.id" @click="selectItem(item)">
                  <v-list-tile-avatar>
                    <myimg
                      :url="`${serverUrl}storage/${item.image}`"
                      :errorurl="`https://cdn.vuetifyjs.com/images/cards/sunshine.jpg`"
                    />
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-sub-title>{{item.name}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action class="pa-0">
                    <v-icon>keyboard_arrow_right</v-icon>
                  </v-list-tile-action>
                </v-list-tile>

                <v-divider v-if="index + 1 < filteredList.length" :key="`D${index}`"></v-divider>
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
  components: { myimg },

  props: {
    isShow: Boolean
  },

  data() {
    return {
      searchIcon: "search",
      btncolor: "error",
      serverUrl: staticConfig.ServerUrl,
      btnIcon: "navigate_before",
      searchValue: "",
      parent_id: 0,
      level: 0
    };
  },

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

    items: {
      get: function() {
        if (this.level == 0) {
          return this.$store.getters.categoriesList;
        } else {
          return this.$store.getters.subCategoriesByParentId(this.parent_id);
        }
      }
    }
  },

  methods: {
    onClick() {
      if (this.btnIcon === "navigate_before") {
        this.btnIcon = "arrow_upward";
        this.$router.push("/products");

        this.$emit("DrawerIsShow", false); // close drawer
      } else {
        this.level = 0;
        this.btnIcon = "navigate_before";
      }
    },

    selectItem(item) {
      if (!item.child) {
        this.$store.dispatch("GET_PRODUCTLIST_BYPARAM", `category=${item.id}`);
        this.$router.push("/products");
        this.$emit("DrawerIsShow", false);
      } else {
        this.level = 1;
        this.btnIcon = "arrow_upward";
        this.parent_id = item.id;
      }
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


 