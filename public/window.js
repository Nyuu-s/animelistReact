
// const MINIMIZE_BUTTON= document.getElementById('minimize')
// const CLOSE_BUTTON = document.getElementById('close-app')

// MINIMIZE_BUTTON.addEventListener('click', () => {
//     api.window.minimize()
// })
// CLOSE_BUTTON.addEventListener('click', () => {
//     api.window.closeApp(true)
// })

const Store = require('electron-store')
const cheerio = require('cheerio')

const storage = new Store()

const getImageUrl = async (url) => {
    return'https://cdn.myanimelist.net/images/anime/4/78321.jpg'
}

const getWinBounds = () => {
    const default_bounds = [800, 650]
    const size = storage.get("win-size");
    if(size) return size;
    else
    {
        storage.set("win-size", default_bounds)
        return default_bounds
    }
}

const getWinPos = () => {
    const default_pos = {x: 300, y:300}
    const position = storage.get("win-pos");
    if(position) return position;
    else
    {
        storage.set("win-pos", default_pos)
        return default_pos
    }
}

const saveBounds = (bounds) => {
    storage.set("win-size", bounds)
}
const savePosition = (pos) => {
    storage.set("win-pos", {x: pos[0], y:pos[1]})
}



module.exports = {
    getWindowBounds: getWinBounds,
    getWindowPosition: getWinPos,
    saveBounds: saveBounds,
    savePosition,
    getImageUrl
    
}