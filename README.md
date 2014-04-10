Chrome 插件
选中单词，右键选中文字，可以将选中的文字存到浏览器的localstorage


单击工具栏图标，可以显示最近存的单词，并通过转存按钮保存至本地log.txt


安装步骤：
    1， 在chrome 输入 chrome://extensions/
    2， 单击‘打包扩展程序’,  选中下载的文件夹,  提示创建right_key.crx   right_key.pem,  即打包成功
    3， 单击‘加载正在开发的扩展程序...’,  选中刚下载的文件夹  即安装成功  可以看到浏览器添加一个选项按钮
    4， 可以试试功能咯

项目初始想法：
    1， 实现选中页面单词并本地存储
    2， 读取本地存储的单词，并翻译，将结果保存留以后复习用

项目结果：
    1功能基本实现，利用chrome  LocalStorage 并可以转存至log.txt，但是由于chrome的沙箱安全策略无法将文件保存值本地，而且chrome LocalStorage的存储有容量限制(5 MB)；
    2功能没有实现
