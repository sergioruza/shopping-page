const getSavedCartItems = () => 
    JSON.parse(localStorage.getItem('cartItems'));
  // console.log('entrou');
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
