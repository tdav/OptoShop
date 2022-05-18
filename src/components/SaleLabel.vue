<template>
  <v-flex xs12 sm6>
    <div v-if="value>0" class="salelb error">-{{value}}%</div>
  </v-flex>
</template>

 <script>
import Share from "../service/share";

export default {
  props: ["value"]
};
</script>
 

<style>
.salelb {
  width: 50px;
  height: 1.5rem;
  padding-left: 5px;
  margin-top: 5px;
  border-radius: 0 0.875rem 0.875rem 0;
  color: antiquewhite;
  font-size: 15px;
}
</style>
 