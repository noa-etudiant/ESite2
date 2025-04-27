function formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + ' €';
}

function loadCart() {
    try {
        const stored = localStorage.getItem('myCart');
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
    } catch (e) {
        console.warn("⚠️ Impossible de charger le panier", e);
        return [];
    }
}

function afficherResumePanier() {
    const cartData = loadCart();
    const resumePanier = document.getElementById('resume-panier');
    const totalPanier = document.getElementById('total-panier');
    let totalPrice = 0;

    if (cartData.length === 0) {
        resumePanier.innerHTML = '<li>Votre panier est vide.</li>';
        totalPanier.textContent = '';
        return;
    }

    resumePanier.innerHTML = '';

    cartData.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const li = document.createElement('li');
        li.innerHTML = `${item.quantity} × ${item.name} - ${formatPrice(item.price)} (Taille ${item.size}) | Total : ${formatPrice(itemTotal)}`;
        resumePanier.appendChild(li);
    });

    totalPanier.textContent = `Total panier : ${formatPrice(totalPrice)}`;
}

document.addEventListener('DOMContentLoaded', afficherResumePanier);
