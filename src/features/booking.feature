Feature: Booking API Automation

  @e2e
  Scenario: Complete Booking Lifecycle

    Given I create a booking with:
      | firstname  | Sai     |
      | lastname   | Rahul   |
      | totalprice | 5000    |

    When I retrieve all booking IDs
    Then I should see the created booking in list
    When I fetch the booking details

    When I update the booking details with:
      | firstname | UpdatedSai |

    When I delete the booking
