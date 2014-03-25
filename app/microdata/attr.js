export default function(){
  return function(key, value){
    if(value !== undefined){
      this.$changes[key] = value;
    }
    return this.$changes[key] || this.$data[key];
  }.property('$changes', '$data')
}