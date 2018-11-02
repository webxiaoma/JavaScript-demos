const messageChannel = new MessageChannel();
console.log(messageChannel)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./service-worker.js', {scope: './'})
            .then(function (registration) {
                 /**
                 * 使用 MessageChannel 传输信息
                 **/

                // messageChannel.port1.onmessage = e => {
                //     console.log(e.data); // this message is from sw.js, to page
                //   }
                //  // 将messageChannel 的 第二个通道port2通道端口传给 service worker 进程
                //  registration.active.postMessage('来自主线程的消息',[messageChannel.port2])
               
                // 注册成功
                console.log("ServiceWorker 注册成功");
                // 监听service-worker 进程发来的消息
                navigator.serviceWorker.addEventListener('message', function (e) {
                   console.log(e)
                })

                // 消息通知
                registration.showNotification('webxiaoma',{
                    // 视觉相关
                   "body": "发送消息了",
                   "icon": './img/mxx48.jpg',
                   "badge": './img/mxx.ico',
                   "image": './img/mxx188.jpg',
                   "actions": [
                       {
                           action: 'coffee-action',
                           title: '确定',
                           icon: './img/mxx.ico'
                       },
                       {
                           action: 'doughnut-action',
                           title: '取消',
                           icon: './img/mxx.ico'
                       }
                   ],
                   vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]
                })
            })
            .catch(function (err) {
                // 注册失败:(
                console.log('ServiceWorker 注册失败: ', err);
            });
    });
}