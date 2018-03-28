<template>
  <div>
    <div class="news-list-wrapper">
      <div class="news-list">
        <ul>
          <li v-for="(item,index) in newsList" :key="index">
            <a class="news-item clear" href="javascript:;" @click="detail(item.id)">
              <img class="news-item-img" :src="item.path"/>
              <div class="news-item-main">
                <h4 class="news-item-title">{{item.title}}</h4>
                <div class="news-item-indro">{{item.indro}}</div>
              </div>
            </a> 
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
let newsList = [
  {id:'545',img:'',title:'标题标题',indro:'一些文字介绍，一些文字介绍，一些文字介绍，'},
  {id:'2343',img:'',title:'标题标题',indro:'一些文字介绍，一些文字介绍，一些文字介绍，'}
]
export default {
  data () {
    return {
      newsList
    }
  },
  methods:{
    detail(id) {
      this.$router.push({
        path:'/news/detail',
        query:{
          id
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .news-list-wrapper {
    padding: 20px;
  }
  .news-list {
  }
  .news-item {
    color: #333;
    display: block;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    .news-item-img {
      width: 100px;
      height: 100px;
      float: left;
      vertical-align: top;
    }
    .news-item-main {
      padding-left: 120px;
      height: 100px;
    }
    .news-item-title {

    }
    .news-item-indro {
      color: #999;
      line-height: 1.5em;
      padding-top: 10px;
    }
  }
</style>
