<?php
session_start();

// Vérifier s'il y a des données dans la session
if (!isset($_SESSION['commande'])) {
    die("Erreur : aucune commande trouvée.");
}

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "formulaireDB"; // À adapter si besoin

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Récupérer les données
$commande = $_SESSION['commande'];

$prenom = $commande['prenom'];
$nom = $commande['nom'];
$adresse1 = $commande['adresse1'];
$adresse2 = $commande['adresse2'];
$ville = $commande['ville'];
$region = $commande['region'];
$code_postal = $commande['code_postal'];
$email = $commande['email'];
$indicatif = $commande['indicatif'];
$telephone = $commande['telephone'];

// Préparer la requête SQL sécurisée
$stmt = $conn->prepare("INSERT INTO commandes (prenom, nom, adresse1, adresse2, ville, region, code_postal, email, indicatif, telephone)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

if ($stmt === false) {
    die("Erreur de préparation de la requête : " . $conn->error);
}

// Associer les variables
$stmt->bind_param("ssssssssss", $prenom, $nom, $adresse1, $adresse2, $ville, $region, $code_postal, $email, $indicatif, $telephone);

// Exécuter l'insertion
if ($stmt->execute()) {
    echo "✅ Votre commande a été enregistrée après paiement !";
} else {
    echo "Erreur lors de l'enregistrement : " . $stmt->error;
}

// Nettoyer
$stmt->close();
$conn->close();

// Vider la session pour éviter un double envoi
unset($_SESSION['commande']);
?>
