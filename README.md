Basic pipline


Game is a part -> act -> defers to currentScene.act()
Scene is a part -> act -> loops through layers -> layer.act();
Layer is a part -> act -> loops through GameObjects -> gameObject.act();
GameObjects are parts -> act -> goes through child parts and calls act on those (maybe renderers, maybe physics engines, movement, etc)