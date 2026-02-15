const ApiMethods = require("../utility/ApiMethods");
const endpoints = require("../config/endpoints");
const payloads = require("../test-data/payloads");

class PUTAPI {

    async updateBookingDetailsByID(enterBokkingID, statuscode) {
        try {
            const Tokenid = await ApiMethods.tokengenerator();
            const response = await ApiMethods.put({
                url: endpoints.url,
                endpoint: endpoints.getbookingdetils + enterBokkingID,
                body: payloads.putbooking.updatebooking,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cookie": "token=" + `${Tokenid}`,
                },
                expectedStatus: statuscode
            });

            return response.body;
        } catch (error) {
            console.error("Update Booking PUT Error:", error.message);
            throw error;
        }
    }
}

module.exports = new PUTAPI();