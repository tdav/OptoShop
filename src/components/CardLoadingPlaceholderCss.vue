<template>
  <v-card>
    <div class="ph-item">
      <div class="ph-col-12" style="margin-top: 20px;">
        <div class="ph-picture"></div>
        <div class="ph-row">
          <div class="ph-col-12"></div>
          <div class="ph-col-12"></div>
          <div class="ph-col-8"></div>
          <div class="ph-col-4 empty"></div>

          <div class="ph-col-4"></div>
          <div class="ph-col-8 empty"></div>
        </div>
      </div>

      <div class="ph-col-8">
        <div class="ph-row">
          <div class="ph-col-12"></div>
          <div class="ph-col-12"></div>
        </div>
      </div>

      <div class="ph-col-1">
        <div class="ph-avatar"></div>
      </div>
    </div>
  </v-card>
</template>

    
<script>
export default {};
</script>
 
 <style>
.space {
  margin-bottom: 30px !important;
}

.ph-item {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0px;
  overflow: hidden;
  margin-bottom: 30px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 2px;
}
.ph-item,
.ph-item *,
.ph-item ::after,
.ph-item ::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.ph-item::before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 50%;
  z-index: 1;
  width: 500%;
  margin-left: -250%;
  -webkit-animation: phAnimation 0.8s linear infinite;
  animation: phAnimation 0.8s linear infinite;
  background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(46%, rgba(255, 255, 255, 0)),
      color-stop(50%, rgba(255, 255, 255, 0.35)),
      color-stop(54%, rgba(255, 255, 255, 0))
    )
    50% 50%;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 46%,
      rgba(255, 255, 255, 0.35) 50%,
      rgba(255, 255, 255, 0) 54%
    )
    50% 50%;
}
.ph-item > * {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column;
  flex-flow: column;
  padding-right: 15px;
  padding-left: 15px;
}

.ph-row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-bottom: 7.5px;
}
.ph-row div {
  height: 10px;
  margin-bottom: 7.5px;
  background-color: #ced4da;
}
.ph-row .big,
.ph-row.big div {
  height: 20px;
  margin-bottom: 15px;
}
.ph-row .empty {
  background-color: rgba(255, 255, 255, 0);
}

.ph-col-1 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 6.66667%;
  flex: 0 0 6.66667%;
}

.ph-col-2 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 16.66667%;
  flex: 0 0 16.66667%;
}

.ph-col-4 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 33.33333%;
  flex: 0 0 33.33333%;
}

.ph-col-6 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
}

.ph-col-8 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 66.66667%;
  flex: 0 0 66.66667%;
}

.ph-col-10 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 83.33333%;
  flex: 0 0 83.33333%;
}

.ph-col-12 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
}

.ph-avatar {
  position: relative;
  width: 100%;
  min-width: 30px;
  background-color: #ced4da;
  margin-bottom: 15px;
  border-radius: 50%;
  overflow: hidden;
}
.ph-avatar::before {
  content: " ";
  display: block;
  padding-top: 100%;
}

.ph-picture {
  width: 100%;
  height: 120px;
  background-color: #ced4da;
  margin-bottom: 15px;
}

@-webkit-keyframes phAnimation {
  0% {
    -webkit-transform: translate3d(-30%, 0, 0);
    transform: translate3d(-30%, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(30%, 0, 0);
    transform: translate3d(30%, 0, 0);
  }
}

@keyframes phAnimation {
  0% {
    -webkit-transform: translate3d(-30%, 0, 0);
    transform: translate3d(-30%, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(30%, 0, 0);
    transform: translate3d(30%, 0, 0);
  }
}
</style>
 