const board_x = 5

const board_y = 5

/// Checks x and y coodrinates fit on board
pub fn check_is_in_range(x: Int, y: Int) -> Bool {
  x >= 0 && x < board_x && y >= 0 && y < board_y
}
