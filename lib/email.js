'use strict';

var utilis = require('core-util-is'),
    querystring = require('querystring');

var EmailPattern = RegExp(/[a-z0-9_+&*-]+(?:\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\.)+[a-z]{2,7}/ig);

function maskCircular(data, seen) {
  if (utilis.isString(data)) {
      if (data.indexOf('@') !== -1 || data.indexOf('%40') !== -1) {
          var datastr = querystring.unescape(data);
          datastr = datastr.replace(EmailPattern, 'xxx@xxx.xxx');
          return datastr;
      }
      return data;
  } else if (!utilis.isObject(data)) {
      return data;
  }

  if (seen === null) {
      seen = [ data ];
  } else {
      if (seen.indexOf(data) !== -1)
          return '[Circular]';
      seen.push(data);
  }

  if (Array.isArray(data)) {
      var copy = new Array(data.length);
      for (var i = 0; i < data.length; i++)
          copy[i] = maskCircular(data[i], seen);
      return copy;
  }

  var copy = {};
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = data[key];

      copy[key] = maskCircular(value, seen);
  }
  return copy;
}

function maskEmail(data) {
    return maskCircular(data, null);
}


module.exports = maskEmail;
