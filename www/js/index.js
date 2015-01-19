


function initPushwoosh()
{
    isAndroid = true;
    var platform = window.device.platform;
    if (platform.match(/iPhone/))
    {
        isAndroid = false;
    }


    var pushNotification = window.plugins.pushNotification;

    // show alert
    document.addEventListener('push-notification', function(event)
    {
        // 表示はここをカスタムする
        var notification = event.notification;
        alert(notification.aps.alert);

        // バッジ
        if (!isAndroid)
        {
            pushNotification.setApplicationIconBadgeNumber(0);
        }
    });

    //initialize the plugin


    if (isAndroid)
    {
        pushNotification.onDeviceReady({projectid: "990677069976", appid: "54183-D7A84" });
    }
    else
    {
        pushNotification.onDeviceReady({pw_appid:"54183-D7A84"});
    }

    //register for pushes
    pushNotification.registerDevice(
        function(status)
        {
            var deviceToken = status['deviceToken'];
            console.warn('registerDevice: ' + deviceToken);
        },
        function(status)
        {
            console.warn('failed to register : ' + JSON.stringify(status));
            alert(JSON.stringify(['failed to register ', status]));
        }
    );
    //register for pushes
    pushNotification.registerDevice(
        function(status)
        {
            var deviceToken = status['deviceToken'];
            console.warn('registerDevice: ' + deviceToken);
        },
        function(status)
        {
            console.warn('failed to register : ' + JSON.stringify(status));
            navigator.notification.alert(JSON.stringify(['failed to register ', status]));
        }
    );

    pushNotification.setApplicationIconBadgeNumber(0);
    pushNotification.getTags(
        function(tags)
        {
            console.warn('tags for the device: ' + JSON.stringify(tags));
        },
        function(error)
        {
            console.warn('get tags error: ' + JSON.stringify(error));
        }
    );

    pushNotification.getPushToken(
        function(token)
        {
            console.warn('push token device: ' + token);
        }
    );
    pushNotification.getPushwooshHWID(
        function(token)
        {
            console.warn('Pushwoosh HWID: ' + token);
        }
    );

    //start geo tracking.
    pushNotification.startLocationTracking(
        function()
        {
            console.warn('Location Tracking Started');
        }
    );
}







var app =
{
    // Constructor
    initialize: function()
    {
        this.bindEvents();
    },
    bindEvents: function()
    {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function()
    {
        app.receivedEvent('deviceready');
        initPushwoosh();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id)
    {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
