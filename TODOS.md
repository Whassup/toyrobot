- [x] Setup effect ts project and print hello world
- [x] Add linting and formatting
- [ ] Read lines from file
- [x] Parse commands from string
  - [x] Ignore invalid commands
  - [x] Allow valid commands PLACE, MOVE, LEFT, RIGHT, REPORT
  - [x] Parse arguments for PLACE command X,Y,F
- [x] Run robot simulation using provided commands
  - [x] Handle PLACE, MOVE, RIGHT, LEFT, REPORT command
- [x] Command rules
  - [x] Ignore commands until first valid place command
- [ ] Apply board restrictions for each command
- [ ] Write unit tests
- [ ] Write integration tests

# Design

Simulator - recieves a configuration (board size) and and list of commands to run a simluation

CommandParser - receives a array of single line strings and transforms into a list of valid commands

LineFileReader - reads lines from file and transforms in a array of single line strings
