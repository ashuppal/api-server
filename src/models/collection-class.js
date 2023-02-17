'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      const record = await this.model.create(json);
      return record;
    } catch (e) {
      console.error('error in the collection interface');
      return e;
    }
  }

  async read(id = null) {
    try {
      if (!id) {
        // get all
        const records = await this.model.findAll();
        return records;
      } else {
        // get by id
        const singleRecord = await this.model.findByPk(id);
        return singleRecord;
      }
    } catch (e) {
      console.error('error in the collection interface');
      return e;
    }
  }

  async update(id, json) {
    try {
      const records = await this.model.update(json, {where: {id}});
      return records;
    } catch (e) {
      console.error('error in the collection interface');
      return e;
    }
  }

  async delete(id) {
    try {
      const records = await this.model.destroy({where: {id}});
      return records;
    } catch (e) {
      console.error('error in the collection interface');
      return e;
    }
  }
  
}

module.exports = Collection;