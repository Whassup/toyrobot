# Data Types / Entities

## Branded Types

> Branded types are TypeScript types with an added type tag that helps prevent accidental usage of a value in the wrong context.
>
> - https://effect.website/docs/code-style/branded-types/

It gives your type name to avoid conflict with another type

Benefits

- enforce proper usage by distinguishing different data types as a unique Symbol
- can create different scalar like types
- can include runtime validations
- avoids allowing two strutually same types being mixed

## Case matching

Use the `withReturnType` to constrain the return type specific type

```ts
const matchCommand = Match.type<string>().pipe(
  Match.withReturnType<Command>(),
  Match.when("PLACE", () => PLACE()),
  Match.when("MOVE", () => MOVE()),
  Match.when("LEFT", () => LEFT()),
  Match.when("RIGHT", () => RIGHT()),
  Match.when("REPORT", () => REPORT()),
  Match.option,
);
```
