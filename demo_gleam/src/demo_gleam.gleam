import gleam/io
import gleam/result
import simplifile.{Enoent, read}
import argv
import robot_commands.{Robot}

pub fn main() {
  app(read_file)
}

type ReadFileFn =
  fn(String) -> Result(String, String)

pub fn app(read_file_fn: ReadFileFn) {
  io.println("Start")
  let robot = Robot(1, 1, "WEST")
  let app =
    read_args()
    |> result.try(read_file_fn)
    |> result.map(robot_commands.parse)
    |> result.map(robot_commands.run_all(_, robot))

  case app {
    Ok(_) -> {
      io.println("Ended success")
    }
    Error(error_message) -> {
      io.println_error("Ended with error: " <> error_message)
    }
  }
}

fn read_args() {
  case argv.load().arguments {
    ["toyrobot", "--filename", filename] -> Ok(filename)
    _ -> Error("usage: --filename example.txt")
  }
}

fn read_file(filename: String) {
  let filepath = "./data/" <> filename
  io.println("Reading file " <> filepath)

  read(from: filepath)
  |> result.map_error(fn(error) {
    case error {
      Enoent -> {
        "read_file:error: Reason - Enoent - File not found"
      }
      _ -> "read_file:error: Reason - Uknown"
    }
  })
}
