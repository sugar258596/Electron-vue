# 进程间通信

## 渲染器到主进程 -- 单向

单向的IPC消息从渲染进程发送到主进程， 使用`ipcRenderer.send("name",data?)`。
主进程接受消息使用`ipcMain.on("name",callback)`。

## 渲染器到主进程 -- 双向

## 主进程到渲染器

## 渲染器到渲染器
