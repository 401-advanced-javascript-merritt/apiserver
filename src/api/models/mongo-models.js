'use strict';

class MongoModel {
  constructor(schema){
    this.schema = schema;
  }
  /**
   * Gets the values from the database, at the given id if there is one.
   * @param  {} _id
   * @param  {}:{};returnthis.schema.find(query} {letquery=_id?{'id'
   */
  get(_id){
    let query = _id ? {'id' : _id} : {};
    return this.schema.find(query);
  }
  /**
   * Post a record to the database.
   * @param  {} record
   * @param  {} {letnewRecord=newthis.schema(record
   * @param  {} ;returnnewRecord.save(
   */
  post(record){
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  /**
   * Update an existing value in the database at the given ID.
   * @param  {} _id
   * @param  {} record
   * @param  {} {returnthis.schema.findByIdAndUpdate(_id
   * @param  {} record
   * @param  {} {new
   */
  put(_id, record){
    return this.schema.findByIdAndUpdate(_id, record, {new : true});
  }
  /**
   * Delete a value from the database at the given id.
   * @param  {} _id
   * @param  {} {returnthis.schema.findByIdAndDelete(_id
   */
  delete(_id){
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = MongoModel;