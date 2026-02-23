const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

const GETAPI = require("../API/GetApi");
const POSTAPI = require("../API/PostApi");
const PUTAPI = require("../API/PutApi");
const DELETEAPI = require("../API/DeleteApi");

let response;


function resolveBookingId(idFromFeature, world) {
  return idFromFeature && idFromFeature.trim() !== ""
    ? idFromFeature
    : world.bookingId;
}



Given(
  "I create a booking with expected status {int} and:",
  async function (expectedStatus, dataTable) {
    const overrides = dataTable.rowsHash();

    const postApi = new POSTAPI(this);

    response = await postApi.postCreateBooking(
      overrides,
      expectedStatus
    );

    expect(response).to.have.property("bookingid");

    // Store bookingId in world
    this.bookingId = response.bookingid;

    expect(this.bookingId).to.not.be.null;
  }
);



When(
  "I retrieve all booking IDs with expected status {int}",
  async function (expectedStatus) {
    const getApi = new GETAPI(this);

    response = await getApi.getBookingID(expectedStatus);

    expect(response).to.be.an("array");
  }
);

Then("I should see the created booking in list", async function () {
  expect(this.bookingId).to.not.be.null;

  const exists = response.some(
    (booking) => booking.bookingid === this.bookingId
  );

  expect(exists).to.be.true;
});


When(
  "I fetch booking details with id {string} and expect status {int}",
  async function (bookingIdFromFeature, expectedStatus) {
    const bookingId = resolveBookingId(
      bookingIdFromFeature,
      this
    );

    const getApi = new GETAPI(this);

    response = await getApi.getBookingDetails(
      bookingId,
      expectedStatus
    );

    if (expectedStatus === 200) {
      expect(response).to.be.an("object");
      expect(response.firstname).to.exist;
    }
  }
);



When(
  "I update booking with id {string} and expect status {int} with:",
  async function (
    bookingIdFromFeature,
    expectedStatus,
    dataTable
  ) {
    const bookingId = resolveBookingId(
      bookingIdFromFeature,
      this
    );

    const overrides = dataTable.rowsHash();

    const putApi = new PUTAPI(this);

    response = await putApi.updateBookingDetailsByID(
      bookingId,
      overrides,
      expectedStatus
    );

  }
);



When(
  "I delete booking with id {string} and expect status {int}",
  async function (bookingIdFromFeature, expectedStatus) {
    const bookingId = resolveBookingId(
      bookingIdFromFeature,
      this
    );

    const deleteApi = new DELETEAPI(this);

    response = await deleteApi.deleteBookingDetailsByID(
      bookingId,
      expectedStatus
    );

    if (expectedStatus === 201) {
      this.bookingId = null;
    }
  }
);



Then(
  "the response status should be {int}",
  function (expectedStatus) {
    expect(response.status).to.equal(expectedStatus);
  }
);