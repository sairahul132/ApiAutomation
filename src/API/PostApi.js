const ApiMethods = require("../utility/ApiMethods");
const endpoints = require("../config/endpoints");
const payloads = require("../test-data/payloads");
const GETAPI = require("../API/GetApi");

class POSTAPI {

    constructor(world = null) {
        this.api = new ApiMethods(world);
        this.getapi = new GETAPI(world);
        this.world = world;
    }

    async postCreateBooking(overrides = {}, statuscode) {
        try {

            const dynamicPayload = await this.api.buildPayload(payloads.postbooking.booking,overrides);

            const response = await this.api.request({
                method: "Post",
                url: endpoints.url,
                endpoint: endpoints.getbookingid,
                body: dynamicPayload,
                expectedStatus: statuscode
            });

            this.world.bookingId = response.body.bookingid;

            console.log("Stored Booking ID:", this.world.bookingId);

            return response.body;

        } catch (error) {
            console.error("POST: Create Booking Error:", error.message);
            throw error;
        }
    }

    getStoredBookingId() {
        return this.world.bookingId;
    }


    async validateBookingIdExists(statuscode) {
        try {

            const postbookingid = Number(this.world.bookingId);

            if (!postbookingid) {
                throw new Error("Stored booking ID is not available");
            }

            const getbookingid = await this.getapi.getBookingID(statuscode);

            const exists = getbookingid.some(
                booking => booking.bookingid === postbookingid
            );

            if (!exists) {
                throw new Error(`Booking ID ${postbookingid} NOT found in response`);
            }

            console.log(`Booking ID ${postbookingid} exists in response`);

            return exists;

        } catch (error) {
            console.error("Validation Error:", error.message);
            throw error;
        }
    }
}

module.exports = POSTAPI;
