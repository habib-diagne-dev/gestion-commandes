const connection = require("../config/database")


//Fonction qui retourne tous les départements
exports.getAllDepartements = function (req, res) {

    const sql = 'SELECT * FROM departements';

    connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}

//Fonction qui retourne un département suivant l'ID donné
exports.getDepartementByID = function (req, res) {

    const sql = 'SELECT * FROM departements WHERE id=?';
    const id = req.params.id;

    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}

//Fonction qui crée un nouveau département
exports.createDepartement = function (req, res) {

    const sql = 'INSERT INTO departements(nom_dept, code_dept) VALUES(?,?)';
    const id = req.params.id;
    const departement = [req.body.nom_dept, req.body.code_dept]

    connection.query(sql, departement, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}

//Fonction qui met à jour les données d'un département
exports.updateDepartement = function (req, res) {

    const sql = 'UPDATE departements SET nom_dept = ?, code_dept = ? WHERE id = ?';
    const params = [req.params.nom_dept, req.params.code_dept, req.params.id];

    connection.query(sql, params, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results)
    });
}

//Fonction qui supprime un département
exports.deleteDepartement = function (req, res) {

    const sql = 'DELETE FROM departements WHERE id = ?';
    const params = [req.params.id];

    connection.query(sql, params, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        return res.send(results.affectedRows)
    });
}

