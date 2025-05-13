const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

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

  // Retorna o caminho da imagem salva
  const filePath = `/assets/produtos/${req.file.filename}`;
  res.json({ path: filePath });
});

// Exemplo de dados de produtos armazenados (aqui você pode usar um banco de dados)
const produtos = [
  {
    nome: "Produto Exemplo 1",
    descricao: "Descrição do produto 1",
    imagem: "/assets/produtos/exemplo1.jpg",
    tamanho: { P: 30, M: 40, G: 50 }
  },
  {
    nome: "Produto Exemplo 2",
    descricao: "Descrição do produto 2",
    imagem: "/assets/produtos/exemplo2.jpg",
    tamanho: { P: 20, M: 35, G: 45 }
  }
];

// Endpoint para obter a lista de produtos
app.get('/produtos', (req, res) => {
  res.json(produtos); // Retorna os dados dos produtos
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
