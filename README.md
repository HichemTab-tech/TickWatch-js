# TickWatch jQuery Plugin

## Overview

**TickWatch** is a versatile jQuery plugin that enables you to create dynamic electronic clocks in your web applications. The plugin allows users to display clocks that can count up or down with customizable formats, and provides various control methods to manage the clock's behavior.

## Table of Contents

- [Requirements](#requirements)
- [Features](#features)
- [Installation](#installation)
    - [npm](#npm)
    - [CDN](#cdn)
    - [Local Download](#local-download)
- [Usage](#usage)
- [Example](#example)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [Demo](#demo)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## Requirements

To use the TickWatch jQuery Plugin, you need the following dependencies:
- jQuery (minimum version 3.7.0)

You can include these dependencies in your HTML file via CDN or by downloading the files locally.

## Features

- Count up or down clocks.
- Customizable time formats (hours, minutes, seconds, and days).
- Control methods to start, stop, and set the time.
- Event triggers for start, stop, update, and end actions.
- Easy integration with existing jQuery projects.
- Lightweight and minimal design.

## Installation

To use the TickWatch jQuery Plugin in your project, you can include the necessary files via npm, CDN,
or by downloading the files locally.

### npm

You can install TickWatch via npm:
```bash
npm install tickwatch-js
```

### CDN

You can also include TickWatch directly from a CDN by adding the following script tag to your HTML file:
```html
<script src="https://cdn.jsdelivr.net/npm/tickwatch-js@latest/dist/TickWatch.min.js"></script>
```

### Local Download

If you prefer to host the library locally,
you can download the latest release from the source code and include it in your project:
```html
<script src="path/to/TickWatch.min.js"></script>
```

## Usage

To use the TickWatch jQuery Plugin, follow these steps:

- Include the necessary scripts and stylesheets as described in the installation section.
- Create a target element in your HTML to initialize the clock.
- Initialize TickWatch on the target element using jQuery:

```html
<div id="myClock"></div>
<button id="startBtn">Start</button>
<button id="stopBtn">Stop</button>
<button id="setBtn">Set to 5 minutes</button>

<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<script src="path/to/TickWatch.min.js"></script>
<script>
$(document).ready(function() {
    const options = {
        direction: 'up',
        format: 'hh:mm:ss',
        startTime: '00:00:00'
    };
    
    $('#myClock').TickWatch(options);

    $('#startBtn').click(function() {
        $('#myClock').TickWatch('start');
    });

    $('#stopBtn').click(function() {
        $('#myClock').TickWatch('stop');
    });

    $('#setBtn').click(function() {
        $('#myClock').TickWatch('set', '00:05:00');
    });
});
</script>
```

## Example

### Time Clock

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TickWatch - Example</title>
</head>
<body>
    <div id="myClock"></div>
    <button id="startBtn">Start</button>
    <button id="stopBtn">Stop</button>
    <button id="setBtn">Set to 5 minutes</button>

    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script src="path/to/TickWatch.min.js"></script>
    <script>
    $(document).ready(function() {
        $('#myClock').TickWatch({
            direction: 'up',
            format: 'hh:mm:ss',
            startTime: '00:00:00'
        });

        $('#startBtn').click(function() {
            $('#myClock').TickWatch('start');
        });

        $('#stopBtn').click(function() {
            $('#myClock').TickWatch('stop');
        });

        $('#setBtn').click(function() {
            $('#myClock').TickWatch('set', '00:05:00');
        });
    });
    </script>
</body>
</html>
```

### Number display

```html
<h2 class="h2">Display</h2>
<div class="display d-flex justify-content-center"></div>
<div class="mb-3">
    <label for="number" class="form-label">Number</label>
    <input type="text" class="form-control" id="number" name="number" placeholder="Enter a number">
</div>
<button type="button" class="btn btn-primary" id="set">Set</button>

<script>
$(document).ready(function() {
    const displayElement = $('.display');
    displayElement.TickWatch({
        displayOnly: true,
        displaySize: 2,
    });

    $('#set').on('click', function () {
        displayElement.TickWatch('set', $("#number").val());
    });
});
</script>
```

## Options

| Option              | Type    | Default                               | Description                                                                                                                    |
|---------------------|---------|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `partsKeys`         | Array   | `['seconds', 'minutes', {hours: 24}]` | Defines each part of the clock and its maximum value. Example: `['seconds', 'minutes', {hours: 24}, {days: 31}, {month: 12}]`. |
| `direction`         | String  | 'up'                                  | The direction of the clock ('up' for count up, 'down' for count down).                                                         |
| `startTime`         | String  | null                                  | The initial time of the clock.                                                                                                 |
| `endTime`           | String  | null                                  | The end time of the clock. Used in countdown mode.                                                                             |
| `activeCellClass`   | String  | 'active-cell'                         | The class to add to the active segment of the electronic cell (e.g., red or high opacity).                                     |
| `inactiveCellClass` | String  | 'inactive-cell'                       | The class to add to the inactive segment of the electronic cell (e.g., low opacity).                                           |
| `displayOnly`       | Boolean | false                                 | If true, displays static numbers instead of a clock.                                                                           |
| `displaySize`       | Number  | null                                  | Number of digits to display when `displayOnly` is true.                                                                        |



## Methods

The TickWatch jQuery Plugin provides the following methods:

- **`start()`**: Start the clock.
- **`stop()`**: Stop the clock.
- **`set(time)`**: Set the clock to a specific time.
- **`clear()`**: Clear the current time and reset to the start time.
- **`option(key, value)`**: Get or set an option dynamically.
- **`destroy()`**: Destroy the clock instance.

## Events

TickWatch triggers the following events:

- `TickWatch.start`: Triggered when the clock starts.
- `TickWatch.stop`: Triggered when the clock stops.
- `TickWatch.update`: Triggered when the clock updates.
- `TickWatch.end`: Triggered when the clock reaches the end time.
- `TickWatch.clear`: Triggered when the clock is cleared.
- `TickWatch.destroy`: Triggered when the clock instance is destroyed.

## Demo

Here's a Demo example :

[Demo](https://hichemtab-tech.github.io/TickWatch-js)



## Contributing

Contributions are always welcome!

If you have any ideas, improvements, or bug fixes,
please [open an issue](https://github.com/HichemTab-tech/TickWatch-js/issues)
or [submit a pull request](https://github.com/HichemTab-tech/TickWatch-js/pulls).

## Author

- [HichemTab-tech](https://www.github.com/HichemTab-tech)

## License

[MIT](https://github.com/HichemTab-tech/TickWatch-js/blob/master/LICENSE)