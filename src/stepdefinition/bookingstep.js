const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

const GETAPI = require("../API/GetApi");
const POSTAPI = require("../API/PostApi");
const PUTAPI = require("../API/PutApi");
const DELETEAPI = require("../API/DeleteApi");

let response;

Given("I create a booking with:", async function (dataTable) {
    const overrides = dataTable.rowsHash();
    const postApi = new POSTAPI(this);
    response = await postApi.postCreateBooking(
        overrides,
        200
    );

    expect(response).to.have.property("bookingid");
    expect(this.bookingId).to.not.be.null;
});


When("I retrieve all booking IDs", async function () {
    const getApi = new GETAPI(this);
    response = await getApi.getBookingID(200);
    expect(response).to.be.an("array");
});

Then("I should see the created booking in list", async function () {
    const postApi = new POSTAPI(this);
    const exists = await postApi.validateBookingIdExists(200);
    expect(exists).to.be.true;
});


When("I fetch the booking details", async function () {
    const getApi = new GETAPI(this);
    response = await getApi.getBookingDetails(null, 200);
    expect(response).to.be.an("object");
    expect(response.firstname).to.exist;
});

When("I update the booking details with:", async function (dataTable) {
    const overrides = dataTable.rowsHash();
    const putApi = new PUTAPI(this);
    response = await putApi.updateBookingDetailsByID(
        overrides,
        200
    );

    expect(response).to.be.an("object");

    // Object.keys(overrides).forEach(key => {
    //     if (response[key]) {
    //         expect(response[key]).to.equal(overrides[key]);
    //     }
    // });
});

When("I delete the booking", async function () {
    const deleteApi = new DELETEAPI(this);
    response = await deleteApi.deleteBookingDetailsByID(201);
    expect(this.bookingId).to.be.null;
});
