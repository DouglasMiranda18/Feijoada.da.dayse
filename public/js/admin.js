<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Administração de Produtos | C&C</title>
  <link rel="stylesheet" href="styles.css"> <!-- Verifique se o caminho está correto -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
  <style>
    body { background-color: #f8f9fa; }
    .card-admin { border-radius: 1rem; box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.1); }
    .table thead { background-color: #343a40; color: #fff; }
    img.thumb { width: 60px; height: 60px; object-fit: cover; border-radius: 0.5rem; }
  </style>
</head>
<body>
<nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1"><i class="bi bi-shop-window"></i> Painel C&C</span>
  </div>
</nav>

<div class="container my-5">
  <div class="card card-admin p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="m-0"><i class="bi bi-list-ul"></i> Produtos</h2>
      <button id="btnNovo" class="btn btn-success"><i class="bi bi-plus-lg"></i> Novo Produto</button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Imagem</th>
            <th>Descrição</th>
            <th>Tamanhos</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody id="adminTable"></tbody>
      </table>
    </div>
  </div>
</div>

<!-- Modal Admin -->
<div class="modal fade" id="modalAdmin" tabindex="-1" aria-labelledby="modalAdminLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content card-admin">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="modalAdminLabel"><i class="bi bi-pencil-square"></i> Gerenciar Produto</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form id="formAdmin">
          <input type="hidden" id="produtoIndex">
          <input type="hidden" id="imagemPath">
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputNome" class="form-label">Nome</label>
              <input type="text" class="form-control" id="inputNome" placeholder="Ex: Feijoada" required>
            </div>
            <div class="col-md-6">
              <label for="inputImagemFile" class="form-label">Imagem</label>
              <input type="file" class="form-control" id="inputImagemFile" accept="image/*">
            </div>
            <div class="col-12">
              <label for="inputDescricao" class="form-label">Descrição</label>
              <textarea class="form-control" id="inputDescricao" rows="3" placeholder="Detalhes do produto" required></textarea>
            </div>
            <div class="col-12">
              <label class="form-label">Tamanhos e Preços</label>
              <div id="sizesContainer" class="mb-2"></div>
              <button type="button" id="btnAddSize" class="btn btn-outline-secondary btn-sm"><i class="bi bi-plus-circle"></i> Adicionar Tamanho</button>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" id="saveBtn" class="btn btn-primary"><i class="bi bi-save"></i> Salvar</button>
      </div>
    </div>
  </div>
</div>

<footer class="footer text-center mt-5">
  <p>Siga-nos nas redes sociais:</p>
  <div class="social-links">
    <a href="#" target="_blank" class="mx-2">
      <i class="bi bi-instagram me-2"></i>Instagram
    </a>
    <a href="#" target="_blank" class="mx-2">
      <i class="bi bi-whatsapp mx-2"></i>WhatsApp
    </a>
    <a href="#" target="_blank" class="mx-2">
      <i class="bi bi-geo-alt"></i> Localização
    </a>
  </div>
  <p>© 2025 Feijoada da Dayse. Todos os direitos reservados.</p>
  <p>Site criado por <strong>C&C</strong>.</p>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="public/js/admin.js"></script> <!-- Verifique se o caminho do script está correto -->
</body>
</html>
