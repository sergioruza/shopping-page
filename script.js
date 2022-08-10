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
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const createProductItemElement = ({ sku, name, image, salePrice }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.querySelector('.item__add').addEventListener('click', () => {
  // createCartItemElement({ sku, name, image }, add);
carrinhoDeCompras.push({ sku, name, salePrice });
  carrinhoDeCompras.forEach((element) => {
  const cartItems = document.querySelector('.cart__items');
  cartItems.appendChild(createCartItemElement(element));
  });
});

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// const renderCar = () => {
//   carrinhoDeCompras.forEach((element) => {
//     const cartItems = document.querySelector('.cart__items');
//     cartItems.appendChild(createCartItemElement())
//   })
// }
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

// const addEvent = () => {
//   const teste = document.querySelectorAll('.item__add');
//   teste.forEach((element) => {
//     element.addEventListener('click', async (event) => {
//       // console.log(event.target);
//       carrinhoDeCompras.push();
//     });
//   });
// };

window.onload = async () => {
  await functionKey();
  addEvent();
};
