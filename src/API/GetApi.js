const ApiMethods = require("../utility/ApiMethods");
const endpoints = require("../config/endpoints");
const payloads = require("../test-data/payloads");


class GETAPI {

  async getBookingID(statuscode) {
    try {
      const response = await ApiMethods.get({
        url: endpoints.url,
        endpoint: endpoints.getbookingid,
        expectedStatus: statuscode
      });

      return response.body;
    } catch (error) {
      console.error("Get Booking ID Error:", error.message);
      throw error;
    }
  }

  async getBookingDetails(enterBokkingID,statuscode) {
    try {
      const response = await ApiMethods.get({
        url: endpoints.url,
        endpoint: endpoints.getbookingdetils+enterBokkingID,
        expectedStatus: statuscode
      });

      return response.body;
    } catch (error) {
      console.error("Get Booking ID Error:", error.message);
      throw error;
    }
  }

}
module.exports = new GETAPI();