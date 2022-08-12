// Native
import { release } from 'os';
import { join } from 'path';

// Packages
import { BrowserWindow, app, nativeImage } from 'electron';

if (release().startsWith('6.1')) app.disableHardwareAcceleration()

if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null

// Prepare the renderer once the app is ready
const createWindow = async () => {
  const appIcon =  nativeImage.createFromPath(
    join( __dirname, '../out/assets/electron/icon.png' )
  );
  
  win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#1A1B1E',
    icon: appIcon,
    darkTheme: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: false,
    }
  });

  win.setMenuBarVisibility(false);

  win.loadFile(join(__dirname, '../out/index.html'));

  win.once('ready-to-show', () => {
    win?.show()
  });
};

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})