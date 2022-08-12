const cartItems = document.querySelector('.cart__items');
let carrinhoDeCompras = [];
const btnLimpa = document.querySelector('.empty-cart');

const addValorTotal = (soma) => { // --------------------------------------------------------------------> referenciando dicas e ajuda de Anderson Nunes
  const somaTotal = document.querySelector('.total-price');
  somaTotal.innerHTML = soma;
};

 const somaDoCart = () => { // --------------------------------------------------------------------> referenciando dicas e ajuda de Anderson Nunes
  const items = document.querySelectorAll('.cart__items li');
  let totalSoma = 0;
  for (let i = 0; i < items.length; i += 1) {
    const numeroDoProduto = parseFloat(items[i].innerText.split('$')[1]);
    totalSoma += numeroDoProduto;
  }
  addValorTotal(totalSoma);
 };

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(carrinhoDeCompras); // --------------------------------------------------------------------> referenciando ajuda de Guthias
  somaDoCart(); // --------------------------------------------------------------------> referenciando ajuda de [mentoria] - André Horman
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const renderCart = async (id) => {
  const produto = await fetchItem(id);
  const li = createCartItemElement({ sku: id, 
    name: produto.title, 
    salePrice: produto.price });
    carrinhoDeCompras.push({ sku: id, 
      name: produto.title, 
      salePrice: produto.price });
  cartItems.appendChild(li); // --------------------------------------------------------------------> referenciando ajuda de Guthias
  saveCartItems(carrinhoDeCompras);
  somaDoCart();
};

const renderStorage = () => {
  cartItems.innerHTML = '';
  carrinhoDeCompras.forEach((element) => {
    const elementosCart = createCartItemElement(element);
    cartItems.appendChild(elementosCart);
  });
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.querySelector('.item__add').addEventListener('click', () => {
    renderCart(sku);
});
  return section;
};

const functionKey = async () => {
  const items = document.querySelector('.items');
  const fetch = await fetchProducts('computador');
  const loading = document.querySelector('.loading');
  loading.remove(); // --------------------------------------------------------------------> referenciando ajuda e dicas de Anderson Nunes
  fetch.results.forEach((element) => {
    const guarda = createProductItemElement({ sku: element.id, // -------------------------------------------> refenciando ajuda de Arthur Debiasi
      name: element.title, 
      image: element.thumbnail, 
      salePrice: element.price });
    items.appendChild(guarda);
  });
};

btnLimpa.addEventListener('click', () => {
  const total = document.querySelector('.total-price');
  localStorage.clear();
  cartItems.innerHTML = '';
  total.innerHTML = '';
});

window.onload = async () => {
  await functionKey();
  carrinhoDeCompras = getSavedCartItems() || [];
  renderStorage();
};
