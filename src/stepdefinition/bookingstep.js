const { When, Then, Given } = require("@cucumber/cucumber");
const ApiMethods = require("../utility/ApiMethods");
const { expect } = require("chai");
const getapi = require('../API/GetApi')
const postapi = require('../API/PostApi')
const putapi = require('../API/PutApi')
const deleteapi = require('../API/DeleteApi')

let response;
let responsebooking;

Given("I Generate the token using the POST API", async function () {
  response = await ApiMethods.tokengenerator();
});

Then("I Create a booking using the POST API", async function () {
  responsebooking = await postapi.postCreateBooking(200);
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

When("Get the Booking details by ID {string} using GET API", async function (getbookingid) {
  response = await getapi.getBookingDetails(getbookingid,200);
  expect(response).to.be.an("Object");
});


When("I Fetch the booking details by GET API", async function () {
  response = await getapi.getBookingDetails(responsebooking.bookingid,200);
  expect(response).to.be.an("Object");
});

When("Update the Booking details by ID {string} using PUT API", async function (getbookingid) {
  response = await putapi.updateBookingDetailsByID(getbookingid,200);
  console.log("Updated Booking ID :"+getbookingid);
});


When("I Update the booking details by PUT API", async function () {
  response = await putapi.updateBookingDetailsByID(responsebooking.bookingid,200);
  console.log("Updated Booking ID :"+responsebooking.bookingid);
});

When("Delete the Booking details by ID {string} using DELETE API", async function (getbookingid) {
  response = await deleteapi.DeleteBookingDetailsByID(getbookingid,201);
  console.log("Deleted Booking ID :"+getbookingid);
  
});


When("I Delete the booking details by DELETE API", async function () {
  response = await deleteapi.DeleteBookingDetailsByID(responsebooking.bookingid,201);
  console.log("Deleted Booking ID :"+responsebooking.bookingid);
});