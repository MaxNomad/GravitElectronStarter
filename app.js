const express = require('express');
const si = require('systeminformation')
const path = require('path');
const bodyParser = require('body-parser');
const Downloader = require("nodejs-file-downloader");

const app = express();
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
        res.send({ version: version });
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
            url: "https://builds.openlogic.com/downloadJDK/openlogic-openjdk-jre/8u342-b07/openlogic-openjdk-jre-8u342-b07-windows-x64.zip",
            directory: "../java",
            cloneFiles: false,
            fileName: "java.zip",
            onProgress: (perc, chunk, remSize) => {
                setInterval(() => {
                    localStorage.setItem('percentage', perc)
                }, 500);

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

    res.send({ percentage: localStorage.getItem('percentage') });


});

app.listen(5000, () => console.log('App running on port 5000 🔥'));
