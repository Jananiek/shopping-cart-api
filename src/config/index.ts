import dotenv from 'dotenv';
import path from 'path'

const envFound = dotenv.config({
  path: path.resolve(__dirname, `../../${process.env.NODE_ENV}.env`)
});
if (!envFound) {
  // This error should crash whole process
  throw new Error("###  Couldn't find .env file..!  #####");
}

export default {
  /**
   * Environment Variables
   */
  PORT: parseInt(process.env.PORT) || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',

  //this will helps to API versioning and running in parallel without effecting each others
  api: {
    prefix: '/v1',
  },
};
