const { Users } = require("../../utils/Mongoose-Schemas_Models");
const bcrypt = require("bcrypt");

class UserControllerMongo {
  constructor() {}

  // * -------------------------- Creación de usuario ----------------------------
  async createUser(alias, email, password) {
    let exists = {};

    // Error al existir el email o alias
    try {
      const emailExists = await Users.find({ email: email });
      const aliasExists = await Users.find({ alias: alias });

      if (emailExists) exists.email = emailExists;
      if (aliasExists) exists.email = aliasExists;
    } catch (err) {
      return err.message;
    }

    if (exists.email || exists.alias) return exists;

    // Guardando el usuario
    try {
      const newUser = new Users({ alias, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
    } catch (err) {
      return err.message;
    }

    // Devuelve el alias para guardarlo en session
    return { newUserAlias: alias };
  }

  // * -------------------------- Auth de usuario ----------------------------
  async verifyUser(userIdentifier, userPassword) {
    // userIdentifier = email || alias
    let emailExists;
    let aliasExists;

    try {
      emailExists = await Users.find({ email: userIdentifier });
      aliasExists = await Users.find({ alias: userIdentifier });
    } catch (err) {
      return err.message;
    }

    // Comparacion de contraseñas (email encontrado)
    if (
      bcrypt.compare(
        userPassword,
        emailExists.password,
        function (err, result) {
          return result;
        }
      )
    ) {
      return { alias: emailExists.alias };
    } else if (
      // Comparacion de contraseñas (alias encontrado)
      bcrypt.compare(
        userPassword,
        aliasExists.password,
        function (err, result) {
          return result;
        }
      )
    ) {
      return { alias: aliasExists.alias };
    }

    // usuario o contraseña incorrecto
    return { alias: undefined };
  }
}

module.exports = { UserControllerMongo };
