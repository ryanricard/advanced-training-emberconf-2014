function buildRecord(type, data, store) {
  var containerKey = 'model:' + type;

  var factory = store.container.lookupFactory(containerKey);

  var record = factory.create({
    id: data.id.toString(),
    $data: data
  });

  var id = data.id;

  identityMapForType(type, store)[id] = record;

  return record;
}

function identityMapForType(type, store) {
  var typeIdentityMap = store.get('identityMap');

  typeIdentityMap[type] = typeIdentityMap[type] || {};

  return typeIdentityMap[type];
}

export default Ember.Object.extend({
  init: function() {
    this.set('identityMap', {});
  },

  push: function(type, data) {
    Ember.assert("Payload is missing an id.", data.id);

    var record = this.getById(type, data.id);

    if (record) {
      record.set('$data', data);
    } else {
      record = buildRecord(type, data, this);
    }

    return record;
  },

  getById: function(type, id) {
    var identityMap = identityMapForType(type, this);

    return identityMap[id] || null;
  },

  find: function(type, id){
    return new Promise(function(resolve, reject){
      resolve(this.getById(type, id));
    });
  }
})