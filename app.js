const express = require('express');
const si = require('systeminformation')
const path = require('path');
const bodyParser = require('body-parser');
const Downloader = require("nodejs-file-downloader");
const StormDB = require("stormdb");
const app = express();
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);
db.default({ perc: null, firstInstall: false});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('../scratch');
  }

app.get('/checkJava', (req, res) => {
    function javaversion(callback) {
        var spawn = require('child_process').spawn('java', ['-version']);
        spawn.on('error', function (err) {
            return callback(err, null);
        })
        spawn.stderr.on('data', function (data) {
            data = data.toString().split('\n')[0];
            var javaVersion = new RegExp('java version').test(data) ? data.split(' ')[2].replace(/"/g, '') : false;
            if (javaVersion != false) {
                // TODO: We have Java installed
                return callback(null, javaVersion);
            } else {
                // TODO: No Java installed

            }
        });
    }

    javaversion(function (err, version) {
        res.send({ version: version, error: err });
    })

});

app.get('/checkSystem', (req, res) => {
    Promise.all([
        si.mem(),
        si.cpu(),
        si.osInfo()
    ]).then(([mem, cpu, os]) => {
        res.send({ mem: mem, cpu: cpu, os: os });
    })

});


app.get('/startDownloadJava', (req, res) => {
    (async () => {
        const downloader = new Downloader({
            url: "https://download.bell-sw.com/java/8u345+1/bellsoft-jdk8u345+1-windows-amd64-full.zip",
            directory: "../java",
            cloneFiles: false,
            fileName: "java.zip",
            onProgress: (perc, chunk, remSize) => {
                console.log(perc)
                

    },
        });

try {
    await downloader.download();
    localStorage.clear()
} catch (error) {
    console.log(error);
}
      }) ();
    
});
app.get('/startDownloadJavaStats', (req, res) => {
    res.send({ pers: localStorage.getItem('perc') })
});

app.get('/updateLauncher', (req, res) => {


});

app.get('/startLauncher', (req, res) => {


});

app.listen(5000, () => console.log('App running on port 5000 🔥'));
