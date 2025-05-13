document.addEventListener('DOMContentLoaded', () => {
  // Função para carregar os produtos do backend
  const loadProducts = async () => {
    try {
      const response = await fetch('https://feijoada-da-dayse.onrender.com/assets/produtos');
      if (!response.ok) {
        throw new Error('Erro ao carregar os produtos');
      }

      const products = await response.json();
      
      // Aqui você irá criar os elementos HTML dinamicamente para os produtos
      const productList = document.getElementById('productList');
      productList.innerHTML = '';  // Limpa a lista de produtos

      products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('col-md-4', 'mb-4');  // Estilos Bootstrap, pode adaptar

        // Adiciona conteúdo HTML dos produtos
        productItem.innerHTML = `
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <a href="#" class="btn btn-primary">Adicionar ao Carrinho</a>
            </div>
          </div>
        `;

        // Adiciona o produto na lista
        productList.appendChild(productItem);
      });
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  loadProducts();  // Chama a função para carregar os produtos na página
});
