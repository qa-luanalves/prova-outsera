Feature: Validate guide page

    Scenario: Validate data on json after open guide page
        Given the user is in home page
        When he navigate to guide page
        And click to open the link from array of albums
        Then a page will be opened with an array of photos
        And the array with id 'x' will has 'y' information