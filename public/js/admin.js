let lista = JSON.parse(localStorage.getItem('produtos')) || [];  // Carregar produtos do localStorage

// Seleção dos elementos do DOM
const adminTable = document.getElementById('adminTable');
const modalAdmin = new bootstrap.Modal(document.getElementById('modalAdmin'));
const formAdmin = document.getElementById('formAdmin');
const sizesContainer = document.getElementById('sizesContainer');
const saveBtn = document.getElementById('saveBtn');
const inputFile = document.getElementById('inputImagemFile');
const btnNovo = document.getElementById('btnNovo');
const btnAddSize = document.getElementById('btnAddSize');

// Função para renderizar a tabela de administração
function renderTable() {
  adminTable.innerHTML = '';  // Limpar a tabela antes de re-renderizar
  lista.forEach((produto, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td><img src="${produto.imagem}" class="thumb"></td>
      <td>${produto.descricao}</td>
      <td>${Object.entries(produto.tamanho).map(([k,v]) => `${k}: R$ ${v.toFixed(2)}`).join('<br>')}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-primary me-1" onclick="editProduto(${i})"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduto(${i})"><i class="bi bi-trash"></i></button>
      </td>`;
    adminTable.appendChild(tr);  // Adicionar a linha à tabela
  });
}

// Função para resetar o formulário
function resetForm() {
  formAdmin.reset();
  document.getElementById('produtoIndex').value = '';
  document.getElementById('imagemPath').value = '';
  sizesContainer.innerHTML = '';
}

// Função para adicionar campos de tamanho e preço
function addSizeField(k = '', p = '') {
  const div = document.createElement('div');
  div.className = 'input-group mb-2';
  div.innerHTML = `
    <input type="text" class="form-control" placeholder="Tamanho" value="${k}" required>
    <input type="number" class="form-control" placeholder="Preço" value="${p}" required>
    <button class="btn btn-outline-danger" type="button"><i class="bi bi-x-lg"></i></button>
  `;
  div.querySelector('button').onclick = () => div.remove();  // Remove o campo
  sizesContainer.appendChild(div);  // Adiciona ao container
}

// Ação para abrir o modal e resetar o formulário
btnNovo.onclick = () => { resetForm(); modalAdmin.show(); };

// Ação para adicionar um novo campo de tamanho
btnAddSize.onclick = () => addSizeField();

// Função para salvar o produto (criar ou editar)
saveBtn.onclick = async () => {
  const idx = document.getElementById('produtoIndex').value;
  const nome = document.getElementById('inputNome').value;
  const desc = document.getElementById('inputDescricao').value;
  const oldPath = document.getElementById('imagemPath').value;
  const tamanho = {};

  // Coletar todos os tamanhos e preços
  sizesContainer.querySelectorAll('.input-group').forEach(div => {
    const [k, p] = div.querySelectorAll('input');
    tamanho[k.value] = parseFloat(p.value);
  });

  let imagem = oldPath;

  // Se houver um arquivo de imagem, fazer upload
  if (inputFile.files.length) {
    const fd = new FormData();
    fd.append('file', inputFile.files[0]);
    try {
      const res = await fetch('/upload', { method: 'POST', body: fd });
      const { path } = await res.json();
      imagem = path;
    } catch (err) {
      alert("Erro ao fazer upload da imagem.");
      return;
    }
  }

  const prod = { nome, imagem, descricao: desc, tamanho };

  // Se o índice for vazio, adicionar um novo produto
  if (idx === '') lista.push(prod);
  else lista[idx] = prod;  // Caso contrário, editar o produto existente

  localStorage.setItem('produtos', JSON.stringify(lista));  // Salvar no localStorage
  modalAdmin.hide();
  renderTable();  // Re-renderizar a tabela
};

// Função para editar um produto
function editProduto(i) {
  const p = lista[i];
  document.getElementById('produtoIndex').value = i;
  document.getElementById('inputNome').value = p.nome;
  document.getElementById('inputDescricao').value = p.descricao;
  document.getElementById('imagemPath').value = p.imagem;
  sizesContainer.innerHTML = '';
  
  // Preencher os campos de tamanho e preço
  Object.entries(p.tamanho).forEach(([k, v]) => addSizeField(k, v));
  modalAdmin.show();
}

// Função para excluir um produto
function deleteProduto(i) {
  if (confirm('Excluir este produto?')) {
    lista.splice(i, 1);  // Remover o produto da lista
    localStorage.setItem('produtos', JSON.stringify(lista));  // Atualizar o localStorage
    renderTable();  // Re-renderizar a tabela
  }
}

// Iniciar a renderização da tabela ao carregar a página
renderTable();
