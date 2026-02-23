@Regression
Feature: Booking API Automation

  @e2e @validscenario
  Scenario: Booking Scenario with CRUD Operations

    Given I create a booking with expected status 200 and:
      | firstname  | Sai   |
      | lastname   | Rahul |
      | totalprice | 5000  |

    When I retrieve all booking IDs with expected status 200
    Then I should see the created booking in list

    When I fetch booking details with id "" and expect status 200

    When I update booking with id "" and expect status 200 with:
      | firstname | UpdatedSai |

    When I delete booking with id "" and expect status 201


# E2E Negative Scenario for booking

  @e2eNegative @invalidScenario
  Scenario: Booking Scenario with CRUD Operations

    Given I create a booking with expected status 400 and:
      | firstname  | Sai   |
      | lastname   | Rahul |
      | totalprice | @#$%  |

    When I retrieve all booking IDs with expected status 200
    Then I should see the created booking in list
    When I fetch booking details with id "" and expect status 200
    When I update booking with id "" and expect status 200 with:
      | firstname | UpdatedSai |

    When I delete booking with id "" and expect status 201

  @getWithFeatureId
  Scenario: Fetch booking using bookingId
    When I fetch booking details with id "1" and expect status 200


  #  SCENARIO 3 - Update Booking Using ID From Feature File

  @updateWithFeatureId
  Scenario: Update booking using bookingId
    When I update booking with id "1" and expect status 200 with:
      | firstname | FeatureUpdated |


  #  SCENARIO 4 - Delete Booking Using ID From Feature File

  @deleteWithFeatureId
  Scenario: Delete booking using bookingId
    When I delete booking with id "2" and expect status 201


  #  SCENARIO 5 - Negative Scenario (Invalid Booking ID)
  @negative
  Scenario: Fetch booking with invalid bookingId
    When I fetch booking details with id "9999999" and expect status 404


  #  SCENARIO 6 - Negative Delete Scenario
  @negativeDelete
  Scenario: Delete non-existing booking
    When I delete booking with id "9999999" and expect status 405