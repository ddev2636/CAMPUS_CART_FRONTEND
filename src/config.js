//const isProduction = process.env.NODE_ENV === "production";
const isProduction = true;

// Set the BASE_URL based on the environment
// export const BASE_URL_PRODUCT = isProduction
//   ? "http://ec2-3-6-87-233.ap-south-1.compute.amazonaws.com/service1"
//   : "http://localhost:5000";
// export const BASE_URL_AUTH = isProduction
//   ? "http://ec2-3-6-87-233.ap-south-1.compute.amazonaws.com/service2"
//   : "http://localhost:5001";
// export const BASE_URL_CLIENT = isProduction
//   ? "http://localhost:3000"
//   : "http//localhost:3000";
export const BASE_URL_PRODUCT = isProduction
  ? "https://n3clt0j1lc.execute-api.ap-south-1.amazonaws.com/prod/service1"
  : "http://localhost:5000";
export const BASE_URL_AUTH = isProduction
  ? "https://n3clt0j1lc.execute-api.ap-south-1.amazonaws.com/prod/service2"
  : "http://localhost:5001";
export const BASE_URL_CLIENT = isProduction
  ? "http://localhost:3000"
  : "http//localhost:3000";
