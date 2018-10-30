
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./service-worker.js', {scope: './'})
            .then(function (registration) {
                // 注册成功
                console.log("ServiceWorker 注册成功");
            })
            .catch(function (err) {
                // 注册失败:(
                console.log('ServiceWorker 注册失败: ', err);
            });
    });
}