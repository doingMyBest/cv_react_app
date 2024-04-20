const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors')

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // accept requests from localhost 3000
}));

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve files from the uploads directory
app.use('/uploads', express.static(uploadsDir));

// Storage configuration for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        // You could also append a timestamp or a unique identifier to the filename here
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/uploadFile', upload.single('file'), (req, res) => {
  if(req.file) {
    // Construct the URL to access the uploaded file
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ fileUrl: fileUrl });
  } else {
    res.status(400).send('No file uploaded.');
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001/'));
