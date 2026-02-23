const ApiMethods = require("../utility/ApiMethods");
const endpoints = require("../config/endpoints");

class DELETEAPI {

    constructor(world = null) {
        this.api = new ApiMethods(world);
        this.world = world;
    }

async deleteBookingDetailsByID(
    enterBookingID = null,
    statuscode = 201
) {
    try {

        let bookingId;


        if (enterBookingID !== null && enterBookingID !== undefined) {
            bookingId = String(enterBookingID).trim();
        }


        if (!bookingId) {
            bookingId = this.world?.bookingId;
        }

        if (!bookingId) {
            throw new Error("Booking ID not available for delete");
        }

        const token = await this.api.tokengenerator();

        const response = await this.api.request({
            method: "DELETE",
            url: endpoints.url,
            endpoint: endpoints.getbookingdetils + bookingId,
            token: token,
            expectedStatus: statuscode
        });

        console.log(`Booking ID ${bookingId} deleted successfully`);

        if (statuscode === 201) {
            this.world.bookingId = null;
        }

        return response.body;

    } catch (error) {
        console.error("Delete Booking Error:", error.message);
        throw error;
    }
}

}

module.exports = DELETEAPI;
