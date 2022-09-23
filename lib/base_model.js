class BaseModel {

  constructor(data) {
    this.attributes = {};
    if(data) {
      this.loadData(data);
    }
  }

  loadData(data) {
    this.id = data.id;
    this.attributes = data;
    return this;
  }

  get(name) {
    return this.attributes.hasOwnProperty(name) ? this.attributes[name] : null;
  }

  set(name, value) {
    return this.attributes[name] = value;
  }

}

export default BaseModel;
