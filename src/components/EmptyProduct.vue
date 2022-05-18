<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs10 sm6 md4 lg3 xl2>
        <div style="text-align: center">
          <v-img :src="require('../assets/image/product_notfound.png')" aspect-ratio="2" contain></v-img>

          <div style="margin: 0 auto; text-align: center" class="title grey--text">Продукт не найден</div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>