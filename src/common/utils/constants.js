const constants = {
  HOST_URL: process.env.REACT_APP_HOST_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin':'*',
  },
  pageSizeOptions:[7,14,50,100],
}

export default constants;