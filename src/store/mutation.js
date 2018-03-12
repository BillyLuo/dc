import axios from 'axios';
function change (state,payload) {
  console.log('test');
}
function getUserInfo(state,palyload) {
  axios
    .post("/trade/tps/pbpis.do")
    .then(res => {
      console.log("----user-----info----", res,res.data);
      if (res.data && res.data.username != undefined) {
        state.userinfo = Object.assign(state.userinfo,res.data)
      } else {
      }
    })
    .catch(err => {
      console.log("获取用户信息出错", err);
    });
    axios
    .post("/trade/tps/pblbi.do")
    .then(res => {
      console.log("----userbaseinfo-----", res.data);
      if (res.data && res.data.email != undefined) {
        state.userinfo = Object.assign(state.userinfo,res.data)
      } else {
        console.log('获取用户认证信息出错');
      }
    })
    .catch(err => {
      console.log("获取用户认证信息出错", err);
    });
}
export default {
  change,
  getUserInfo,
}