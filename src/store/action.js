import axios from 'axios';
function getUserInfo(context) {
  axios
    .post("/trade/tps/pbpis.do",{reqresource:1})
    .then(res => {
      if (res.data && res.data.username != undefined) {
        context.commit('getUserLoginInfo',res.data);
      } else {
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

export default {
  getUserInfo
}