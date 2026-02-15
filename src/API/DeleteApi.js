const ApiMethods = require("../utility/ApiMethods");
const endpoints = require("../config/endpoints");
const payloads = require("../test-data/payloads");

class DELETEAPI{

        async DeleteBookingDetailsByID(enterBokkingID, statuscode) {
            try {
                const Tokenid = await ApiMethods.tokengenerator();
                const response = await ApiMethods.delete({
                    url: endpoints.url,
                    endpoint: endpoints.getbookingdetils + enterBokkingID,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Cookie": "token=" + `${Tokenid}`,
                    },
                    expectedStatus: statuscode
                });
    
                return response.body;
            } catch (error) {
                console.error("Delete Booking Error:", error.message);
                throw error;
            }
        }
    }

module.exports = new DELETEAPI();