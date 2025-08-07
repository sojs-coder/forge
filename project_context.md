# Welcome to the Forge Engine Context

## Project Overview
This project is a game engine, called Forge. The engine follows a "Game Tree" concept, where each node in the tree is a Part, and the parent node is the game itself. A parent node (Part) calls its act() method each tick, then calls its childrens act() methods. There is a web-based engine that uses the engine core to facilitate easier build of games.

## Overview
- You are running on a windows machine. Please use powershell commands by defualt
- Runtime is Bun. Build commands are build:engine, build:editor, and build:all.

## Code Overview
- Examine ./docs for documentation of the project
- Examine ./Parts for the code on each built-in part
- Examine ./engine for the code that runs the web engine. Ignore the .js files (specifically, bundle.js, editor.js, script.bak.js, and defs.bak.js), as the project is built using ts and these are just the build files.

## Current Task
I am currently working on developing the Part library function. Within the edit node function, users can hit "share node" and give there custom part a name and description. This pushes the part to the library. Users can open the part library and search for parts, upvote them, and downvote them.
I wish to do the following
- Users can upload a few files to showcase the usage of their custom part. This would get pushed to the supbase bucket part_files/<user_id>. If user_id does not exist (pushing anon), push to part_files/anon. These files can then be referenced in the part library. eg: transform from a list view to a card view. (examine @engine/editor/partLibrary.ts)
- Add an action button on each card "Use Part" that adds it to their project. This can be done by setting `nodeDefinitions[customNodeName]` (examine @engine/editor/customNodes.ts)
- When a part card is clicked, pull up its page (do this with a popup similar to the partlibrary popup). This would show the full showcase of images on a slideshow, the part name and uncut description, as well as the parsed content of another file that the user uploads "documentation.md". The file does not need to be named this way by the user, but when uploaded to the part library it should be named that.
- When pushing a part of the same name by the same user, run an update query instead of insert. This should preserve any upvotes.

The final share part popup should have these feilds:
- name (make this disabled and autofill it with the class name)
- description
- showcase_files (maximum 5 files, photos and videos. Videos should autoplay in the showcase on mute and without controls. The first file uploaded will be the featured image in the card view)
- documentation (only allow .md files)

The schema of the `CustomNodeRow` can be found in @engine/editor/types.ts

If there is any confusion about any implementation, stop and ask the question.