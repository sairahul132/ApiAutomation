const ApiMethods = require("../utility/ApiMethods");
const endpoints = require("../config/endpoints");
const payloads = require("../test-data/payloads");



const api = new ApiMethods();

class BookingAPI {

  async getBookingID(statuscode) {
    try {
      const response = await api.get({
        url: endpoints.url,
        endpoint: endpoints.getbookingid,
        expectedStatus: statuscode
      });
      console.log(JSON.stringify(response.body, null, 2));
      return response.body;
    } catch (error) {
      console.error("BookingAPI Error:", error.message);
      throw error;
    }
  }

  async postCreateBooking(statuscode) {
    try {
      const response = await api.post({
        url: endpoints.url,
        endpoint: endpoints.getbookingid,
        body: payloads.postbooking.booking,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        expectedStatus: statuscode
      });
      console.log(JSON.stringify(response.body, null, 2));
      return response.body;
    } catch (error) {
      console.error("POST: Create Booking Error:", error.message);
      throw error;
    }
  }


}

module.exports = new BookingAPI();
