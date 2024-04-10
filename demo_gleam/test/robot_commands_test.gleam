import gleeunit
import gleeunit/should
import gleam/list
import robot_commands.{INVALID, MOVE, PLACE, Robot}

pub fn main() {
  gleeunit.main()
}

pub fn run__move_should_validate_board_range_test() {
  let data = [
    #(Robot(0, 0, "WEST"), Robot(0, 0, "WEST")),
    #(Robot(4, 0, "WEST"), Robot(3, 0, "WEST")),
    #(Robot(0, 0, "EAST"), Robot(1, 0, "EAST")),
    #(Robot(4, 0, "EAST"), Robot(4, 0, "EAST")),
    #(Robot(0, 1, "NORTH"), Robot(0, 2, "NORTH")),
    #(Robot(0, 4, "NORTH"), Robot(0, 4, "NORTH")),
    #(Robot(0, 0, "SOUTH"), Robot(0, 0, "SOUTH")),
    #(Robot(0, 4, "SOUTH"), Robot(0, 3, "SOUTH")),
  ]
  data
  |> list.each(fn(test_case) {
    let #(robot, expected_robot) = test_case
    robot_commands.run(robot, MOVE)
    |> should.equal(expected_robot)
  })
}

pub fn parse__should_ignore_until_place__a_test() {
  // GIVEN a set commands
  // Should ignored all commands until a valid PLACE is made. 
  let data =
    "MOVE
RIGHT
LEFT
REPORT
PLACE 0,0,WEST
MOVE"
  robot_commands.parse(data)
  |> list.length
  |> should.equal(2)
}

pub fn parse__should_ignore_until_place__b_test() {
  // GIVEN a set commands
  // Should ignored all commands until a valid PLACE is made. 
  let data =
    "MOVE
RIGHT
LEFT
REPORT
PLACE A,1,EAST
INVALID
PLACE 0,0,WEST
MOVE
MOVE"
  robot_commands.parse(data)
  |> list.length
  |> should.equal(3)
}

pub fn parse___place_should_validate_board_range_test() {
  // GIVEN a set commands
  // Should ignored all commands until a valid PLACE is made. 
  let data =
    "PLACE 0,0,WEST
PLACE 1,0,WEST
PLACE 2,0,WEST
PLACE 3,0,WEST
PLACE 4,0,WEST
PLACE 5,0,WEST
PLACE 0,1,WEST
PLACE 0,2,WEST
PLACE 0,3,WEST
PLACE 0,4,WEST
PLACE 0,5,WEST"
  robot_commands.parse(data)
  |> should.equal([
    PLACE(0, 0, "WEST"),
    PLACE(1, 0, "WEST"),
    PLACE(2, 0, "WEST"),
    PLACE(3, 0, "WEST"),
    PLACE(4, 0, "WEST"),
    INVALID,
    PLACE(0, 1, "WEST"),
    PLACE(0, 2, "WEST"),
    PLACE(0, 3, "WEST"),
    PLACE(0, 4, "WEST"),
    INVALID,
  ])
}

pub fn drop_while_not_place_test() {
  should.be_true(robot_commands.drop_while_not_place(robot_commands.MOVE))
  should.be_true(robot_commands.drop_while_not_place(robot_commands.LEFT))
  should.be_true(robot_commands.drop_while_not_place(robot_commands.RIGHT))
  should.be_true(robot_commands.drop_while_not_place(robot_commands.REPORT))
  should.be_false(
    robot_commands.drop_while_not_place(robot_commands.PLACE(1, 2, "WEST")),
  )
}
