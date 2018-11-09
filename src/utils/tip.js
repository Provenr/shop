/**
 * 提示与加载工具类
 */
export default class Tips {

  /**
   * 成功弹出提示框
   */
  static success(title, duration = 2000) {
    var toast = new auiToast({});
    toast.success({
      title: title,
      duration: duration
    });
  }
  /**
   * 错误弹出提示框
   */
  static error(title, duration = 2000) {
    var toast = new auiToast({});
    toast.fail({
      title: title,
      duration: duration
    });
  }
  /**
   * 提示框
   */
  static toast(title, duration = 2000) {
    var toast = new auiToast({});
    toast.custom({
      title: title,
      html: '',
      duration: duration
    });
  }

  /**
   * 弹出加载提示
   */
  static loading(title = '加载中', duration = 2000) {
    var toast = new auiToast({});
    toast.loading({
      title: title,
      duration: duration
    });
  }
  /**
   * 加载完毕
   */
  static loaded() {
    var toast = new auiToast({});
    toast.hide();
  }

  /**
   * 弹出确认窗口
   */
  static alert(text, title = '提示') {
    var dialog = new auiDialog({})
    dialog.alert({
      title: title,
      msg: text,
      buttons: ['确定']
    }, function (ret) {
      console.log(ret)
    })
  }

  /**
   * 弹出确认窗口
   */
  static confirm(text, payload = {}, title = '提示') {
    var dialog = new auiDialog({})
    return new Promise((resolve, reject) => {
      dialog.alert({
        title: title,
        msg: text,
        buttons: ['取消', '确定']
      }, function (ret) {
        if (ret.buttonIndex == 2) {
          resolve(payload)
        }
        else {
          reject(payload)
        }
      })
    })
  }
}