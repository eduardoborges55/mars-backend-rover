// config/cors.js

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Origin
  |--------------------------------------------------------------------------
  |
  | Set a list of origins to be allowed. The value can be one of the following
  |
  | Boolean: true - Allow current request origin
  | Boolean: false - Disallow all
  | String - Comma separated list of allowed origins
  | Array - An array of allowed origins
  | String: * - A wildcard to allow current request origin
  | Function - Receives the current origin and should return one of the above values.
  |
  */
  origin: 'http://localhost:8080', // Substitua com a URL do seu frontend Vue.js
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  headers: true,
  exposeHeaders: false,
  credentials: false,
  maxAge: 90,
};
