// 版本号，每当更新时，我们需要修改版本号，来更新，
// 当然你也可以使用随机生成的哈希值。
var version = 'v1.0.0'; 

 // 监听 service worker 的 install 事件
 self.addEventListener('install', function (event) {

      // 如果监听到了 service worker 已经安装成功的话，就会调用 event.waitUntil 回调函数
      event.waitUntil(
          // 安装成功后 ServiceWorker 状态会从 installing 变为 installed
          // 安装成功后操作 CacheStorage 缓存，使用之前需要先通过 caches.open() 打开对应缓存空间。
          caches.open(version).then(function (cache) {

              // 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
              return cache.addAll([
                './index.html',
                './main.css',
                './main.js',
                './img/manong.jpg',
              ]);
          })
      );
  });


  // 安装阶段跳过等待，直接进入 active
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([
            // 更新客户端
            self.clients.claim(),
            // 清理旧版本
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== version) {

                            // 向主进程发送消息
                            this.clients.matchAll().then(client => {
                                console.log(client)
                                client[0].postMessage('内容更新了');
                            })
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});

  // 捕获请求并返回缓存数据
  self.addEventListener('fetch', function (event) {
    // console.log(event)

    // respondWith 方法可以劫持我们的请求
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // 处理一些请求，代理的事情

            // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
            if (response) {
                return response;
            }

            // 如果 service worker 没有返回，那就得直接请求真实远程服务
            let request = event.request.clone(); // 把原始请求拷过来
            return fetch(request).then(function (httpRes) {

                // http请求的返回已被抓到，可以处置了。

                // 请求失败了，直接返回失败的结果就好了。。
                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }

                // 请求成功的话，将请求缓存起来。
                var responseClone = httpRes.clone();
                caches.open(version).then(function (cache) {
                    cache.put(event.request, responseClone);
                });

                return httpRes;
            });
        })
    );
});



/**
 * 使用 MessageChannel 传输信息
 *  */

 
// self.addEventListener('message',event=>{
//     console.log(event.data) // 来自主线程的消息
//     //event.ports[0] 就是port2 通道端口
//     event.ports[0].onmessage = function(e){
//         console.log(1111)
//         console.log(e)
//     }
//     event.ports[0].postMessage('来自service worker 的消息')
// })


// 消息通知


self.addEventListener('notificationclick', e => {
    let clickedNotification = e.notification;
    console.log(e)
});