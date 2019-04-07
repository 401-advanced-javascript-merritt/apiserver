'use strict';

class MongoModel {
  constructor(schema){
    this.schema = schema;
  }
  get(_id){
    let query = _id ? {'id' : _id} : {};
    return this.schema.find(query);
  }
  post(record){
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  put(_id, record){
    return this.schema.findByIdAndUpdate(_id, record, {new : true});
  }
  delete(_id){
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = MongoModel;