# Welcome to the Forge Engine Context

## Project Overview
This project is a game engine, called Forge. The engine follows a "Game Tree" concept, where each node in the tree is a Part, and the parent node is the game itself. A parent node (Part) calls its act() method each tick, then calls its childrens act() methods. There is a web-based engine that uses the engine core to facilitate easier build of games.

## Machine Overview
- You are running on a windows machine. Please use powershell commands by defualt

## Code Overview
- Examine ./docs for documentation of the project
- Examine ./Parts for the code on each built-in part
- Examine ./engine for the code that runs the web engine. Ignore the .js files (specifically, bundle.js, editor.js, script.bak.js, and defs.bak.js), as the project is built using ts and these are just the build files.


## Tasks

- [ ] Dragging/dropping nodes no longer deletes the node completely, but silently fails. No nodes are moved. Please double check integration.
- [ ] PhysicsEngine and PhysicsBody still do not work. Gravity does not seem to be applied. Build a "physics.html" page in src to test physics integration.
- [ ] Some parts are designed to exist in multiple (eg: multiple gameObject children in one scene), however some are supposed to only exist one time (eg: transform, colliders, renderers). Add a property in definitions.ts to make this happen, and do not ask for a name on these part when creating a new one (@engine/editor/tree.ts).
- [ ] Line 165 of @engine/editor/tree.ts "const name = prompt(...)". Please create a custom prompt to make it look prettier (see @engine/editor.ts for example implementation with `alert`. You may need to modify @engine/index.html)
- [ ] Documentation for physicsEngine does not follow actuall implementation. Please reference other documentation (@docs/*) to understand the formatting, syntax, and usage of other types. Update both physicsEngine and physicsBody to the lastest versions.