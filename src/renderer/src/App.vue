<script setup lang="ts">


const ipcHandle = () => window.electron.ipcRenderer.send('ping')

const ipcHandle2 = () => window.electron.ipcRenderer.send('ping2')

</script>

<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">发送 IPC</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle2">ipcHandle2</a>
    </div>
  </div>
  <!-- <Versions /> -->
</template>
