const { Users } = require("../../utils/Mongoose-Schemas_Models");
const bcrypt = require("bcrypt");

class UserControllerMongo {
  constructor() {}

  async createUser(newUser) {
    const { alias, email, password } = newUser;
    const encriptedPass = bcrypt.hash(password, 15, function (err, hash) {
      return hash;
    });

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
      user = await Users.create({
        alias: alias,
        email: email,
        password: encriptedPass,
      });
    } catch (err) {
      return err.message;
    }

    return { alias: alias };
  }

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

    if (
      // compara la contraseña guardada (si no la encuentra devuelve false)
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
      // compara la contraseña guardada (si no la encuentra devuelve false)
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
    return { alias: false };
  }
}

module.exports = { UserControllerMongo };
