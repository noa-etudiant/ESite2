function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('myCart')) || [];
    const recapItemsList = document.getElementById('recap-items');
    const recapTotal = document.getElementById('recap-total');
    let total = 0;
    
    recapItemsList.innerHTML = '';
    
    if (cartItems.length === 0) {
      recapItemsList.innerHTML = '<li style="text-align: center; padding: 20px;">Votre panier est vide</li>';
      recapTotal.textContent = 'Total : 0,00 €';
      return;
    }
    
    cartItems.forEach((item, index) => {
      const li = document.createElement('li');
      
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div>Taille: ${item.size || 'N/A'}</div>
          <div>Quantité: ${item.quantity}</div>
          <div>Prix: ${item.price.toFixed(2).replace('.', ',')} €</div>
          <button class="remove-item-btn" data-index="${index}">&times;</button>
        </div>
      `;
      
      recapItemsList.appendChild(li);
    });
    
    recapTotal.textContent = `Total : ${total.toFixed(2).replace('.', ',')} €`;
    
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? 'inline' : 'none';
    }
    
    setupRemoveButtons();
  }
  
  function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    
    removeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        removeCartItem(index);
      });
    });
  }
  
  function removeCartItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('myCart')) || [];
    
    if (index >= 0 && index < cartItems.length) {
      cartItems.splice(index, 1);
      
      localStorage.setItem('myCart', JSON.stringify(cartItems));
      
      loadCartItems();
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
      .remove-item-btn {
        position: absolute;
        right: 10px;
        top: 10px;
        background: none;
        border: none;
        font-size: 18px;
        color: #999;
        cursor: pointer;
        padding: 5px;
        transition: color 0.3s;
      }
      
      .remove-item-btn:hover {
        color: #ff4d4d;
      }
      
      .item-details {
        position: relative;
        padding-right: 30px;
      }
    `;
    document.head.appendChild(style);
    
    loadCartItems();
    
    const validateBtn = document.getElementById('validate-btn');
    if (validateBtn) {
      validateBtn.addEventListener('click', function() {
        const cartItems = JSON.parse(localStorage.getItem('myCart')) || [];
        if (cartItems.length === 0) {
          alert('Votre panier est vide!');
        } else {
          window.location.href = '/ESite2/pages/formulaire.html';
        }
      });
    }
  });