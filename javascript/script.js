type="text/javascript">
    document.addEventListener("DOMContentLoaded", function() {
        VanillaTilt.init(document.querySelectorAll(".card"), {
            max: 25,
            speed: 5000,
            glare: true,
            "max-glare": 0.5,
        });
    });



  document.addEventListener('DOMContentLoaded', function () {
  testStorageAvailability();
  
  const cartCount = document.getElementById('cart-count');
  const cartPanel = document.getElementById('cart-panel');
  const cartItemsList = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');
  const cartTotal = document.getElementById('cart-total');

  function formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + ' €';
  }

  function saveCart(cart) {
    try {
      localStorage.setItem('myCart', JSON.stringify(cart));
      const verification = localStorage.getItem('myCart');
      if (!verification) {
        console.warn("⚠️ La sauvegarde paraît avoir échoué - aucune donnée récupérée");
      }
    } catch (e) {
      console.warn("⚠️ localStorage sauvegarde échouée", e);
      try {
        sessionStorage.setItem('myCart', JSON.stringify(cart));
      } catch (e2) {
        console.error("❌ Impossible de sauvegarder le panier", e2);
      }
    }
  }

  function loadCart() {
    try {
      const stored = localStorage.getItem('myCart');
      if (stored) {
        return JSON.parse(stored);
      }
      
      const storedSession = sessionStorage.getItem('myCart');
      if (storedSession) {
        return JSON.parse(storedSession);
      }
      
      return [];
    } catch (e) {
      console.warn("⚠️ Erreur d'accès au stockage", e);
      return [];
    }
  }

  function updateCartDisplay() {
    const cartData = loadCart();
    cartItemsList.innerHTML = '';
    let cartItems = 0;
    let totalPrice = 0;

    cartData.forEach((item, index) => {
      cartItems += item.quantity;
      totalPrice += item.quantity * item.price;

      const li = document.createElement('li');
      li.setAttribute('data-index', index);
      li.setAttribute('data-quantity', item.quantity);
      const itemTotal = item.quantity * item.price;
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          ${item.quantity}x ${item.name} – ${formatPrice(item.price)}<br>
          <small>Taille ${item.size} | Total: ${formatPrice(itemTotal)}</small>
        </div>
        <button class="remove-btn" title="Retirer">✖</button>
      `;


      li.querySelector('.remove-btn').addEventListener('click', () => {
        const updatedCart = loadCart();
        updatedCart.splice(index, 1);
        saveCart(updatedCart);
        updateCartDisplay();
      });

      cartItemsList.appendChild(li);
    });

    cartCount.textContent = cartItems;
    cartCount.style.display = cartItems > 0 ? "inline-block" : "none";
    cartTotal.textContent = `Prix Total : ${formatPrice(totalPrice)}`;
  }

  updateCartDisplay();

  const cartLink = document.querySelector('a[href="#cart"]');
  if (cartLink) {
    cartLink.addEventListener('click', (e) => {
      e.preventDefault();
      cartPanel.style.display = cartPanel.style.display === 'none' ? 'block' : 'none';
    });
  }

  checkoutBtn.addEventListener('click', () => {
    const cartData = loadCart();
    if (cartData.length === 0) {
      alert("Your shopping cart is empty!");
    } else {
      alert("Thank you for your order!");
      saveCart([]);
      updateCartDisplay();
      cartPanel.style.display = 'none';
    }
  });
});

function testStorageAvailability() {
  const testKey = 'test_storage';
  try {
    localStorage.setItem(testKey, 'test');
    if (localStorage.getItem(testKey) === 'test') {
      localStorage.removeItem(testKey);
      console.log('✅ localStorage disponible');
      return true;
    }
    return false;
  } catch (e) {
    console.warn('⚠️ localStorage indisponible', e);
    displayStorageWarning();
    return false;
  }
}

function displayStorageWarning() {
  const warning = document.createElement('div');
  warning.style.cssText = 'position:fixed; top:10px; left:50%; transform:translateX(-50%); background:#fff3cd; color:#856404; padding:10px 20px; border-radius:5px; box-shadow:0 2px 5px rgba(0,0,0,0.2); z-index:9999; text-align:center;';
  warning.innerHTML = 'Attention : le stockage local est désactivé ou inaccessible. Votre panier ne sera pas conservé entre les sessions.';
  document.body.appendChild(warning);
  
  setTimeout(() => {
    warning.style.opacity = '0';
    warning.style.transition = 'opacity 1s';
    setTimeout(() => warning.remove(), 1000);
  }, 5000);
}
