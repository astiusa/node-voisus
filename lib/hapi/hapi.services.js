var async = require('async');
var util = require('./util');

var api = {};
module.exports = api;

api.host = null;
api.url = null;

api.createServices = function(host) {
  api.host = host;
  api.url = 'https://'+api.host+'/api/';
  return api;
};

api.getServices = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceAeHw = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-hw'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceAeHw = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-hw'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceAeHw = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-hw'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAnzac = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result.anzac, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAnzac = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result.anzac, 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAnzac = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result.anzac, 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceRadiomonServer = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-radiomon-server'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceRadiomonServer = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-radiomon-server'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceRadiomonServer = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-radiomon-server'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceCfimaster = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-cfimaster'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceCfimaster = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-cfimaster'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceCfimaster = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-cfimaster'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceNetmon = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-netmon'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceNetmon = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-netmon'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceNetmon = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-netmon'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceAeSw = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-sw'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceAeSw = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-sw'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceAeSw = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-sw'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceGWorkload = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-g-workload'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceGWorkload = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-g-workload'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceGWorkload = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-g-workload'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceRadio = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-radio'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceRadio = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-radio'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceRadio = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-radio'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceAeConstruct = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-construct'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceAeConstruct = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-construct'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceAeConstruct = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-construct'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceRootD = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-rootd'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceRootD = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-rootd'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceRootD = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-rootd'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceAeLoader = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-loader'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceAeLoader = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-loader'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceAeLoader = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae-loader'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceCreditD = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-creditd'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceCreditD = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-creditd'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceCreditD = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-creditd'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getSimscribe = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result.simscribe, 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putSimscribe = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result.simscribe, 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delSimscribe = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result.simscribe, 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceOperator = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-operator'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceOperator = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-operator'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceOperator = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-operator'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceAmsWeb = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ams-web'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceAmsWeb = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ams-web'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceAmsWeb = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ams-web'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceAe = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceAe = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceAe = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-ae'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceRc = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-rc'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceRc = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-rc'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceRc = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-rc'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceContruct = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-construct'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceContruct = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-construct'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceContruct = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-construct'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceHwDebug = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-hwdebug'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceHwDebug = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-hwdebug'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceHwDebug = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-hwdebug'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceHapi = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-hapi'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceHapi = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-hapi'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceHapi = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-hapi'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceHwRt = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-hwrt'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceHwRt = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-hwrt'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceHwRt = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-hwrt'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.getAceCreditNet = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-credit-net'], 'get', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.putAceCreditNet = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-credit-net'], 'put', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};

api.delAceCreditNet = function(cb) {
  async.waterfall([
    function(cb) {
      util.request(api.url, 'get', cb);
    },
    function(result, cb) {
      util.request(result.services, 'get', cb);
    },
    function(result, cb) {
      util.request(result['ace-credit-net'], 'delete', cb);
    }
  ], function(err, result) {
    if(err) {
      return cb(err);
    }
    cb(null, result);
  });
};