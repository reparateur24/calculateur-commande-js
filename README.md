# Calculateur de commande & garde-fous (JavaScript)

Module JavaScript (`index.js`) dédié au calcul d'un total de commande (sous-total, remise en pourcentage, frais de port selon seuil et total final) avec validation des entrées et arrondi au centime.

## Ce que fait `index.js`
- **Validation du panier :** vérifie que `articles` est un tableau non vide et que chaque ligne possède un `prix` et une `quantite` numériques valides et positifs ou nuls.
- **Validation et conversion de la remise :** convertit `remisePourcent` (par défaut `0`) en nombre, bloque les valeurs non finies ou hors de l'intervalle `0` à `100 %`.
- **Calcul du total et des frais de port :** calcule le sous-total, applique la remise, arrondit les montants avec `arrondirCentimes`, puis applique `6 €` de frais de port si le montant après remise est strictement inférieur à `50 €` (`0 €` sinon).
- **Exemples inclus :** exécute directement quelques scénarios de démonstration (remise passée en texte `"20"`, seuil de livraison gratuite et rejet d'une remise supérieure à `100`).

## Lancer le fichier en local
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/reparateur24/calculateur-commande-js.git(https://github.com/reparateur24/calculateur-commande-js.git)

