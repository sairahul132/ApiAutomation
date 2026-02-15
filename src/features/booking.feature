Feature: Booking API

  @E2EScenario @e2e
  Scenario: Create a POST Booking
    Given I Generate the token using the POST API
    Then I Create a booking using the POST API
    Then I store the generated booking ID
    When I retrieve all booking IDs using the GET API
    Then I should see the created booking ID in the booking list response
    When I Fetch the booking details by GET API
    When I Update the booking details by PUT API
    When I Delete the booking details by DELETE API

  @createPostBooking
  Scenario: Create a POST Booking
    Given I Generate the token using the POST API
    Then I Create a booking using the POST API
    Then I store the generated booking ID

  @GetBookingId
  Scenario: Retrieve all the bookings
    Given I Generate the token using the POST API
    When I retrieve all booking IDs using the GET API

  @GetBookingDetails
  Scenario: Get the booking ids
    Given I Generate the token using the POST API
    When Get the Booking details by ID "Value" using GET API

  @UpdateDetails
  Scenario: Update Booking
    Given I Generate the token using the POST API
    When Update the Booking details by ID "Value" using PUT API

  @DeleteBookingDetailsById
  Scenario: Update Booking
    Given I Generate the token using the POST API
    When Delete the Booking details by ID "Value" using DELETE API



