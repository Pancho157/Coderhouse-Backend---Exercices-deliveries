const md5 = require("md5");

function loginDTO(data) {
  if (!data.user || !data.password) {
    throw {
      error: "Ingrese todos los datos requeridos (user, password)",
      errorCode: 400,
    };
  }

  return {
    user: data.user,
    password: data.password,
  };
}

function registerDTO(data) {
  return {
    email: data.email,
    alias: data.alias,
    direction: data.direction,
    age: data.age,
    prefix: data.prefix,
    phoneNum: data.phoneNum,
    userCart: [],
    password: md5(data.password),
    pathToPhoto: data.pathToPhoto,
  };
}

function userInfoDTO(data) {
  const { alias, email, direction, age, phoneNum } = data;

  if (!alias || !email || !direction || !age || !phoneNum) {
    throw {
      error:
        "Ingrese todos los datos requeridos (alias, email, direction, age, phoneNum)",
      errorCode: 400,
    };
  }

  let encriptedPhoneNum = String(phoneNum).slice(-2);
  encriptedPhoneNum = parseInt(encriptedPhoneNum);

  return {
    alias: alias,
    email: email,
    direction: direction,
    age: age,
    phoneNum: encriptedPhoneNum,
  };
}

module.exports = { loginDTO, registerDTO, userInfoDTO };
