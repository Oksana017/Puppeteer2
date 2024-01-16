Feature: Order movie tickets
    Scenario: User orders one ticket
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user selects date 
        When user selects movie and time
        When user selects one free seat
        Then user sees the reservation button "Получить код бронирования"

    Scenario: User orders two tickets
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user selects date 
        When user selects movie and time
        When user selects two free seats
        Then user sees text about chosen tickets "Вы выбрали билеты:"

    Scenario: User try to book unavailable seat
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user selects date 
        When user selects movie and time
        When user try to book unavailable seat
        Then user sees the reservation button "Забронировать" is disabled