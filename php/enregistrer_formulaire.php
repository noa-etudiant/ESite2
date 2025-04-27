<?php
session_start();

// Stocke les infos du formulaire dans la session
$_SESSION['commande'] = [
    'prenom' => $_POST['prenom'],
    'nom' => $_POST['nom'],
    'adresse1' => $_POST['adresse1'],
    'adresse2' => $_POST['adresse2'],
    'ville' => $_POST['ville'],
    'region' => $_POST['region'],
    'code_postal' => $_POST['code_postal'],
    'email' => $_POST['email'],
    'indicatif' => $_POST['indicatif'],
    'telephone' => $_POST['telephone']
];

// Redirige vers la page paiement
header('Location: ../pages/paiement.php');
exit;
?>
