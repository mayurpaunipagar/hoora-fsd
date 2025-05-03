const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = '4c506989a7055f0a4f0011db14ef47703af9b4e2756e472fe122243d23990f6d'; //move to .env 


app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG or PNG images are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (!authHeader) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    console.log(user);
    next();
  });
};


const generateSignedUrl = (filename) => {
  const token = jwt.sign({ filename }, JWT_SECRET, { expiresIn: '15m' });
  return `http://localhost:${PORT}/uploads/${filename}?token=${token}`;
};

app.post('/login',(req,res)=>{
    const {username, password} = req.body;
    if(username==='mayurpaunipagar' && password==='mayurpaunipagar'){
        const token = jwt.sign({userId: username},JWT_SECRET, { expiresIn: '1h' });
        res.json({token});
    }else{
        res.status(401).json({error:'Invalid Credentials'});
    }
})


app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const { token } = req.query;

  if (!token) {
    return res.status(401).json({ error: 'Signed URL token required' });
  }

  try {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || decoded.filename !== filename) {
        return res.status(403).json({ error: 'Invalid or expired signed URL' });
      }

      const filePath = path.join(uploadDir, filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
      }

      res.sendFile(filePath);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to serve file' });
  }
});


app.post('/api/upload-image', authenticateJWT, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided or invalid file type' });
    }

    const signedUrl = generateSignedUrl(req.file.filename);

    res.status(201).json({
      message: 'Image uploaded successfully',
      file: {
        filename: req.file.filename,
        url: signedUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});


app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Multer error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});