# 如何使用

## clone 代码

`git clone https://git.coding.net/fuyi501/hfAdmin.git`

## 安装依赖

进入项目目录 `cd hfAdmin`，执行 `cnpm install`，这里使用 `cnpm` 进行安装。

## 启动项目

`npm start`

## 流地址

rtsp://admin:Admin12345@192.168.2.74:554/Streaming/Channels/101

## 推流

ffmpeg -i rtsp://admin:swjtu9422@192.168.9.36:554 -vcodec h264 -f flv -an rtmp://192.168.100.240:1935/hls/stream

ffmpeg -i rtsp://admin:Admin12345@192.168.2.74:554/Streaming/Channels/101 -vcodec h264 -f flv -an rtmp://192.168.100.240:1935/hls/stream

ffmpeg -i rtsp://admin:Admin12345@192.168.2.74:554/Streaming/Channels/101 -f mp4 -vcodec copy -r 25 -s 1920*1080 -b:v 1024000 -an -f flv -an rtmp://192.168.100.240:1935/hls/stream


# 问题

## element dialog 获取不到 dom

是element-ui的问题,dialog在未打开和打开状态是使用v-if来判断,当未打开的时候,值为false,都知道v-if如果是false的话,他就不会渲染出来,这时候使用jquery去查找dom时会找不到,但是为什么在打开状态下也找不到呢?这个问题在于初始化那个函数的时候,element-ui有个渐现的效果,里面的dom并不是一下子就有的,而是会有延迟,这个时候获取dom肯定获取不到,目前的解决办法是加一个setTimeout,100毫秒的延迟,这时候就能获取到了。