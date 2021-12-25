const express = require('express')
const app = express();
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const hr = require('@tsmx/human-readable');
var serveIndex = require('serve-index');
// const dynamicStatic = require('express-dynamic-static')();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))
app.set('view engine', 'ejs')
// app.use(dynamicStatic);

 const storage = multer.diskStorage({
    destination: 'public/file',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 25000000 // 25 MB
    }
})

app.use('/all', express.static('public/file'), serveIndex('public/file', {'icons': true}))

app.get('/', async(req, res) => {
  res.render('index', {})
})



app.get('/result/test', async(req, res) => {
   res.render('res', {
      filename: "test.mp3",
      size: hr.fromBytes(12000000),
      url: `https://${req.hostname}/file/test.mp3`
      })
})
app.post('/result', upload.single('file'), async(req, res) => {
  const file = req.body.file;
  const name = req.body.filename;

  if (!req.file.path) { res.status(400).json({
        status: false,
        message: "No file uploaded"
    })} else {
      /*
    res.status(200).json({
        status: true,
        result: {
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            size: req.file.size,
            url: "https://" + req.hostname + "/file/" + req.file.name
        }
    }), (error, req, res, next) => {
    res.status(400).json({
        error: error.message
    })
    }*/

    res.render('res', {
      filename: req.file.originalname,
      size: hr.fromBytes(req.file.size),
      url: `https://${req.hostname}/all/${req.file.originalname}`
      })
    } 
})


app.listen(3000)