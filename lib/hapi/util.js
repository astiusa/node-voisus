var rest = require('restler');

exports.request = function(url, type, data, cb) {
  if (typeof data === 'function') {
    cb = data;
    data = null;
  }
  if (type === 'get') {
    rest.get(url).on('complete', function(result) {
      if (result instanceof Error) {
        console.log('Error: '+ result.message);
        return cb(result);
      }
      cb(null, result);
    });
  }
  else if (type === 'post') {
    rest.post(url, {data: data}).on('complete', function(result) {
      if (result instanceof Error) {
        console.log('Error: '+ result.message);
        return cb(result);
      }
      cb(null, result);
    });
  }
  else if (type === 'put') {
    rest.put(url, {data: data}).on('complete', function(result) {
      if (result instanceof Error) {
        console.log('Error: '+ result.message);
        return cb(result);
      }
      cb(null, result);
    });
  }
  else if (type === 'delete') {
    rest.del(url).on('complete', function(result) {
      if (result instanceof Error) {
        console.log('Error: '+ result.message);
        return cb(result);
      }
      cb(null, result);
    });
  }
};
    