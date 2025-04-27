function formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + ' €';
}

function loadCart() {
    try {
        const stored = localStorage.getItem('myCart');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Erreur lors du chargement du panier", e);
        return [];
    }
}

function displayOrderSummary() {
    const cartItems = loadCart();
    const resumeContainer = document.getElementById('resume-panier');
    const totalContainer = document.getElementById('total-panier');
    
    resumeContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        resumeContainer.innerHTML = '<li class="empty-cart-message">Votre panier est vide</li>';
        totalContainer.textContent = '';
        return;
    }
    
    let total = 0;
    
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const li = document.createElement('li');
        li.className = 'order-item';
        
        li.innerHTML = `
            <div class="order-item-container">
                <img src="${item.image || '../images/default-product.jpg'}" 
                     alt="${item.name}" 
                     class="order-item-image">
                <div class="order-item-details">
                    <h3 class="order-item-name">${item.name}</h3>
                    <div class="order-item-info">
                        <span>Taille: ${item.size || 'Unique'}</span>
                        <span>Quantité: ${item.quantity}</span>
                    </div>
                    <div class="order-item-prices">
                        <span class="unit-price">${formatPrice(item.price)}/unité</span>
                        <span class="total-price">${formatPrice(itemTotal)}</span>
                    </div>
                </div>
            </div>
        `;
        
        resumeContainer.appendChild(li);
    });
    
    totalContainer.innerHTML = `
        <div class="order-total">
            <span>Total de la commande:</span>
            <span class="total-amount">${formatPrice(total)}</span>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    displayOrderSummary();
    
    const style = document.createElement('style');
    style.textContent = `
        .order-item {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }
        
        .order-item:last-child {
            border-bottom: none;
        }
        
        .order-item-container {
            display: flex;
            gap: 20px;
            align-items: center;
        }
        
        .order-item-image {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid #f0f0f0;
        }
        
        .order-item-details {
            flex: 1;
        }
        
        .order-item-name {
            margin: 0 0 5px 0;
            font-size: 16px;
            color: #333;
        }
        
        .order-item-info {
            display: flex;
            gap: 15px;
            margin-bottom: 8px;
            font-size: 14px;
            color: #666;
        }
        
        .order-item-prices {
            display: flex;
            justify-content: space-between;
        }
        
        .unit-price {
            font-size: 14px;
            color: #888;
        }
        
        .total-price {
            font-weight: bold;
            color: #a0795a;
        }
        
        .order-total {
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 8px;
            margin-top: 20px;
        }
        
        .total-amount {
            font-weight: bold;
            color: #a0795a;
        }
        
        .empty-cart-message {
            text-align: center;
            padding: 30px;
            color: #888;
            font-style: italic;
        }
        
        @media (max-width: 480px) {
            .order-item-container {
                gap: 12px;
            }
            
            .order-item-image {
                width: 60px;
                height: 60px;
            }
            
            .order-item-info {
                flex-direction: column;
                gap: 3px;
            }
        }
    `;
    document.head.appendChild(style);
});