const tables = require("../tables");

const browse = async (req, res) => {
  try {
    const chargePoint = await tables.charge_point.readAll();

    res.json(chargePoint);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const chargePoint = await tables.charge_point.readOne(id);

    res.json(chargePoint);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  getOne,
};
