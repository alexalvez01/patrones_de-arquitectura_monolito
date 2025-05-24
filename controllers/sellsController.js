const SellModel = require("../models/SellsModel");
const sellModel = new SellModel();

exports.getAll = async (req, res) => {
  try {
    const sells = await sellModel.getAll();
    res.render("sells", { sells });
  } catch (error) {
    return res.status(500).json({ error: "Error al crear venta" });
  }
};

exports.create = async (req, res) => {
  const { name, price } = req.body;
  try {
    await sellModel.createSells({ name, price });
    res.redirect("/sells");
  } catch (error) {
    return res.status(500).json({ error: "Error al crear venta" });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await sellModel.deleteSells(id);
    res.redirect("/sells");
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar venta" });
  }
};
