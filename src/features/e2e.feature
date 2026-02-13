Feature: Booking API Validation

@e2e
  Scenario: Verify created booking ID is present in booking list

    Given I create a new booking using the POST API
    And I store the generated booking ID
    When I retrieve all booking IDs using the GET API
    Then I should see the created booking ID in the booking list response
