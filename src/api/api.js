import ajax from '@/utils/ajax'

const witUrl = process.env.BASE_URL + '/dappapi/Wit'
const grafanaUrl = process.env.BASE_URL + '/dappapi/Grafana'

export function post(uri, params, type = 0) {
  var url = ''
  switch (type) {
    case 0:
      url = grafanaUrl
      break
    case 1:
      url = witUrl
      break
  }
  return ajax.post(url + uri, params)
}

export function get(params, type = 0) {
  return ajax.get(grafanaUrl + params)
}
