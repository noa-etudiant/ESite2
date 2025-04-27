<?php
// Connexion à ta base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "formulaireDB"; // Change avec ton vrai nom de base

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Récupérer les données du formulaire (toujours vérifier qu'elles existent)
$prenom = $_POST['prenom'] ?? '';
$nom = $_POST['nom'] ?? '';
$adresse1 = $_POST['adresse1'] ?? '';
$adresse2 = $_POST['adresse2'] ?? '';
$ville = $_POST['ville'] ?? '';
$region = $_POST['region'] ?? '';
$code_postal = $_POST['code_postal'] ?? '';
$email = $_POST['email'] ?? '';
$indicatif = $_POST['indicatif'] ?? '';
$telephone = $_POST['telephone'] ?? '';

// Utiliser une requête préparée pour éviter les injections SQL
$stmt = $conn->prepare("INSERT INTO commandes (prenom, nom, adresse1, adresse2, ville, region, code_postal, email, indicatif, telephone)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

if ($stmt === false) {
    die("Erreur de préparation : " . $conn->error);
}

// Associer les valeurs aux paramètres
$stmt->bind_param("ssssssssss", $prenom, $nom, $adresse1, $adresse2, $ville, $region, $code_postal, $email, $indicatif, $telephone);

// Exécuter la requête
if ($stmt->execute()) {
    echo "Formulaire enregistré avec succès !";
} else {
    echo "Erreur lors de l'enregistrement : " . $stmt->error;
}

// Fermer la connexion
$stmt->close();
$conn->close();
?>
