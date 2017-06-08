<template lang="html">
  <el-row :gutter="20" type="flex" class="row-bg" justify="center">
    <el-col :span="14">
      <div class="grid-content">
        <div style="margin-top: 15px;">
          <el-input placeholder="Please input" v-show="statusLogin">
            <el-button slot="append" icon="search"></el-button>
          </el-input>
          <!-- <el-input
            placeholder="Please input"
             v-show="statusLogin == null">
            <el-button slot="append" icon="search"></el-button>
          </el-input> -->
        </div>
        <p style="color:navy;text-align:-webkit-auto">List of Item</p>
        <hr style="border-color:white;">
        <!-- <div v-for="(question, index) in dataQuestions" :key="index">
          <el-row>
            <el-col :span="2">
              <div class="mini-counts">
                <span>{{question.voteCounts}}</span>
              </div>
              <div class="teks-bawah">votes</div>
            </el-col>
            <el-col :span="2">
              <div class="mini-counts">
                <span>{{question.answerCounts}}</span>
              </div>
              <div class="teks-bawah">answers</div>
            </el-col>
            <el-col :span="18" style="text-align:-webkit-auto;margin-left:10px;">
              <h3 style="color:#005999;font-weight:400;margin:0px;" @click="viewDetail(index)">{{question.title}}</h3>
              <el-tag style="margin-right:5px" type="primary" v-for="(tag, index) in question.tags" :key="index">{{tag}}</el-tag>
              <span class="teks-bawah">asked {{question.createdDate}} by <b>{{question.askedBy.name}}</b></span>
            </el-col>
          </el-row>
          <hr style="border-color:white;">
        </div> -->
      </div>
      <DetailItem v-show="displayDetailItem"></DetailItem>

    </el-col>
    <el-col :span="6">
      <div class="grid-content">
        <div style="margin-top: 15px;text-align:-webkit-auto;">
          <p style="color:navy;">List of tems</p>
          <el-tag style="margin:0px 5px 5px 0px;" type="gray">judul item</el-tag>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import DetailItem from './DetailItem'

export default {
  name: 'content',
  components: {
    DetailItem
  },
  data() {
    return {
      displayListItem: true,
      displayDetailItem: false
    }
  },
  methods: {
    viewDetail(index) {
      console.log('Ini content');
      this.displayListItem = false
      this.displayDetailItem = true
    }
  },
  computed: {
    ...mapGetters({
      statusLogin: 'isLogin'
    })
  }
}
</script>

<style lang="css">
</style>
