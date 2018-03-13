let Message = (function () {
  let num;
  let Message = {
     
  };
  Message.create = function (text,type,duration){
      duration = (duration && typeof duration == 'number')?duration:3000;
      if (duration && duration < 10 ){
          duration = 1000*duration;
      }
      let message = document.createElement('div');
      let wrapperStyle = '';
      let icon_class;
      if (type == 'error'){
          wrapperStyle = 'message-wrapper-error';
          icon_class = "ivu-icon ivu-icon-close-round"
      }else if (type == 'success') {
          wrapperStyle = 'message-wrapper-success';
          icon_class = "ivu-icon ivu-icon-checkmark"
      }
      let span = document.createElement('span');
      span.innerHTML = text;
      let icon = document.createElement('i');
      icon.className=icon_class;
      message.className= wrapperStyle + ' animated fadeInDown';
      message.appendChild(icon);
      message.appendChild(span);
      document.body.appendChild(message);
      setTimeout(() => {
          message.className = wrapperStyle + ' animated fadeOutUp';
          setTimeout(() => {
              document.body.removeChild(message);
          }, 1000);
      }, duration);
  };
  Message.error = function (text,duration) {
      Message.create(text,'error',duration);
  };
  Message.success = function (text,duration) {
      Message.create(text,'success',duration);
  };
  Message.warning = Message.warn = Message.error;
  return Message;
})();

export { Message };
