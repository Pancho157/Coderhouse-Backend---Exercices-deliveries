const { Users } = require("../../utils/Mongoose-Schemas_Models");

class UserControllerMongo {
  constructor() {}

  async createUser(newUser) {
    const { alias, email, password } = newUser;

    if (!alias || !email || !password) {
      return "Se deben ingresar todos los datos";
    }

    try {
      const emailExists = await Users.find({ email: email });
      const aliasExists = await Users.find({ alias: alias });

      if (emailExists) return "El email ingresado ya existe";
      if (aliasExists) return "El alias ingresado ya existe";
    } catch (err) {
      return err.message;
    }

    try {
      Users.create({ alias: alias, email: email, password: password });
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = { UserControlerMongo };
