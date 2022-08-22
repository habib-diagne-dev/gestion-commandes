const connection = require("../config/database")


//Fonction qui retourne tous les produits en stock
exports.getAllProduits = function (req, res) {

    const sql = 'SELECT * FROM produits';

    connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}


//Fonction qui retourne un produit suivant l'ID donné
exports.getProduitByID = function (req, res) {

    const sql = 'SELECT * FROM produits WHERE id = ?';
    const id = req.params.id;

    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}

//Fonction qui ajoute un nouveau produit
exports.addProduit = function (req, res) {

    const sql = 'INSERT INTO produits(nom, description, prix_unitaire, taux_tva, quantite_stock, quantite_alerte, quantite_appro) VALUES(?, ?, ?, ?, ?, ?, ?)';

    const params = [req.body.nom, req.body.description, req.body.prix_unitaire, req.body.taux_tva, req.body.quantite_stock, req.body.quantite_alerte, req.body.quantite_appro]

    connection.query(sql, params, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}

// Fonction qui met à jour les données d'un produit
exports.updateProduit = function (req, res) {

    const sql = 'UPDATE produits SET nom = ?, description = ?, prix_unitaire = ?, taux_tva = ?, quantite_stock = ?, quantite_alerte = ?, quantite_appro = ? WHERE id = ?';

    const params = [req.body.nom, req.body.description, req.body.prix_unitaire, req.body.taux_tva, req.body.quantite_stock, req.body.quantite_alerte, req.body.quantite_appro, req.params.id]

    connection.query(sql, params, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}
