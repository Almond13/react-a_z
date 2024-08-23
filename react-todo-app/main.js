const { app, BrowserWindow, ipcMain, nativeTheme, Notification } = require('electron')
const path = require('node:path')

 const createWindow = async () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    })

        await mainWindow.loadFile('./public/index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

/* 테마 설정 */
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

/* 알림 - 메인프로세스에서 실행 */
const NOTIFICATION_TITLE = 'Electron app'
const NOTIFICATION_BODY = 'login success'

function showNotification () {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(async () => {
    await createWindow()

    app.on('activate', async () => {
        if (BrowserWindow.getAllWindows().length === 0) await createWindow()
    })
}).then(showNotification)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
