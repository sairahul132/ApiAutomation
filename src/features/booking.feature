@booking @smoke
Feature: Booking API

  Scenario: Get all booking IDs
    When I fetch all the booking ids
    Then I should receive a list of booking ids
