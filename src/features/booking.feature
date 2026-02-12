Feature: Booking API

@smoke
  Scenario Outline: Get all booking IDs
    When Create a booking <ExpectedStatus>
    # Then I should receive a list of booking ids

  Examples:
    | ExpectedStatus |
    | 200            |
