const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/assets/produtos', express.static(path.join(__dirname, 'public/assets/produtos')));

// Arquivo para salvar os dados
const produtosPath = path.join(__dirname, 'produtos.json');

// Configurar armazenamento das imagens
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

// Rota para envio de imagens
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  const filePath = `/assets/produtos/${req.file.filename}`;
  res.json({ path: filePath });
});

// Rota para adicionar produto
app.post('/produtos', (req, res) => {
  const novoProduto = req.body;

  // Carregar produtos existentes
  let produtos = [];
  if (fs.existsSync(produtosPath)) {
    produtos = JSON.parse(fs.readFileSync(produtosPath));
  }

  produtos.push(novoProduto);
  fs.writeFileSync(produtosPath, JSON.stringify(produtos, null, 2));

  res.status(201).json({ message: 'Produto salvo com sucesso!' });
});

// Rota para listar produtos
app.get('/produtos', (req, res) => {
  if (fs.existsSync(produtosPath)) {
    const produtos = JSON.parse(fs.readFileSync(produtosPath));
    res.json(produtos);
  } else {
    res.json([]);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
