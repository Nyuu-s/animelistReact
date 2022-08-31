
const {app, BrowserWindow, dialog, Menu, shell} = require('electron');
const {autoUpdater} = require('electron-updater')
const { ipcMain } = require('electron/main');
const path = require('path')
const { Parser } = require('./AnimesXLSXParser')
const { getWindowBounds, getWindowPosition, savePosition, saveBounds, getImageUrl } = require('./window')
const Store = require('electron-store');
const isProd = app.isPackaged


const storage = new Store()
require('electron-reload')(__dirname)

let win
const localhost =  !isProd ? 'http://localhost:3000' : `file:\\${path.join(__dirname, '../build/index.html')}`
function createWindow(){
    const bounds = getWindowBounds();
    const position = getWindowPosition();
    win = new BrowserWindow({
        width: bounds[0],
        height: bounds[1],
        darkTheme: true,
        x: position.x,
        y: position.y,
        
        // frame:false,
        // autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: app.isPackaged ? false : true
            
        },
        show:false,
        
        
    })
    
    win.on('moved', () => savePosition(win.getPosition()))
    win.on('resized', () => saveBounds(win.getSize()))
    win.on('maximize', () => saveBounds(win.getSize()))
    win.on('unmaximize', () => saveBounds(win.getSize()))
  
    win.on('ready-to-show', win.show)


    win.loadURL(localhost)
   
    

}
const handleOpenFile = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win,{filters: [ {name: 'Excel', extensions: ['xlsx']}]})
    if (canceled) 
        return
    else 
        return filePaths[0]  
}

const handleCloseApp = async ( _ , savedContent) => {
    
    if(!savedContent){
        const test = await dialog.showMessageBox({message: 'Un-saved modifications WILL be saved before you exit, are you sure you want to quit?', title: 'Exit', buttons: ['Yes', 'No']})
        if(test.response === 1)
            return
    }
    //save current state data
    app.quit();
}

const handleMinimize = async () => {
    win.minimize()
}

const handleParseAnimes = async (_, path) => {
    var result = await Parser.parseAnimeXLSX(path)
    storage.set('data-grid', result)
    console.log(storage);
    
    return result
}
const handleStorageAccess = () => {

    return storage.get('data-grid')
}


const handleOpenInBrowser = (event, uri) => {
    event.preventDefault()
    shell.openExternal(uri)
}
const handleGetImageURL = async (_, url) => {
    return (await getImageUrl(url))
}

autoUpdater.on('update-available', () => {
    
})

app.on('ready', () => {
    ipcMain.handle('dialog:open-file', handleOpenFile);
    ipcMain.handle('window:close-app', handleCloseApp);
    ipcMain.handle('window:minimize-app', handleMinimize);
    ipcMain.handle('window:open-in-browser', handleOpenInBrowser);
    ipcMain.handle('storage:read-data', handleStorageAccess);
    ipcMain.handle('parser:xslx', handleParseAnimes);
    ipcMain.handle('data:get-image', handleGetImageURL);
    
    createWindow();
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Add',
                    click: () => {win.loadURL(localhost+'/load-data')}
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Exit',
                    click: async () => {await handleCloseApp(true)} // true must be a state variable
                }
            ]
        },
        {
            label: 'dev',
           
            submenu: [
                    {
                        role: 'reload'
                    },
                    {
                        role: 'toggleDevTools'
                    },
                    {
                        role: 'forceReload'
                    },
                    {
                        role: 'zoomIn'   
                    },
                    {
                        role: 'zoomOut'   
                    },
                    {
                        role: 'resetZoom'
                    }
            ]
        }



    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});

//UPDATES PART
autoUpdater.autoDownload = false
autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
  })

autoUpdater.on('checking-for-update', () => {
    win.webContents.send('updates:channel', 'Checking for updates...')
})

autoUpdater.on('update-not-available', () => {
    win.webContents.send('updates:channel', 'No updates avaible')
})

autoUpdater.on('update-available', async () =>{
    const dialogResponse = await dialog.showMessageBox({
        type: 'info',
        title: 'Found Updates',
        message: 'Upates available, would you like to download it now ?',
        buttons: ['Yes', 'No']
    })
    if(dialogResponse === 0){
        autoUpdater.downloadUpdate()
    }

  })

