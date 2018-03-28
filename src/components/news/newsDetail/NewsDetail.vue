<template>
  <div class="news-detail">
    <div>
      <h4 class="text-center news-detail-title">{{detail.title}}</h4>
      <div class="text-center news-detail-time">{{detail.time}}</div>
      <div class="news-detail-content" v-html="detail.content">
        <!-- {{detail.content}} -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data () {
    return {
      detail: {
        title:'标题',
        time:moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        content:'this is some content,this is <b style="color:#f00;">some content </b>,this is some content,this is some content'
      }
    }
  }
}
</script>

<style lang="scss">
  .news-detail {
    padding: 20px;
  }
  .news-detail-time{
    font-size: 12px;
    color: #999;
    padding:10px 0 30px 0;
  }
  .news-detail-content {
    line-height: 1.5em;
  }
</style>
