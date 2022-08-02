const fs = require("fs");

class Contenedor {
  constructor(file, fields, unique) {
    this.file = file;
    this.fields = fields;
    this.unique = unique;
  }

  isItemOk(item) {
    if (Object.keys(item).length !== this.fields.length) {
      return false;
    }
    let isOk = true;
    for (let f of this.fields) {
      if (!item.hasOwnProperty(f)) {
        isOk = false;
        break;
      }
    }
    return isOk;
  }

  isUnique(colection, item) {
    let flag = true;
    for (let obj of colection) {
      if (obj[this.unique] === item[this.unique]) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  async getAll() {
    try {
      const content = await fs.promises.readFile(this.file, "utf-8");
      const response = JSON.parse(content);
      let isArray = Array.isArray(response);
      if (!isArray) {
        throw new Error("El formato del archivo no es el esperado");
      }
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }

  async save(item) {
    if (!this.isItemOk(item)) {
      throw new Error("El objeto no tiene el formato esperado");
    }
    try {
      const content = await this.getAll();
      if (!this.isUnique(content, item)) {
        throw new Error("Error: item duplicado");
      }
      const ids = content.map((item) => item.id);
      const newItem = { ...item };
      if (ids.length === 0) {
        newItem.id = 1;
      } else {
        newItem.id = Math.max(...ids) + 1;
      }
      content.push(newItem);
      await fs.promises.writeFile(this.file, JSON.stringify(content, null, 2));
      return newItem.id;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      const item = content.filter((item) => item.id === id);
      if (item.length === 0) {
        return null;
      }
      return item[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByField(field, value) {
    try {
      const content = await this.getAll();
      const items = content.filter((item) => item[field] === value);
      if (items.length === 0) {
        return null;
      }
      return items[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(id) {
    try {
      const content = await this.getAll();
      const items = content.filter((item) => item.id !== id);
      if (content.length !== items.length) {
        fs.promises.writeFile(this.file, JSON.stringify(items, null, 2));
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteAll() {
    try {
      const content = [];
      fs.promises.writeFile(this.file, JSON.stringify(content, null, 2));
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = { Contenedor };
