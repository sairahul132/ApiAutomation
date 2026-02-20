const ApiMethods = require("../utility/ApiMethods");
const endpoints = require("../config/endpoints");
const payloads = require("../test-data/payloads");

class PUTAPI {

    constructor(world = null) {
        this.api = new ApiMethods(world);
        this.world = world;
    }

    async updateBookingDetailsByID(overrides = {}, statuscode = 200, enterBookingID = null) {
        try {

            const bookingId = enterBookingID || this.world?.bookingId;

            if (!bookingId) {
                throw new Error("Booking ID not available for update");
            }

            const token = await this.api.tokengenerator();


            const dynamicPayload = await this.api.buildPayload(
                payloads.putbooking.updatebooking,
                overrides
            );

            const response = await this.api.request({
                method: "PUT",
                url: endpoints.url,
                endpoint: endpoints.getbookingdetils + bookingId,
                body: dynamicPayload,
                token: token,
                expectedStatus: statuscode
            });

            return response.body;

        } catch (error) {
            console.error("Update Booking PUT Error:", error.message);
            throw error;
        }
    }
}

module.exports = PUTAPI;
