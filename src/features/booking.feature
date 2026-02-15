Feature: Booking API

  @createPostBooking
  Scenario: Create a POST Booking
    Given I Generate the token using the POST API
    Then I Create a booking using the POST API
    Then I store the generated booking ID

  @createGetBookingId
  Scenario: Create a POST Booking
    Given I Generate the token using the POST API
    Then I retrieve all booking IDs using the GET API

  @createGetBookingIdAndValidate @e2e
  Scenario: Create a POST Booking
    Given I Generate the token using the POST API
    Then I Create a booking using the POST API
    Then I store the generated booking ID
    Then I retrieve all booking IDs using the GET API
    Then I should see the created booking ID in the booking list response

