import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { sprintf } from "https://deno.land/std/fmt/sprintf.ts";
import { spy } from "https://raw.githubusercontent.com/udibo/mock/v0.3.0/spy.ts";

import { start } from "./index.ts";

const cache = Deno.stdout.write;

Deno.test('should log out game start', async() => {
    
});