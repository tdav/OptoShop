Array.prototype.sum = function(prop) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i][prop];
  }
  return total;
};

Array.prototype.sumDistProducts = function() {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i].price * this[i].qty;
  }
  return total;
};
