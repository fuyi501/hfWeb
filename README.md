# 如何使用

## clone 代码

`git clone https://git.coding.net/fuyi501/hfAdmin.git`

## 安装依赖

进入项目目录 `cd hfAdmin`，执行 `npm install`

## 启动项目

`npm start`

# 问题

## element dialog 获取不到 dom

是element-ui的问题,dialog在未打开和打开状态是使用v-if来判断,当未打开的时候,值为false,都知道v-if如果是false的话,他就不会渲染出来,你这时候使用jquery去查找dom时肯定找不到,但是为什么在打开状态下也找不到呢?这个问题在于初始化那个函数的时候,element-ui有个渐现的效果,里面的dom并不是一下子就有的,而是会有延迟,这个时候你获取dom肯定获取不到,我目前的解决办法是加一个setTimeout,100毫秒的延迟,这时候就能获取到了,但是还是感觉不太好,希望有更优的解决方案