// const { fetchProducts } = require('./helpers/fetchProducts');

// const { fetchItem } = require("./helpers/fetchItem");
const carrinhoDeCompras = [];

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
  
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const renderCart = () => {
  const cartItems = document.querySelector('.cart__items');
cartItems.innerHTML = '';
  carrinhoDeCompras.forEach((element) => {
  cartItems.appendChild(createCartItemElement(element));
  });
};
const createProductItemElement = ({ sku, name, image, salePrice }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.querySelector('.item__add').addEventListener('click', () => {
carrinhoDeCompras.push({ sku, name, salePrice });
    renderCart();
});
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const functionKey = async () => {
  const items = document.querySelector('.items');
  const fetch = await fetchProducts('computador');
  fetch.results.forEach((element) => {
    // const { id: sku, title: name, thumbnail: image } = element;
    const guarda = createProductItemElement({ sku: element.id,
      name: element.title, 
      image: element.thumbnail, 
      salePrice: element.price });
    items.appendChild(guarda);
  });
};

window.onload = async () => {
  await functionKey();
  addEvent();
};
