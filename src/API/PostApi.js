const ApiMethods = require("../utility/ApiMethods");
const endpoints = require("../config/endpoints");
const payloads = require("../test-data/payloads");
const getapi = require('../API/GetApi')

class POSTAPI {

    constructor() {
        this.bookingId = null;
    }

    async postCreateBooking(statuscode) {
        try {
            const response = await ApiMethods.post({
                url: endpoints.url,
                endpoint: endpoints.getbookingid,
                body: payloads.postbooking.booking,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                expectedStatus: statuscode
            });

            this.bookingId = response.body.bookingid;
            console.log(response.body.bookingid);


            return response.body;

        } catch (error) {
            console.error("POST: Create Booking Error:", error.message);
            throw error;
        }
    }

    getStoredBookingId() {
        return this.bookingId;
    }

    async validateBookingIdExists(statuscode) {
        try {
            const postbookingid = Number(this.getStoredBookingId());

            if (!postbookingid) {
                throw new Error("Stored booking ID is not available");
            }

            const getbookingid = await getapi.getBookingID(200);
            const exists = getbookingid.some(
                booking => booking.bookingid === postbookingid
            );

            if (exists) {
                console.log(`Booking ID ${postbookingid} exists in response`);
            } else {
                throw new Error(`Booking ID ${postbookingid} NOT found in response`);
            }

            return exists;

        } catch (error) {
            console.error("Validation Error:", error.message);
            throw error;
        }
    }

    //   async postCreateBooking(statuscode) {
    //   try {
    //     const response = await api.post({
    //       url: endpoints.url,
    //       endpoint: endpoints.getbookingid,
    //       body: payloads.postbooking.booking,
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json"
    //       },
    //       expectedStatus: statuscode
    //     });

    //     const responseBody = response.body;

    //     console.log(JSON.stringify(responseBody, null, 2));


    //     if (!responseBody.bookingid) {
    //       throw new Error("bookingid is missing in response");
    //     }


    //     if (!responseBody.booking) {
    //       throw new Error("booking object is missing in response");
    //     }

    //     const booking = responseBody.booking;
    //     const requestPayload = payloads.postbooking.booking;


    //     if (booking.firstname !== requestPayload.firstname) {
    //       throw new Error("Firstname mismatch");
    //     }

    //     if (booking.lastname !== requestPayload.lastname) {
    //       throw new Error("Lastname mismatch");
    //     }

    //     if (booking.totalprice !== requestPayload.totalprice) {
    //       throw new Error("Total price mismatch");
    //     }

    //     if (booking.depositpaid !== requestPayload.depositpaid) {
    //       throw new Error("Deposit status mismatch");
    //     }

    //     if (
    //       booking.bookingdates.checkin !== requestPayload.bookingdates.checkin ||
    //       booking.bookingdates.checkout !== requestPayload.bookingdates.checkout
    //     ) {
    //       throw new Error("Booking dates mismatch");
    //     }


    //     if (booking.additionalneeds !== requestPayload.additionalneeds) {
    //       throw new Error("Additional needs mismatch");
    //     }

    //     if (typeof responseBody.bookingid !== "number") {
    //       throw new Error("bookingid is not a number");
    //     }

    //     if (typeof booking.depositpaid !== "boolean") {
    //       throw new Error("depositpaid is not boolean");
    //     }

    //     this.bookingId = responseBody.bookingid;

    //     console.log("Booking created and validated successfully");
    //     console.log("Stored Booking ID:", this.bookingId);

    //     return responseBody;

    //   } catch (error) {
    //     console.error("POST: Create Booking Error:", error.message);
    //     throw error;
    //   }
    // }
}
module.exports = new POSTAPI();