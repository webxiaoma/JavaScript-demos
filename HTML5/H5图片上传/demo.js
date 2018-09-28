

function createImg(file){
    let reader = new FileReader(); 
    reader.readAsDataURL(file); // 将接收到的图片以DataUrl格式读取为
    reader.onload=() => { // 文件读取成功执行
        let url = reader.result;
        let image = new Image()
        image.src = url;
        image.onload = ()=>{ // 图片加载成功后执行
        let canvasImg = document.createElement('canvas');
        canvasImg.width = image.width
        canvasImg.height = image.height
        let ctx = canvasImg.getContext("2d")
        ctx.drawImage(image, 0, 0,image.width,image.height);
        let  dataURL = canvasImg.toDataURL("image/jpeg",0.8); // 将canvas 转化为base64格式，并将canvas压缩0.8

      
        let byteURL = atob(dataURL.split(',')[1]) // 解码base64
        // 获取图片类型
        let mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

          // 将canvas 转为字节流
        let buffer = new ArrayBuffer(byteURL.length);
        let uintAry = new Uint8Array(buffer); //转化为8位无符号整数，长度1个字节

        for (var i = 0; i < byteURL.length; i++) {
            uintAry[i] = byteURL.charCodeAt(i);
        }
        
        let blob = new Blob([buffer],{type: mimeString})
        }
    }
}



let inp = document.getElementById('file')

inp.onchange = function(e){
    let file = e.target.files[0]

    createImg(file)

}



let imgWrap = document.getElementById('uploadImg')
let img = document.querySelector('img')

imgWrap.ondragover = function(e){
    console.log(1)
    e.preventDefault();

}

imgWrap.ondrop = function(e){
    e.preventDefault();
    
    let files = e.dataTransfer.files
    let fileType = files[0].type
    if(/^image\/(jpeg|png)/.test(fileType)){
        console.log(111)
    }
    let url = URL.createObjectURL(files[0])
    img.src = url
}