const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const produtosPath = path.join(__dirname, 'public/data/produtos.json');


const app = express();
const port = process.env.PORT || 3000; // Usar variável de ambiente para o port

// Habilita CORS para permitir requisições de outros domínios
app.use(cors());

// Servir arquivos estáticos
app.use(express.static('public'));

// Rota para imagens de produtos
app.use('/assets/produtos', express.static(path.join(__dirname, 'public/assets/produtos')));

// Configuração de armazenamento do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/produtos'); // Armazenar as imagens no diretório correto
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extensão do arquivo
    const name = Date.now() + ext; // Nome único com timestamp
    cb(null, name);
  }
});

// Inicializa o upload com o multer
const upload = multer({ storage });

// Endpoint para upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  const filePath = `/assets/produtos/${req.file.filename}`;

  // Esperado no body: nome, descricao, tamanho (em JSON string ex: '{"P":10,"M":20,"G":30}')
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


  // Retorna o caminho da imagem salva
  const filePath = `/assets/produtos/${req.file.filename}`;
  res.json({ path: filePath });
});

app.get('/produtos', (req, res) => {
  if (!fs.existsSync(produtosPath)) {
    return res.json([]);
  }

  const produtos = JSON.parse(fs.readFileSync(produtosPath, 'utf-8'));
  res.json(produtos);
});


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
