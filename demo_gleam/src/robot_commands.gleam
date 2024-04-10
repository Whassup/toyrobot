import board
import gleam/list
import gleam/result
import gleam/int
import gleam/pair
import gleam/io
import gleam/string

pub type RobotCommand {
  MOVE
  REPORT
  INVALID
  LEFT
  RIGHT
  PLACE(x: Int, y: Int, orientation: String)
}

pub type Robot {
  Robot(x: Int, y: Int, orientation: String)
}

pub fn run_all(commands: List(RobotCommand), robot: Robot) {
  list.fold(commands, robot, run)
}

pub fn run(robot: Robot, command: RobotCommand) -> Robot {
  case command {
    PLACE(x, y, o) -> Robot(x, y, o)
    MOVE -> move(robot)
    REPORT -> {
      io.println(
        "REPORT "
        <> int.to_string(robot.x)
        <> ","
        <> int.to_string(robot.y)
        <> ","
        <> robot.orientation,
      )
      robot
    }
    LEFT -> turn(robot, -1)
    RIGHT -> turn(robot, 1)
    INVALID -> robot
  }
}

fn move(robot: Robot) -> Robot {
  case robot.orientation {
    "NORTH" -> #(robot.x, robot.y + 1)
    "SOUTH" -> #(robot.x, robot.y - 1)
    "EAST" -> #(robot.x + 1, robot.y)
    "WEST" -> #(robot.x - 1, robot.y)
    _ -> #(robot.x, robot.y)
  }
  |> fn(pos) {
    let #(x, y) = pos
    let in_range = board.check_is_in_range(x, y)
    case in_range {
      True -> Robot(x, y, robot.orientation)
      False -> robot
    }
  }
}

fn turn(robot: Robot, i: Int) -> Robot {
  turn_orientation(robot.orientation, i)
  |> result.map(Robot(robot.x, robot.y, _))
  |> result.replace_error(robot)
  |> result.unwrap_both
}

const orientations = [#("NORTH", 1), #("EAST", 2), #("SOUTH", 3), #("WEST", 4)]

/// If num is greater than max set clamp to min
/// If num is less than min set clamp to max
fn circular_clamp(num: Int, min: Int, max: Int) -> Int {
  case num < min, num > max {
    True, False -> max
    False, True -> min
    _, _ -> num
  }
}

fn turn_orientation(orientation: String, i: Int) {
  orientations
  |> list.find(fn(item) {
    let #(o, _) = item
    o == orientation
  })
  |> result.map(pair.second)
  |> result.map(fn(pos) { pos + i })
  |> result.map(circular_clamp(_, 1, 4))
  |> result.try(fn(cpos) {
    list.find(orientations, fn(item) {
      let #(_, pos) = item
      pos == cpos
    })
  })
  |> result.map(pair.first)
}

fn parse_place(command_str: String) {
  command_str
  |> string.split(",")
  |> fn(args) {
    case args {
      [x, y, o] -> Ok(#(x, y, o))
      _ -> Error(Nil)
    }
  }
  |> result.try(fn(args) {
    // Validate orienation string
    let #(x, y, o) = args
    case o {
      "NORTH" as vo | "EAST" as vo | "SOUTH" as vo | "WEST" as vo ->
        Ok(#(x, y, vo))
      _ -> Error(Nil)
    }
  })
  |> result.try(fn(args) {
    // Validate x, y as Int
    let #(x, y, o) = args
    case int.parse(x), int.parse(y) {
      Ok(ix), Ok(iy) -> Ok(#(ix, iy, o))
      _, _ -> Error(Nil)
    }
  })
  |> result.try(fn(args) {
    let #(x, y, o) = args
    case board.check_is_in_range(x, y) {
      True -> Ok(PLACE(x, y, o))
      False -> Error(Nil)
    }
  })
  |> result.replace_error(INVALID)
  |> result.unwrap_both
}

pub fn parse(commandlist: String) -> List(RobotCommand) {
  commandlist
  |> string.split("\n")
  |> list.map(fn(commands) {
    commands
    |> string.replace("\r", "")
    |> fn(commands) {
      case commands {
        "PLACE " <> args -> parse_place(args)
        "MOVE" -> MOVE
        "REPORT" -> REPORT
        "LEFT" -> LEFT
        "RIGHT" -> RIGHT
        _ -> INVALID
      }
    }
  })
  |> list.drop_while(drop_while_not_place)
}

pub fn drop_while_not_place(command: RobotCommand) -> Bool {
  case command {
    PLACE(_, _, _) -> False
    _ -> True
  }
}

pub fn parse_1(commandlist: String) -> Result(List(RobotCommand), String) {
  commandlist
  |> string.split("\n")
  |> list.map(fn(commands) {
    commands
    |> string.replace("\r", "")
    |> fn(commands) {
      case commands {
        "PLACE " <> cargs -> {
          cargs
          |> string.split(",")
          |> fn(largs) {
            case largs {
              [_ as x, _ as y, _ as o] -> {
                let vo = case o {
                  "NORTH" as vo | "EAST" as vo | "SOUTH" as vo | "WEST" as vo ->
                    Ok(vo)
                  _ -> Error("")
                }
                case int.parse(x), int.parse(y), vo {
                  Ok(_ as ix), Ok(_ as iy), Ok(_ as ovo) ->
                    case board.check_is_in_range(ix, iy) {
                      True -> PLACE(x: ix, y: iy, orientation: ovo)
                      False -> INVALID
                    }

                  _, _, _ -> INVALID
                }
              }
              _ -> INVALID
            }
          }
        }
        "MOVE" -> MOVE
        "REPORT" -> REPORT
        "LEFT" -> LEFT
        "RIGHT" -> RIGHT
        _ -> INVALID
      }
    }
  })
  |> list.drop_while(drop_while_not_place)
  |> Ok
}

pub fn parse_with_use(command_str: String) {
  let r = {
    use split_3_args <- result.try({
      command_str
      |> string.split(",")
      |> fn(args) {
        case args {
          [x, y, o] -> Ok(#(x, y, o))
          _ -> Error(Nil)
        }
      }
    })
    use valid_orientation <- result.try(fn(args) {
      // Validate orienation string
      let #(_, _, o) = args
      case o {
        "NORTH" as vo | "EAST" as vo | "SOUTH" as vo | "WEST" as vo -> Ok(vo)
        _ -> Error(Nil)
      }
    }(split_3_args))
    use x_y_as_int <- result.try(fn(args) {
      // Validate x, y as Int
      let #(x, y, _) = args
      case int.parse(x), int.parse(y) {
        Ok(ix), Ok(iy) -> Ok(#(ix, iy))
        _, _ -> Error(Nil)
      }
    }(split_3_args))
    use #(x_in_range, y_in_range) <- result.map(fn(args) {
      let #(x, y) = args
      case board.check_is_in_range(x, y) {
        True -> Ok(#(x, y))
        False -> Error(Nil)
      }
    }(x_y_as_int))
    PLACE(x_in_range, y_in_range, valid_orientation)
  }
  r
  |> result.replace_error(INVALID)
  |> result.unwrap_both
}
