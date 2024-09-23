Feature: Validate guide page

    Scenario: (GET) Validate information after get on api
        Given I will search for parameter 'name' and value 'alias odio sit'
        When I call the api get
        Then I receive an status code 200
        And The email value need to be 'Lew@alysha.tv'

    Scenario: (POST) Insert new username
        Given I will insert a new username called 'Luan'
        When I call the api post
        Then I receive an status code 201
        And the response will has an id

    Scenario: (PUT) Change values from some user
        Given I will change values from user with id '5'
        When I call the api put
        Then I receive an status code 200
        And the response will has the same values I changed