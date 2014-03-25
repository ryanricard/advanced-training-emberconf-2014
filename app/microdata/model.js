export default Ember.Object.extend({
  init: function(){
    this.$changes = {};
  },

  $mergeChanges: function(){
    $.extend(this.get('$data'), this.get('$changes'));
    this.set('$changes', {});
  }
})