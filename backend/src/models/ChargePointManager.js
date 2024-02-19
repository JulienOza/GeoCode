const AbstractManager = require("./AbstractManager");

class chargePointManager extends AbstractManager {
  constructor() {
    super({ table: "charge_point" });
  }

  async readAll() {
    const [rows] = await this.database
      .query(`SELECT operator_name, max_power, accessibility, station_id, station_name, adress, y_latitude, x_longitude, pt.name AS plug_type, charge_point_id_fr 
      FROM ${this.table} as c
      INNER JOIN station as s ON c.station_id = s.station_id_fr
      INNER JOIN list_plug_type as lpt ON  lpt.charge_point_id=c.charge_point_id_fr
      INNER JOIN plug_type as pt ON pt.id=lpt.plug_type_id`);

    return rows;
  }

  async readOne(id) {
    const [rows] = await this.database.query(
      `SELECT station.*, c.*, pt.*
      FROM ${this.table} AS c
      INNER JOIN station ON c.station_id = station.station_id_fr
      INNER JOIN list_plug_type as lpt ON  lpt.charge_point_id=c.charge_point_id_fr
      INNER JOIN plug_type as pt ON pt.id=lpt.plug_type_id
      WHERE station_id = ?;`,
      [id]
    );

    return rows[0];
  }
}

module.exports = chargePointManager;
