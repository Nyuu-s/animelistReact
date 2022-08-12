const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')
const { MdOpenInBrowser } = require('react-icons/md')



// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   // we can also expose variables, not just functions
// })


contextBridge.exposeInMainWorld(
  'api',
  {
    window:{
      closeApp: (savedContent) => ipcRenderer.invoke('window:close-app', savedContent),
      minimize: () => ipcRenderer.invoke('window:minimize-app'),
      openInBrowser: (uri) => ipcRenderer.invoke('window:open-in-browser', uri),
    },
    openFile: () => ipcRenderer.invoke('dialog:open-file'),
    parseAnimes: (path) => ipcRenderer.invoke('parser:xslx', path),
    storageGet: () => ipcRenderer.invoke('storage:read-data'),
    


  })