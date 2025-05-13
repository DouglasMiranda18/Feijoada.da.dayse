const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use('/assets/produtos', express.static(path.join(__dirname, 'public/assets/produtos')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/produtos');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  const filePath = `/assets/produtos/${req.file.filename}`;
  res.json({ path: filePath });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


app.get('/assets/produtos', (req, res) => {
  // Exemplo de lista de produtos
  const produtos = [
    {
      name: 'Feijoada Completa',
      description: 'Feijoada com todos os acompanhamentos.',
      image: '/assets/produtos/feijoada.jpg' // Coloque o caminho da imagem correta
    },
    {
      name: 'Feijoada Light',
      description: 'Feijoada mais leve, sem carne gordurosa.',
      image: '/assets/produtos/feijoada-light.jpg'
    }
    // Adicione outros produtos conforme necessário
  ];

  res.json(produtos);
});

