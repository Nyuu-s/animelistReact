
// const MINIMIZE_BUTTON= document.getElementById('minimize')
// const CLOSE_BUTTON = document.getElementById('close-app')

// MINIMIZE_BUTTON.addEventListener('click', () => {
//     api.window.minimize()
// })
// CLOSE_BUTTON.addEventListener('click', () => {
//     api.window.closeApp(true)
// })

const Store = require('electron-store')
const storage = new Store()

const getWinSettings = () => {
    const default_bounds = [800, 650]
    const size = storage.get("win-size");
    if(size) return size;
    else
    {
        storage.set("win-size", default_bounds)
        return default_bounds
    }
}

const saveBounds = (bounds) => {
    storage.set("win-size", bounds)
}



module.exports = {
    getWindowSettings: getWinSettings,
    saveBounds: saveBounds,
    
}