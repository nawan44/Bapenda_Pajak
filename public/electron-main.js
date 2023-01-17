const electron = require("electron");
// Modul utama untuk mengendalikan aplikasi Elektron
const app = electron.app;
// Modul untuk membuat jendala native (asli) peramban
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

// Untuk menginisialiasi dan menjaga object window, jika ini tidak dilakukan
// jendala peramban akan secara otomatis akan masuk kedalam gerbage collector.
let mainWindow;

function createWindow() {
  // Membuat jendala peramban baru dengan tinggi dan lebar yang telah ditentukan (dalam satuan pixel)
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // Memuat file index.html dalam aplikasi ini
  mainWindow.loadURL(
    url.format({
      // Perhatikan index.html berada pada satu level dengan main.js
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Untuk membukan Developer Tools
  // Cukup beri komentar seperti dibawah untuk menyembunyikannya atau hapus komentar untuk menampilkanya

  // mainWindow.webContents.openDevTools()

  // perintah ini akan dijalankan ketika jendela ditutup
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// Method ini akan di panggil ketika Electron telah selesai melakukan compilasi
// Di inisialisasi dan ketika siap maka akan menjalankan createWindow yang artinya membuat jendala baru
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Blok code ini akan dijalankan ketika semua window ditutup, beda dengan closed
app.on("window-all-closed", function () {
  // Khusus untuk MacOS X umumnya harus menutup aplikasi dari menubar
  // Jadi pengguna harus secara eksplisit menutup nya, misal denan Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // Khusus untuk MacOS X, biasanya akan membuat ulang jendala aplikasi
  // ketika pengguna menekan icon pada dock (pada bagian bawah tampilan desktop)
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
