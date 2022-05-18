
<template>
  <v-dialog
    v-model="ShowFormProp"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-toolbar card dark color="primary">
        <v-btn icon dark @click="ShowFormProp = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Карта</v-toolbar-title>

        <v-spacer/>
        <v-btn color="success" @click="btnClick">Сохранить</v-btn>
      </v-toolbar>

      <v-card-text>
        <div id="yandex-map"></div>
      </v-card-text>

      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </v-dialog>
</template>

<script>
import SysConf from "../utils/staticConfig";

export default {
  data() {
    return {
      map: null,
      geolocation: null,
      center: [41.311151, 69.279737]
    };
  },

  // latitude - 41.2925952
  // longitude - 69.2822016

  mounted() {
    // Установить скрипты для использования яндекс карты
    let scriptYandexMap = document.createElement("script");
    scriptYandexMap.setAttribute(
      "src",
      `https://api-maps.yandex.ru/2.1/?apikey=${SysConf.YandexApi}&lang=ru_RU`
    );
    document.head.appendChild(scriptYandexMap);

    // Инициализировать яндекс карту
    scriptYandexMap.addEventListener("load", () =>
      Promise.all([this.initializeYandexMap(), this.setMarkers]).then(
        this.setMarkers
      )
    );
  },

  props: {
    isShow: Boolean
  },

  methods: {
    initializeYandexMap() {
      return new Promise(r =>
        ymaps.ready(() => {
          (this.geolocation = ymaps.geolocation),
            (this.map = new ymaps.Map(
              "yandex-map",
              {
                center: [41.311151, 69.279737],
                zoom: 11
              },
              {
                searchControlProvider: "yandex#search"
              }
            ));

          this.getCurPosition();
          r();
        })
      );
    },

    getCurPosition() {
      this.geolocation
        .get({
          provider: "yandex",
          autoReverseGeocode: true,
          mapStateAutoApply: true
        })
        .then(result => {
          const cr = result.geoObjects.position;
          let placemark = new ymaps.Placemark(
            this.center,
            {
              iconContent: "здесь Я"
            },
            {
              balloonPanelMaxMapArea: 0,
              draggable: "true",
              preset: "islands#blueStretchyIcon",
              openEmptyBalloon: false
            }
          );

          this.map.geoObjects.add(placemark);

          this.$store.dispatch("SET_LOCATION", cr);
        });
    },

    getPos(e) {
      var coords = e.get("coords");
      this.location = coords;
    },

    btnClick() {
      const lo = this.$store.getters.getMyLocation;
      if (lo.length > 0) {
        this.ShowFormProp = false;
      } else {
        this.$store.dispatch("SETERROR", "Ваша местоположения не выбран.");
      }
    },

    getNativeLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position.coords);

          return position;
        });
      } else {
        console.info("geolocation is not supported in this environment");
      }
    }
  },

  computed: {
    ShowFormProp: {
      get: function() {
        return this.isShow;
      },
      set: function(v) {
        this.$emit("MapIsShow", v);
      }
    }
  }
};
</script>
 

 <style scoped>
#yandex-map {
  width: 100vw;
  height: 100vh;
}

body {
  margin: 0;
}
</style>
 