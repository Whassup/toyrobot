interface canRunCommand {
  run: () => void;
}

interface canEncodeFromString {
  encodeFromString: (input: string) => boolean;
}

export interface CommandEncoder {
  (
    input: string,
    commands: (canEncodeFromString & canRunCommand)[]
  ): canRunCommand;
}

const InvalidCommand: canRunCommand = {
  run: () => {
    console.error("Invalid command");
  },
};

export const commandEncoder: CommandEncoder = (input, commands) => {
  return (
    commands.find((command) => command.encodeFromString(input)) ||
    InvalidCommand
  );
};
