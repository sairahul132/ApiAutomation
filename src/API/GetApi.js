const ApiMethods = require("../utility/ApiMethods");
const endpoints = require("../config/endpoints");

class GETAPI {

    constructor(world = null) {
        this.api = new ApiMethods(world);
        this.world = world;
    }

    async getBookingID(statuscode = 200) {
        try {

            const response = await this.api.request({
                method: "GET",
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

    async getBookingDetails(enterBookingID = null, statuscode = 200) {
        try {


            const bookingId = enterBookingID || this.world?.bookingId;

            if (!bookingId) {
                throw new Error("Booking ID not available");
            }

            const response = await this.api.request({
                method: "GET",
                url: endpoints.url,
                endpoint: endpoints.getbookingdetils + bookingId,
                expectedStatus: statuscode
            });

            return response.body;

        } catch (error) {
            console.error("Get Booking Details Error:", error.message);
            throw error;
        }
    }
}

module.exports = GETAPI;
