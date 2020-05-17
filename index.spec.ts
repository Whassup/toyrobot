import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { spy } from "https://raw.githubusercontent.com/udibo/mock/v0.3.0/spy.ts";

import { start } from "./index.ts";

const cache = Deno.stdout.write;

Deno.test('should log out game start', async() => {
    
});
/**
 *  SW                       NW
 *  0,0 | 0,1 | 0,2 | 0,3 | 0,4
 *  1,0 | 1,1 | 1,2 | 1,3 | 0,4
 *  2,0 | 2,1 | 2,2 | 2,3 | 0,4
 *  3,0 | 3,1 | 3,2 | 3,3 | 0,4
 *  4,0 | 4,1 | 4,2 | 4,3 | 0,4
 * SE                        NE
*/

// WHEN robot is not placed on board
    // should ignore all commands except place

// ON PLACE command
    // should place robot in provided x position
    // should place robot in provided y position
    // should set robot orientation
    // should ignore commands with invalid arguments
// ON command
    // should ignore any invalid command names
// ON MOVE command
    // WHEN robot is facing North
        // should move foward one position
        // WHEN robot is on edge of board
            // should ignore command
    // WHEN robot is facing South
        // should move forward one position
        // WHEN robot is on edge of board
            // should ignore command
    // WHEN robot is facing East
        // should move forward one position
        // WHEN robot is on edge of board
            // should ignore command
     // WHEN robot is facing West
        // should move forward one position
        // WHEN robot is on edge of board
            // should ignore command
// ON LEFT command
    // WHEN robot is facing North
        // should change orientation to West
    // WHEN robot is facing West
        // should change orientation to South
    // WHEN robot is facing South
        // should change orientation to East
    // WHEN robot is facing East
        // should change orientation to North
// ON RIGHT command
    // WHEN robot is facing North
        // should change orientation to East
    // WHEN robot is facing East
        // should change orientation to South
    // WHEN robot is facing South
        // should change orientation to West
    // WHEN robot is facing West
        // should change orientation to North