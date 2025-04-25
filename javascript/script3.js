document.addEventListener('DOMContentLoaded', function () {
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
    warning.style.position = 'fixed';
    warning.style.top = '10px';
    warning.style.left = '50%';
    warning.style.transform = 'translateX(-50%)';
    warning.style.backgroundColor = '#ffcc00';
    warning.style.padding = '10px';
    warning.style.borderRadius = '5px';
    warning.style.zIndex = '1000';
    warning.textContent = "⚠️ Votre navigateur ne supporte pas le stockage local. Certaines fonctionnalités peuvent être limitées.";
    document.body.appendChild(warning);
  }

  testStorageAvailability();

  const sliderContainer = document.querySelector('.slider-container');
  const slideshowButtons = document.querySelectorAll('.slideshow-buttons span');
  const prevButton = document.querySelector('.slider-prev');
  const nextButton = document.querySelector('.slider-next');
  const totalSlides = document.querySelectorAll('.slider-container img').length;
  let currentSlide = 0;

  function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    slideshowButtons.forEach((button, index) => {
      button.classList.toggle('focus', index === currentSlide);
    });
  }

  prevButton?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  nextButton?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  });

  slideshowButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      currentSlide = index;
      updateSlider();
    });
  });

  const sizeSpans = document.querySelectorAll('.sizes span');
  sizeSpans.forEach(span => {
    span.addEventListener('click', () => {
      sizeSpans.forEach(s => s.classList.remove('focus'));
      span.classList.add('focus');
    });
  });

  let quantity = 1;
  const quantityDisplay = document.getElementById('quantity');
  const increaseBtn = document.getElementById('increase');
  const decreaseBtn = document.getElementById('decrease');

  increaseBtn?.addEventListener('click', () => {
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  decreaseBtn?.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });

  const addButton = document.querySelector('.add');
  const cartCount = document.getElementById('cart-count');
  const cartPanel = document.getElementById('cart-panel');
  const cartItemsList = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');
  const cartTotal = document.getElementById('cart-total');
  cartPanel.style.display = 'none';

  const itemPrice = 39.9;
  let cartItems = 0;
  let totalPrice = 0;

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

  let cartData = loadCart();

  function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    cartItems = 0;
    totalPrice = 0;

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
          <small>Size ${item.size} | Total: ${formatPrice(itemTotal)}</small>
        </div>
        <button class="remove-btn" title="Retirer">✖</button>
      `;

      li.querySelector('.remove-btn').addEventListener('click', () => {
        cartData.splice(index, 1);
        saveCart(cartData);
        updateCartDisplay();
      });

      cartItemsList.appendChild(li);
    });

    cartCount.textContent = cartItems;
    cartCount.style.display = cartItems > 0 ? "inline-block" : "none";
    cartTotal.textContent = `Total Price : ${formatPrice(totalPrice)}`;
  }

  updateCartDisplay();

  addButton?.addEventListener('click', (e) => {
    const selectedSize = document.querySelector('.sizes .focus');
    if (!selectedSize) {
      e.preventDefault();
      alert("Please select a size before adding to cart.");
      return;
    }

    const newItem = {
      name: "Sandal",
      size: selectedSize.textContent,
      quantity: quantity,
      price: itemPrice,
      image: "/images/sandal.png"
    };

    cartData.push(newItem);
    saveCart(cartData);
    updateCartDisplay();

    quantity = 1;
    quantityDisplay.textContent = quantity;
  });

  const cartLink = document.querySelector('a[href="#cart"]');
  if (cartLink) {
    cartLink.addEventListener('click', (e) => {
      e.preventDefault();
      cartPanel.style.display = cartPanel.style.display === 'none' ? 'block' : 'none';
    });
  }

  checkoutBtn?.addEventListener('click', () => {
    if (cartItemsList.children.length === 0) {
      alert("Your shopping cart is empty!");
    } else {
      alert("Thank you for your order!");
      cartData = [];
      saveCart(cartData);
      updateCartDisplay();
      cartPanel.style.display = 'none';
    }
  });
});