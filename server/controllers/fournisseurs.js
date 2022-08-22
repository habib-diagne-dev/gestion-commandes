const connection = require("../config/database")


//Fonction qui retourne tous les fournisseurs de l'entreprise
exports.getAllFournisseurs = function (req, res) {

    const sql = 'SELECT * FROM fournisseurs';

    connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}


//Fonction qui retourne un fournisseur suivant l'ID donné
exports.getFournisseurByID = function (req, res) {

    const sql = 'SELECT * FROM fournisseurs WHERE id = ?';
    const id = req.params.id;

    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}

//Fonction qui ajoute un nouveau fournisseur
exports.addFournisseur = function (req, res) {

    const sql = 'INSERT INTO fournisseurs(nom, addresse, ville, telephone, mobile, email, actif) VALUES(?, ?, ?, ?, ?, ?, ?)';
    const params = [req.body.nom, req.body.addresse, req.body.ville, req.body.telephone, req.body.mobile, req.body.email, 1]

    connection.query(sql, params, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}

//Fonction qui met à jour les données d'un fournisseur
exports.updateFournisseur = function (req, res) {

    const sql = 'UPDATE fournisseurs SET nom = ?, addresse = ?, ville = ?, telephone = ?, mobile = ?, email = ? WHERE id = ?';
    const params = [req.body.nom, req.body.addresse, req.body.ville, req.body.telephone, req.body.mobile, req.body.email, req.params.id]

    connection.query(sql, params, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}

//Fonction qui définit un fournisseur comme étant inactif
exports.lockFournisseur = function (req, res) {

    const sql = 'UPDATE fournisseurs SET actif = ? WHERE id = ?';
    const params = [0, req.params.id];

    connection.query(sql, params, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
    });
}

//Fonction qui définit un fournisseur comme étant actif
exports.unlockFournisseur = function (req, res) {

    const sql = 'UPDATE fournisseurs SET actif = ? WHERE id = ?';
    const params = [true, req.params.id];

    connection.query(sql, params, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
    });
}

