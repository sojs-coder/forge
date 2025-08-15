# Sprite Builder Code Review

This document outlines a review of the `spriteBuilder.ts` and `spriteBuilder.html` files, identifying bugs and suggesting potential optimizations for the tool.

## Bugs Found

Here is a list of identified bugs, ranging from critical to minor.

### 1. Pencil Tool Live Preview is Broken
- **Issue:** When using the pencil tool, the live preview does not draw a continuous line. Instead, it draws multiple lines originating from the very first point of the stroke, creating a "fan" or "starburst" effect.
- **Reason:** The `draw` function for the `pencil` tool uses the initial `startX` and `startY` for every segment of the line, without updating them to the last known position.
- **Suggested Fix:** In `spriteBuilder.ts`, within the `draw` method's `pencil` case, update `this.startX` and `this.startY` to the current mouse position after drawing each line segment, similar to how the `eraser` tool is implemented.

### 2. Eraser Strokes Are Not Saved
- **Issue:** Any drawing done with the eraser is not permanent. If you switch frames or trigger a canvas redraw, the erased portions reappear.
- **Reason:** The `stopDrawing` function has an explicit `return` statement for the `eraser` case. This prevents the eraser stroke from being saved as a persistent shape in the frame's `shapes` array. The drawing happens directly on the canvas but is not stored in the data model.
- **Suggested Fix:** Remove the `return` statement from the `eraser` case in the `stopDrawing` method. An eraser shape should be created and added to the `shapes` array, which the `redrawShapes` function is already equipped to handle using the `destination-out` composite operation.

### 3. Polygon Tool Has No Live Preview
- **Issue:** When creating a polygon, the points and connecting lines are not visible until the user double-clicks to finalize the shape. The user is drawing blind.
- **Reason:** The `draw` method (the mouse-move handler) has no case for `'polygon'` to render a live preview of the shape-in-progress.
- **Suggested Fix:** Add a `case 'polygon'` to the `draw` method. This case should draw lines between the points already in `this.polygonPoints` and also draw a line from the last point to the current mouse position, providing visual feedback to the user.

### 4. Animation Preview Ignores Individual Frame Durations
- **Issue:** In the animation preview modal, all frames play at the same speed, determined by the duration of the very first frame in the animation.
- **Reason:** The preview uses `setInterval`, which has a fixed delay. The delay is calculated only once when the interval is started.
- **Suggested Fix:** The `previewAnimation` function should be refactored to use chained `setTimeout` calls instead of `setInterval`. After drawing a frame, the next `setTimeout` would be scheduled with the correct duration for the *next* frame.

### 5. Inconsistent Script File Name
- **Issue:** The `spriteBuilder.html` file attempts to load a script named `spriteEditor.js`. However, the TypeScript source file is named `spriteBuilder.ts`.
- **Reason:** This is a simple file name mismatch.
- **Suggested Fix:** Rename the script `src` in `spriteBuilder.html` to `spriteBuilder.js` (assuming that is the compiled output name) to match the source file and ensure the code loads correctly.

### 6. Potential Missing Dependency
- **Issue:** The code imports `JSZip` for the export functionality. If `jszip` and its types (`@types/jszip`) are not listed in `package.json`, the project will fail to compile or the export will fail at runtime.
- **Reason:** Missing dependency declaration.
- **Suggested Fix:** Verify that `jszip` is included as a dependency in the `package.json` file.

## Suggested Optimizations

These are suggestions for improving performance, user experience, and code quality.

### 1. Drawing Performance with a Preview Canvas
- **Suggestion:** For smoother live previews of complex shapes (like lines and circles), consider using a second, temporary canvas layered on top of the main drawing canvas. The current shape preview would be drawn on this top canvas, which can be cleared and redrawn on every mouse move without the performance cost of redrawing all the previously committed shapes from the `shapes` array each time.
- **Benefit:** Improved performance and responsiveness, especially in frames with many shapes.

### 2. Gutter Image Update Performance
- **Suggestion:** The frame's thumbnail in the bottom gutter is updated by calling `updateFrameGutter`, which uses the expensive `toDataURL()` operation. This is called every time a shape is completed. Consider updating the thumbnail less frequently, for example, only when the user saves the drawing or switches to a different frame.
- **Benefit:** Reduced CPU usage and a more responsive UI during drawing.

### 3. UI/UX: Disable Unavailable Actions
- **Suggestion:** Buttons for actions that cannot be performed should be disabled. For example, the "Create Frame" button should be disabled if no animation is selected.
- **Benefit:** Provides a clearer user experience and prevents unnecessary alerts.

### 4. Code Refactoring in `redrawShapes`
- **Suggestion:** The drawing logic for `pencil`, `line`, and `polygon` shapes within the `redrawShapes` method is very similar. This could be refactored into a more generic path-drawing function to reduce code duplication.
- **Benefit:** Improved code maintainability.
