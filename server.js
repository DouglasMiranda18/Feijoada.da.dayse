const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const produtosPath = path.join(__dirname, 'public/data/produtos.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use('/assets/produtos', express.static(path.join(__dirname, 'public/assets/produtos')));
app.use(express.json()); // <- importante se estiver recebendo JSON no body

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

function salvarProduto(produto) {
  let produtos = [];

  if (fs.existsSync(produtosPath)) {
    produtos = JSON.parse(fs.readFileSync(produtosPath, 'utf-8'));
  }

  produtos.push(produto);

  fs.writeFileSync(produtosPath, JSON.stringify(produtos, null, 2));
}

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  const filePath = `/assets/produtos/${req.file.filename}`;
  const { nome, descricao, tamanho } = req.body;

  if (!nome || !descricao || !tamanho) {
    return res.status(400).json({ error: 'Dados do produto incompletos' });
  }

  const produto = {
    nome,
    descricao,
    imagem: filePath,
    tamanho: JSON.parse(tamanho)
  };

  salvarProduto(produto);

  res.json({ message: 'Produto salvo com sucesso!', produto });
});

app.get('/produtos', (req, res) => {
  if (!fs.existsSync(produtosPath)) {
    return res.json([]);
  }

  const produtos = JSON.parse(fs.readFileSync(produtosPath, 'utf-8'));
  res.json(produtos);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
