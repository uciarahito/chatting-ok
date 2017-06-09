<template lang="html">
  <el-row :gutter="20" type="flex" class="row-bg" justify="center">
    <el-col :span="15">
      <div class="grid-content">
        <div style="margin-top:15px;text-align:-webkit-auto;" class="teks-bawah">
          <span style="color:blue;" @click="backToContent">homepage</span>&nbsp;&nbsp;<span>/</span>&nbsp;&nbsp;<span>detail item</span>
        </div>
        <hr style="border-color:white;">
        <el-row style="margin-right:0px;">
          <el-card :body-style="{ padding: '10px' }" style="height:auto;">
            <h1 style="font-size:22px;font-weight:500;color:navy;margin:0px;">{{detailitem.name}}</h1>
            <hr style="border-color:white;">
            <el-row :gutter="24" style="margin-top:20px;">
              <el-col :span="10">
                <div>
                  <el-carousel height="250px" width="250px">
                    <el-carousel-item v-for="(image, index) in detailitem.images" :key="index" style="text-align:center;">
                      <img :src="image" alt="logo item" style="width:300px;height:300px;">
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </el-col>
              <el-col :span="14">
                <el-card :body-style="{ padding: '10px' }" style="height:auto;">
                  <el-row>
                    <p style="float:left;margin:10px 0px;"><b>ID: {{detailitem.id}}</b></p>
                    <p style="float:right;margin:0px;">Share: <el-button type="primary" icon="share" v-on:click.prevent="postFB">Facebook</el-button></p>
                  </el-row>
                  <hr style="border-color:white;">
                  <p><b>Bids: 0</b></p>
                  <hr style="border-color:white;">
                  <p><b>Kondisi: <span v-if="detailitem.condition == 'new'">Baru</span><span v-else>Bekas</span></b></p>
                  <hr style="border-color:white;">
                  <p><b>Seller Name: {{detailitem.seller_name}}</b></p>
                  <hr style="border-color:white;">
                  <el-row>
                    <el-tag type="danger" style="font-size:25px;margin-top:0px;">Harga Sementara</el-tag>&nbsp;&nbsp;&nbsp;
                    <span style="font-size:25px;"><b>{{detailitem.price}}</b></span>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
            <hr style="border-color:white;">
            <el-row>
              <el-card class="box-card" style="height:auto;">
                <div slot="header" class="clearfix">
                  <span style="font-size:15px;color:#fff;font-weight:400px;">DESCRIPTION</span>
                </div>
                {{detailitem.desc}}
                <br>
                <p>Kondisi:</p>
                {{detailitem.seller_term_condition}}
              </el-card>
            </el-row>
          </el-card>
        </el-row>

      </div>

    </el-col>
    <el-col :span="7">
      <div class="grid-content">
        <div style="margin-top:15px;text-align:-webkit-auto;">
          <p style="color:navy;">Waktu berjalan</p>
          <el-button type="warning">Start Bid</el-button>
          <p>List semu bids</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>

window.fbAsyncInit = function() {
  FB.init({
    appId      : '413434489050147',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
    console.log(response);
  });

};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function postFacebook(status) {
  FB.api('/me/feed', 'post', {message: status}, function(response) {
    console.log(response)
    // document.getElementById('status').innerHTML = window.localStorage.getItem('id');
  });
}

export default {
  name: 'detailitem',
  props: ['detailitem'],
  data() {
    return {
      isi: 'testing post to fb from app cuyy'
    }
  },
  methods: {
    backToContent() {
      window.location.href = "/"
    },
    postFB: function() {
      console.log(this.isi);
      let dataTeks = ''+this.isi
      postFacebook(dataTeks)
    }
  }
}
</script>

<style lang="css">
  .teks-bawah {
    font-size: 85%;
    color: #848d95;
  }

  .el-card {
    margin: 0px;
    padding-top: 0px;
  }

  .el-carousel__item:nth-child(n) {
    background-color: #848d95;
  }

  .el-card__header {
    background-color:#324157;
  }

</style>
