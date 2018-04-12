import axios from 'axios';
function getUserInfo(context) {
  axios
    .post("/trade/tps/pbpis.do",{reqresource:1})
    .then(res => {
      if (res.data && res.data.username != undefined) {
        context.commit('getUserLoginInfo',res.data);
      } else {
        console.log('获取用户信息出错');
      }
    })
    .catch(err => {
      console.log("获取用户信息出错", err);
    });
    axios
    .post("/trade/tps/pblbi.do",{reqresource:1})
    .then(res => {
      if (res.data && res.data.emailset != undefined) {
        context.commit('getUserBaseInfo',res.data);
      } else {
        console.log('获取用户认证信息出错');
      }
    })
    .catch(err => {
      console.log("获取用户认证信息出错", err);
    });
}
function getEstimateassets (context) {
  axios({
    method:"post",
    url:"/trade/tps/pbesa.do",
    data:{
      reqresource:1
    }
  }).then((res)=>{
    if(res.status == 200 && res.data && res.data.sumAmount){
      context.commit('getEstimateassets',res.data.sumAmount);
    }else{
      console.log('获取用户总资产出错');
    }
  }).catch((err)=>{
    console.log('获取用户总资产出错',err);
  })
}
export default {
  getUserInfo,
  getEstimateassets
}