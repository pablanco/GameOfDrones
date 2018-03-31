:: Previous Requirement
Mongo needs to be installed, please check 
https://docs.mongodb.com/manual/administration/install-community/

:: To run the Game

1-- Install packages
npm install

2-- Run node server (separate console)
node src/server

3-- Run angular app
npm start

:: Play at
http://localhost:4200/

:: Rules configuration
To change rules configuration you can edit rules.json located at the root folder.
Rules has json object format, this rules will be updated on the server between games.

[
    { "move": "paper", "kills": "rock"},
    { "move": "rock", "kills": "scissors"},
    { "move": "scissors", "kills": "paper"},
    { "move": "lizard", "kills": "spock"},
    { "move": "spock", "kills": "scissors"}

]
