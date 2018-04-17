import qs from 'qs'
import md5 from 'md5'
var sign_key = '651b8785f2d4354daa2a6320b3fd4206'

export const getSign = (param) => {
  let jsonSort = {}
  var jsonKeys = Object.keys(param).sort();
  for (let key in jsonKeys) {
    jsonSort[jsonKeys[key]] = param[jsonKeys[key]]
  }
  jsonSort['sign_key'] = sign_key
  return md5(json2Url(jsonSort))
}


export const json2Url = (param) => {
    var tmps = [];
    for (var key in param) {
      tmps.push(key + '=' + param[key]);
    }
    return tmps.join('&');
}

