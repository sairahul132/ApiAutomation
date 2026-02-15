const { When, Then, Given } = require("@cucumber/cucumber");
const ApiMethods = require("../utility/ApiMethods");
const { expect } = require("chai");
const getapi = require('../API/GetApi')
const postapi = require('../API/PostApi')

let response;

Given("I Generate the token using the POST API", async function () {
  response = await ApiMethods.tokengenerator();
});

Then("I Create a booking using the POST API", async function () {
  response = await postapi.postCreateBooking(200);
});

Then("I store the generated booking ID", async function () {
  const storedId = await postapi.getStoredBookingId();
  console.log("Stored Booking ID:", storedId);
  expect(storedId, "Booking ID was not stored").to.not.be.null;
});

When("I retrieve all booking IDs using the GET API", async function () {
  response = await getapi.getBookingID(200);
  expect(response).to.be.an("array");
});

Then("I should see the created booking ID in the booking list response", async function () {
  const exists = await postapi.validateBookingIdExists(200);
  expect(exists).to.be.true;
});