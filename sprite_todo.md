# Sprite Builder TODO List

## Drawing Features
- [X] Color Selection
- [X] Eraser Tool (delete shapes)
- [X] Line Tool
- [X] Circle Tool
- [X] Polygon Tool
- [ ] Selection Tools
  - [ ] Lasso Select
  - [ ] Square Select
- [X] Live preview for drawing shapes
- [X] Tools should be selectable and highlighted
- [X] Toggle anti-aliasing
- [X] Allow selecting thickness for tools

## Sizing and UI
- [X] Define global frame size
- [X] Modifiable frame size
- [X] Checkerboard canvas background
- [X] Scaled drawing canvas
- [X] Black canvas background

## Animation Features
- [X] Customize animation properties (loop, bounce)
- [X] Customize individual frame speed (duration)
- [X] Animation preview

## Workflow and UX
- [X] Auto-select newly created animations
- [X] Frame gutter shows frames for selected animation
- [X] Save individual frames as PNG
- [X] Create Frame button
- [X] Frame can only be constructed if an animation is selected
- [X] An animation must always be selected (if any exist)
- [X] Clicking a frame in the gutter should load it for editing
- [X] Gutter should show a mini-render of the frame that updates with edits
- [X] Automatically start drawing when a frame is selected

## Data Structure
- [X] Add a `shapes` attribute to each frame

## Style Improvements
- [X] Reduce cramping in animation panel
- [X] Reduce padding for animation names
- [X] Add clear separation for the frame gutter
- [X] Increase frame gutter space
- [X] Position animation time input beneath the render
- [X] Put loop and bounce options on new lines
- [X] Transparent background for the sprite (checkerboard pattern)

## Bug Fixes
- [X] Drawing tools not visible in UI
- [X] Eraser tool doesn't work (delete shapes)
- [X] Polygon tool doesn't work
- [X] Incorrect offset when drawing
- [X] Drawing still has a slight left offset
- [X] No clearing of canvas in between renders for live previews
- [X] Finishing a drawing action results in the canvas disappearing
- [X] Saving is not working correctly
- [X] Canvas is not appearing
