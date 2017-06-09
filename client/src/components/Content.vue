<template lang="html">
  <div>
    <el-row :gutter="20" type="flex" class="row-bg" justify="center" v-show="displayListItem">
      <el-col :span="17">
        <div class="grid-content">
          <div style="margin-top:15px;">
            <el-input placeholder="Please input" v-show="statusLogin" v-model="keyword">
              <el-button slot="append" icon="search" @click="onSearchByParam"></el-button>
            </el-input>
          </div>
          <p style="color:navy;text-align:-webkit-auto">List of Items</p>
          <hr style="border-color:white;">
          <el-row style="margin-right:0px;">
            <el-col :span="7" v-for="(item, index) in dataItems" :key="item.id" :offset="index > 0 ? 3 : 0" style="margin:0px 30px 20px 0px;">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="item.images[0]" class="image">
                <div style="padding: 14px;">
                  <span v-if="item.name.length >= 50" @click="viewDetail(index)">{{ item.name.slice(0, 25) }}...</span>
                  <span v-else @click="viewDetail(index)"><b>{{item.name}}</b></span>
                  <br>
                  <el-row style="margin:10px 0px 0px 0px;">
                    <span class="mini-title">{{ item.price }}</span>
                    <el-button type="success" size="mini" :loading="true" style="float:right">Lelang</el-button>
                  </el-row>

                  <hr style="border-color:white;">
                  <div class="bottom clearfix">
                    <img src="https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png" alt="Person" style="width:13px;height:13px;"><span style="font-size:95%;color:#848d95;"> {{item.seller_name}}</span><br>
                    <el-col style="margin-top:5px;">
                      <span class="teks-bawah">stock: {{item.stock}}</span>
                      <span class="teks-bawah" style="float:right">condition: {{item.condition}}</span>
                    </el-col>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <div style="margin-top:15px;text-align:-webkit-auto;">
            <p style="color:navy;">List of items</p>
            <el-tag style="margin:0px 5px 5px 0px;" type="gray">judul item</el-tag>
          </div>
        </div>
      </el-col>
    </el-row>
    <DetailItem v-show="displayDetailItem" :detailitem="content"></DetailItem>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DetailItem from './DetailItem'

export default {
  name: 'content',
  components: {
    DetailItem
  },
  data() {
    return {
      displayListItem: true,
      displayDetailItem: false,
      currentDate: new Date(),
      keyword: '',
      content: []
    }
  },
  methods: {
    viewDetail(index) {
      this.content = this.dataItems[index]
      console.log('Ini content');
      console.log(this.content);
      this.displayListItem = false
      this.displayDetailItem = true
    },
    onSearchByParam() {
      alert(this.keyword)
      this.$store.dispatch('dataItemByParam', keyword)
    }
  },
  computed: {
    ...mapGetters({
      statusLogin: 'isLogin'
    }),
    dataItems() {
      return this.$store.state.dataItems
    }
  },
  created() {
    this.$store.dispatch('dataItems')
  }
}
</script>

<style lang="css">
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 250px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

  .el-card {
    height: 400px;
  }

  .mini-title {
    font-size: 17px;
    font-weight: 300;
    color: #6a737c;
  }

  .teks-bawah {
    font-size: 85%;
    color: #848d95;
  }

</style>
