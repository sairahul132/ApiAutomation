const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("chai");
const BookingAPI = require("../API/testapi");
const e2e = require("../API/endtoendAPI");

let response;

Given("I create a new booking using the POST API", async function () {
  const response = await e2e.postCreateBooking(200);
  expect(response).to.have.property("bookingid");
  expect(response.booking).to.be.an("object");
});


Given("I store the generated booking ID", function () {
  const storedId = e2e.getStoredBookingId();
  console.log("Stored Booking ID:", storedId);
  expect(storedId, "Booking ID was not stored").to.not.be.null;
});

When("I retrieve all booking IDs using the GET API", async function () {
  const response = await e2e.getBookingID(200);
  expect(response).to.be.an("array");
});


Then("I should see the created booking ID in the booking list response", async function () {
  const exists = await e2e.validateBookingIdExists(200);
  expect(exists).to.be.true;
});