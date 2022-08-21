// Copyright (c) 2020 8th Wall, Inc.
//
// app.js is the main entry point for your 8th Wall web app. Code here will execute after head.html
// is loaded, and before body.html is loaded.

import {tapButtonComponent} from './tap-button'
// Register custom A-Frame components in app.js before the scene in body.html has loaded.
AFRAME.registerComponent('tap-button', tapButtonComponent)