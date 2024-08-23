const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('node:path')

 const createWindow = async () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    })

        await mainWindow.loadFile('./build/index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
})

app.whenReady().then(async () => {
    await createWindow()

    app.on('activate', async () => {
        if (BrowserWindow.getAllWindows().length === 0) await createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
