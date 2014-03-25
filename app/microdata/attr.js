export default function(){
  return function(key, value){
    return this.$data[key];
  }.property()
}