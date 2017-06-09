<template lang="html">
  <el-row :gutter="20" type="flex" class="row-bg" justify="center">
    <el-col :span="15">
      <div class="grid-content">
        <div style="margin-top:15px;text-align:-webkit-auto;" class="teks-bawah">
          <span style="color:blue;" @click="backToContent">homepage</span>&nbsp;&nbsp;<span>/</span>&nbsp;&nbsp;<span>detail item</span>
        </div>
        <!-- {{dataPasti}} -->
        <hr style="border-color:white;">
        <el-row style="margin-right:0px;">
          <el-card :body-style="{ padding: '10px' }" style="height:auto;">
            <h1 style="font-size:22px;font-weight:500;color:navy;margin:0px;">{{dataPasti.name}}</h1>
            <hr style="border-color:white;">
            <el-row :gutter="24" style="margin-top:20px;">
              <el-col :span="10">
                <div>
                  <el-carousel height="250px" width="250px">
                    <el-carousel-item v-for="(image, index) in dataPasti.images" :key="index" style="text-align:center;">
                      <img :src="image" alt="logo item" style="width:300px;height:300px;">
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </el-col>
              <el-col :span="14">
                <el-card :body-style="{ padding: '10px' }" style="height:auto;">
                  <el-row>
                    <p style="float:left;margin:10px 0px;"><b>ID: {{dataPasti.id}}</b></p>
                    <p style="float:right;margin:0px;">Share: <el-button type="primary" icon="share" v-on:click.prevent="postFB">Facebook</el-button></p>
                  </el-row>
                  <hr style="border-color:white;">
                  <p><b>Bids: 0</b></p>
                  <hr style="border-color:white;">
                  <p><b>Kondisi: <span v-if="dataPasti.condition == 'new'">Baru</span><span v-else>Bekas</span></b></p>
                  <hr style="border-color:white;">
                  <p><b>Seller Name: {{dataPasti.seller_name}}</b></p>
                  <hr style="border-color:white;">
                  <el-row>
                    <el-tag type="danger" style="font-size:25px;margin-top:0px;">Harga Sementara</el-tag>&nbsp;&nbsp;&nbsp;
                    <span style="font-size:25px;"><b>{{dataPasti.price}}</b></span>
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
                {{dataPasti.desc}}
                <br>
                <p>Kondisi:</p>
                {{dataPasti.seller_term_condition}}
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
          <p id="demo"></p>
          <p>List semua bids</p>
          <!-- <p>{{userActive}} : {{idItemFirebase[0]['.value']}}</p> -->
          <p>{{userActive}}</p>
          <!-- <p v-for="list in list_chat_harga">{{userActive}}: {{list}}</p> -->
          <input type="number" v-model="dataPasti.price">
          <button type="button" @click="tambahHarga">Tambah Harga</button>
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

var d1 = new Date (),
d2 = new Date (d1);
d2.setMinutes (d1.getMinutes() + 5);
// console.log(new Date(d2).getTime())
var countDownDate = new Date(d2).getTime();
// var countDownDate = new Date("Jun 9, 2017 12:00:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("demo").innerHTML = days + " d " + hours + " h " + minutes + " m " + seconds + " s ";
  // this.waktujalan = days + " d " + hours + " h " + minutes + " m " + seconds + " s "
  if (distance < 0) {
    clearInterval(x);
    console.log('ini app dari waktu',this, app);
    app.berlaku = false
    document.getElementById("demo").innerHTML = "EXPIRED";
    app.waktujalan = 'EXPIRED'
  }
}, 1000);

export default {
  name: 'detailitem',
  props: ['id'],
  data() {
    return {
      isi: 'testing post to fb from app cuyy',
      berlaku: true,
      hargaTawaran: 0,
      list_chat_harga: [],
      detailitem: {},
      idItem: this.$route.params.id,
      waktujalan: '',
      dataPasti: {},
      userActive: ''
    }
  },
  firebase () {
    return {
      idItemFirebase: this.$db.ref(this.$route.params.id)
    }
  },
  methods: {
    backToContent() {
      this.$router.push('/')
      // window.location.href = "/"
    },
    postFB: function() {
      console.log(this.isi);
      let dataTeks = ''+this.isi
      postFacebook(dataTeks)
    },
    tambahHarga(){
      console.log('list hargaaaaa');
      console.log(this.list_chat_harga);
      let self = this;
      let ujung = this.list_chat_harga.length
      if(ujung == 0 && this.berlaku == true){
        console.log('****+++***');
        this.$db.ref(this.idItem).set({
          username: window.localStorage.getItem('user'),
          harga: this.dataPasti.price
        })
        this.hargaTawaran = 0

        // firebase.database().ref(this.id).set({
        //   harga:parseInt(this.hargaTawaran)
        // });
      } else if(self.list_chat_harga[ujung-1]<self.hargaTawaran && self.berlaku == true){
        // firebase.database().ref(this.id).set({
        //   username: window.localStorage.getItem('user'),
        //   harga:parseInt(this.hargaTawaran)
        // });
        // this.hargaTawaran = 0
        this.$db.ref(this.idItem).set({
          username: window.localStorage.getItem('user'),
          harga: self.hargaTawaran
        })
        self.hargaTawaran = 0
      } else if(self.berlaku == true) {
        alert('tawaran tidak bisa lebih kecil')
        self.hargaTawaran = 0
      } else {
        alert('waktu habis')
        self.hargaTawaran = 0
      }
    },
    tambahListHarga(harga){
      this.list_chat_harga.push(harga)
    }
  },
  created() {
    let self = this
    this.userActive = window.localStorage.getItem('user')
    console.log('ID: ');
    console.log(this.id);
    this.$store.state.dataItems.filter(detail => {
      if (detail.id == self.id) {
        console.log('vvvvvvvvvv');
        console.log(detail);
        this.dataPasti = detail
      }
    })
    console.log(this.dataPasti);
    console.log(this.dataPasti.seller_name);

    this.list_chat_harga.push(this.idItemFirebase)

    // console.log('pussssssss');
    // console.log(this.idItemFirebase);
    // var starCountRef = idItemFirebase.child('harga');
    // starCountRef.on('value', function(snapshot) {
    //   if(snapshot.val() != '0'){
    //       console.log('hasil ==============',snapshot.val());
    //       this.tambahListHarga(snapshot.val())
    //   }
    // });

    // var d1 = new Date (),
    // d2 = new Date ( d1 );
    // d2.setMinutes ( d1.getMinutes() + 5 );
    // console.log(new Date(d2).getTime())

    // var countDownDate = new Date(d2).getTime();
    // var x = setInterval(function() {
    //   var now = new Date().getTime();
    //   var distance = countDownDate - now;
    //   console.log('countDownDate: ', countDownDate);
    //   console.log('now: ', now);
    //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //   // document.getElementById("demo").innerHTML = days + " d " + hours + " h " + minutes + " m " + seconds + " s ";
    //   this.waktujalan = days + " d " + hours + " h " + minutes + " m " + seconds + " s "
    //   if (distance < 0) {
    //     clearInterval(x);
    //     // console.log('ini app dari waktu',this, app);
    //     this.berlaku = false
    //     // document.getElementById("demo").innerHTML = "EXPIRED";
    //     this.waktujalan = 'EXPIRED'
    //   }
    // }, 1000);
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
