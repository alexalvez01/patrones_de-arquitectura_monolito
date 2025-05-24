const db = require("../db/database").getDb(); // Obtener la instancia de la base de datos

class SellModel {
  getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM sells", [], (err, rows) => {
        if (err) {
          reject("Error al obtener ventas: " + err.message);
        } else {
          resolve(rows);
        }
      });
    });
  }

  
  createSells({ name, price }) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO sells (name, price) VALUES (?, ?)",
        [name, price],
        function (err) {
          if (err) {
            reject("Error al agregar Venta: " + err.message);
          } else {
            resolve({ id: this.lastID, name, price });
          }
        }
      );
    });
  }

  // Método para eliminar un producto por ID
  deleteSells(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM sells WHERE id = ?", [id], (err) => {
        if (err) {
          reject("Error al eliminar venta: " + err.message);
        } else {
          resolve({ id });
        }
      });
    });
  }
}

module.exports = SellModel;
