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
      await Users.create({ alias: alias, email: email, password: password });
    } catch (err) {
      return err.message;
    }
  }

  async verifyUser(userIdentifier) {
    // userIdentifier = email || alias
    let emailExists;
    let aliasExists;

    try {
      emailExists = await Users.find({ email: userIdentifier });
      aliasExists = await Users.find({ alias: userIdentifier });
    } catch (err) {
      return err.message;
    }

    if (emailExists) {
      return { alias: emailExists.alias };
    } else if (aliasExists) {
      return { alias: aliasExists.alias };
    }

    return { alias: false };
  }
}

module.exports = { UserControllerMongo };
