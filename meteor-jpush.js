JPushAPI = {};

JPushAPI.configure = function () {
  if (!Meteor.isCordova) {
    console.log('JPush only for mobile platform.');
    return;
  }

  jPushPlugin.init();
  if (device.platform != "Android") {
    jPushPlugin.setDebugModeFromIos();
    jPushPlugin.setApplicationIconBadgeNumber(0);
  } else {
    jPushPlugin.resetBadge();
    jPushPlugin.setDebugMode(true);
  }
  document.addEventListener("jpush.openNotification", openNotification, false);
  document.addEventListener("jpush.receiveNotification", receiveNotification, false);
  document.addEventListener("jpush.receiveMessage", receiveMessage, false);
  console.log('JPushAPI configure');
}

JPushAPI.getRegistrationID = function (callback) {
  if (!Meteor.isCordova) {
    console.log('JPush only for mobile platform.');
    return;
  }

  jPushPlugin.getRegistrationID(function (registrationID) {
    if (callback) {
      callback(registrationID);
    }
    console.log("get registrationID: " + registrationID);
  });
  console.log('JPushAPI getRegistrationID');
}

function openNotification(event) {
  try {
    var alertContent;
    if (device.platform == "Android") {
      alertContent = jPushPlugin.openNotification.alert;
    } else {
      alertContent = event.aps.alert;
    }
    console.log("open Notificaiton:" + JSON.stringify(alertContent));
  }
  catch (exception) {
    console.log("jPushPlugin:onOpenNotification" + exception);
  }
}

function receiveNotification(event) {
  try {
    var alertContent;
    if (device.platform == "Android") {
      alertContent = jPushPlugin.receiveNotification.alert;
    } else {
      alertContent = event.aps.alert;
    }
    console.log("receive Notificaiton:" + JSON.stringify(alertContent));
  }
  catch (exeption) {
    console.log(exception)
  }
}

function receiveMessage(event) {
  try {
    var message;
    if (device.platform == "Android") {
      message = jPushPlugin.receiveMessage.message;
    } else {
      message = event.content;
    }
    console.log("receive Message:" + JSON.stringify(message));
  }
  catch (exception) {
    console.log("jPushPlugin:onReceiveMessage-->" + exception);
  }
}