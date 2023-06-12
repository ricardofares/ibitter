///
/// Configuration Module
///
///

// Server method for communication (e.g., 'http', 'https')
const serverMethod = 'http';

// Server address where the API is hosted
const serverAddress = '192.168.100.7';

// Server port on which the API is running
const serverPort = 5000;

// Complete API URL including the server method, address, and port
const apiUrl = `${serverMethod}://${serverAddress}:${serverPort}`;

// Exporting the configuration settings as an object
export default {
  serverMethod,
  serverAddress,
  serverPort,
  apiUrl
};

