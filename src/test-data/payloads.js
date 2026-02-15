module.exports = {

    postbooking: {
        booking: {
            "firstname": "API",
            "lastname": "Testing",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-02-13",
                "checkout": "2026-02-14"
            },
            "additionalneeds": "super bowls"
        }
    },
    createtoken:
    {
        "username": "admin",
        "password": "password123"

    },
    putbooking: {
        updatebooking: {
            "firstname": "Test",
            "lastname": "Testers Name",
            "totalprice": 10000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-02-13",
                "checkout": "2026-02-14"
            },
            "additionalneeds": "Discount"
        }
    }
}