const AbstractManager = require("./AbstractManager");

class CarManager extends AbstractManager {
  constructor() {
    super({ table: "car" });
  }

  async create(carType, userId) {
    const [result] = await this.database.query(
      `insert into ${this.table} (car_type_id, user_id) values (?,?)`,
      [carType, userId]
    );
    return result;
  }

  async delete(carId) {
    const [result] = await this.database.query(
      `delete from ${this.table} WHERE id = ?`,
      [carId]
    );
    return result;
  }

  async getCarByUserId(userId) {
    const [result] = await this.database.query(
      `SELECT car.id, car.car_type_id, car.user_id, car_type.brand, car_type.model, car_type.max_power, car_type.plug_type
      FROM car
      INNER JOIN car_type ON car.car_type_id = car_type.id
      WHERE car.user_id = ?;`,
      [userId]
    );
    return result;
  }

  async getAllCars() {
    const [result] = await this.database.query(`SELECT * FROM car_type`);
    return result;
  }

  async getAvailableCar(userId) {
    const [result] = await this.database.query(
      `SELECT car.*, car_type.brand, car_type.model
    FROM car
    JOIN car_type ON car.car_type_id = car_type.id
    LEFT JOIN booking_list ON car.id = booking_list.car_id AND booking_list.car_id IS NOT NULL
    WHERE car.user_id = ?
      AND booking_list.car_id IS NULL;
    `,
      [userId]
    );
    return result;
  }
}

module.exports = CarManager;
