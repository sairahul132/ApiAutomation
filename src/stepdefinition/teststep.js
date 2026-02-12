const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const BookingAPI = require("../API/testapi");

let response;

When("I fetch all the booking ids {int}", async function (statuscode) {
  response = await BookingAPI.getBookingID(statuscode);
});

When("Create a booking {int}", async function (statuscode) {
  response = await BookingAPI.postCreateBooking(statuscode);
});

Then("I should receive a list of booking ids", function () {
  expect(response).to.be.an("array");
  expect(response.length).to.be.greaterThan(0);
  expect(response[0]).to.have.property("bookingid");
});
