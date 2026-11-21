function arrondirCentimes(montant) {
  return Math.round(montant * 100) / 100;
}

function calculerCommande(articles, remisePourcent = 0) {
  if (!Array.isArray(articles) || articles.length === 0) {
    throw new Error("Le panier doit contenir au moins un article.");
  }

  const remise = Number(remisePourcent);

  if (Number.isNaN(remise) || !Number.isFinite(remise)) {
    throw new Error("La remise doit être un nombre valide.");
  }

  if (remise < 0 || remise > 100) {
    throw new Error("La remise doit être comprise entre 0 et 100 %.");
  }

  let sousTotal = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const prix = Number(article?.prix);
    const quantite = Number(article?.quantite);

    if (
      !article ||
      Number.isNaN(prix) ||
      !Number.isFinite(prix) ||
      prix < 0 ||
      Number.isNaN(quantite) ||
      !Number.isFinite(quantite) ||
      quantite < 0
    ) {
      const nomArticle = article?.nom ?? `index ${i}`;
      throw new Error(`Ligne invalide sur l'article (${nomArticle}).`);
    }

    sousTotal += prix * quantite;
  }

  const montantRemise = (sousTotal * remise) / 100;
  const apresRemise = arrondirCentimes(sousTotal - montantRemise);
  const fraisPort = apresRemise < 50 ? 6 : 0;
  const totalFinal = arrondirCentimes(apresRemise + fraisPort);

  return {
    sousTotal: arrondirCentimes(sousTotal),
    remisePourcent: remise,
    apresRemise,
    fraisPort,
    totalFinal
  };
}

// --- Exemples de test ---
const panierStandard = [
  { nom: "Carte booster", prix: 15, quantite: 2 },
  { nom: "Protège-cartes", prix: 10, quantite: 1 }
];

console.log("Cas standard (remise '20') :", calculerCommande(panierStandard, "20"));
console.log("Cas seuil livraison gratuite :", calculerCommande([{ nom: "Coffret", prix: 50, quantite: 1 }], 0));

try {
  calculerCommande(panierStandard, 120);
} catch (erreur) {
  console.log("Erreur attendue (remise > 100) :", erreur.message);
}
