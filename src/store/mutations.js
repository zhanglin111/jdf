/*
 * @Author: chunyan wang
 * @Purpose: 提交
 */

export default {
  set_userInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  set_shopCartInfo(state, shopCartInfo) {
    state.shopCartInfo = shopCartInfo
  },
  set_toast(state, toast) {
    state.toast = toast
  },
  // add(state) {
  //   state.cart.push(state);
  // },
  // delete(state, index) {
  //   state.cart.splice(index, 1);
  // },
  // clear(state) {
  //   state.cart = []
  // }
}
