const passport = require("passport");
const { DAO } = require("../../Persistence/DAOs/DAOselector");
const PassportLocal = require("passport-local").Strategy;

const DAOs = new DAO(process.env.PERS);

// Done parameters = (err, user, pass)
passport.use(
  new PassportLocal(async function (user, userPass, done) {
    let userExists;

    try {
      // user = email || alias
      userExists = await DAO.users.findOne({
        $or: [{ email: user }, { alias: user }],
      });

      if (!userExists) {
        done(null, false, "El usuario ingresado no existe");
      }
    } catch (err) {
      done(err.message, false);
    }

    // Comparacion de contraseñas (email encontrado)
    if (md5(userPass) == userExists.password) {
      done(null, { alias: userExists.alias });
    }

    // usuario o contraseña incorrecto
    done(null, false, "Contraseña incorrecta");
  })
);

passport.serializeUser((user, done) => {
  done(null, user.alias);
});

passport.deserializeUser(async (alias, done) => {
  const user = await DAO.users.findOne({ alias: alias });
  done(null, user);
});
