<?php
session_start();

// Vérifier qu'il y a bien des informations
if (!isset($_SESSION['commande'])) {
    echo "Aucune commande en cours.";
    exit;
}

// Récupérer les infos stockées dans la session
$commande = $_SESSION['commande'];
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Paiement</title>
    <link rel="stylesheet" href="../css/style2.css"> <!-- ton style habituel -->
    <link rel="stylesheet" href="../css/stylepanier.css">
    <link rel="stylesheet" href="../css/styleform.css">
    <link rel="stylesheet" href="../css/stylepaiement.css"> <!-- ton style habituel -->
    <script src="../javascript/résumé-panier.js"></script>
    <script src="https://www.paypal.com/sdk/js?client-id=TON_CLIENT_ID&currency=EUR"></script>
</head>
<body>

    <nav>
        <div class="logo">LOGO</div>
        <ul class="nav-links">
          <li><a href="../index.html">Boutique</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
    </nav>
      <div id="cart-panel" class="cart-panel">
        <h3>🛒 Mon panier</h3>
        <ul id="cart-items" class="cart-items"></ul>
        <div id="cart-total" class="cart-total">Prix Total: 0€</div>
        <button id="checkout-btn" class="checkout-btn">Voir le panier</button>
      </div>

<h1>Résumé de vos informations</h1>

<div class="resume-commande">
    <p><strong>Prénom :</strong> <?php echo htmlspecialchars($commande['prenom']); ?></p>
    <p><strong>Nom :</strong> <?php echo htmlspecialchars($commande['nom']); ?></p>
    <p><strong>Adresse :</strong> <?php echo htmlspecialchars($commande['adresse1']); ?> <?php echo htmlspecialchars($commande['adresse2']); ?></p>
    <p><strong>Ville :</strong> <?php echo htmlspecialchars($commande['ville']); ?></p>
    <p><strong>Pays :</strong> <?php echo htmlspecialchars($commande['region']); ?></p>
    <p><strong>Code Postal :</strong> <?php echo htmlspecialchars($commande['code_postal']); ?></p>
    <p><strong>Email :</strong> <?php echo htmlspecialchars($commande['email']); ?></p>
    <p><strong>Téléphone :</strong> <?php echo htmlspecialchars($commande['indicatif']) . ' ' . htmlspecialchars($commande['telephone']); ?></p>
</div>

<h2>Résumé de vos articles</h2>
<ul id="resume-panier"></ul>

<p id="total-panier"></p>


<div id="paypal-button-container"></div>

<!-- Simuler un bouton de paiement -->
<form action="../php/valider_commande.php" method="POST">
    <button type="submit">Payer maintenant</button>
</form>

<footer class="footer">
    <div class="social-icons">
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-snapchat-ghost"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-facebook-f"></i></a>
    </div>
    
    <div class="nav-links2">
        <a href="../index.html">Home</a>
        <a href="../pages/mentions-legales.html">Mentions Légales</a>
        <a href="../pages/CGV.html">Conditions Générales</a>
        <a href="../pages/Politique-de-Confidentialité.html">Politique de confidentialité</a>
    </div>
    
    <div class="copyright">
      Ma boutique © 2025
    </div>
  </footer>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
  <script src="../javascript/script2.js"></script>
  <script src="../javascript/paiement.js"></script>


</body>
</html>
