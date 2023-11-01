<p align="center">
 <a target="_blank" href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/-TypeScript-FFFFFF?logo=typescript"></a>
<a target="_blank" href="https://sass-lang.com/"><img src="https://img.shields.io/badge/-Sass-pink?logo=sass"></a>
<a target="_blank" href="https://terser.org/"><img src="https://img.shields.io/badge/-Terser-00299F?logo=javascript"></a>
<a target="_blank" href="https://rollupjs.org/"><img src="https://img.shields.io/badge/-Rollup-FCAF41?logo=rollupdotjs"></a>
<a target="_blank" href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/-Npmjs-231F20?logo=npm"></a>
</p>

# Modalizer

Modalizer is a TypeScript library for creating and managing modals in web applications. It provides an easy way to create modal dialogs with customizable animations and styles.

[View working example](https://chemaalfonso.github.io/modalizer/)

## Features

- Native: Keep the native way using native dialog html element.
- Ease of Use: Implement modals in minutes with a simple and user-friendly API.
- Keep your rules: Modalizer only modalizes your content but you still have all its control.
- Dependency free: Modalizer use 0 dependencies.
- Quick Customization: Adapt the appearance of your modals to fit your project.
- Custom HTML Content: Effortlessly load any HTML content into your modals.
- Compatible animations: Compatible with [Animate.css](https://animate.style/) animations
- Customizable animations: Make your own and use custom animations
- Created in TypeScript: Modalizer is designed for use in TypeScript and JavaScript
	projects.
- Only 3.7kb
- Responsive: Native elements fits your needs on every screen
- Free use: MIT licensed

## Installation

To use Modalizer in your project, you can install it via npm:

```bash
npm i modalizer
```

## Usage

Include basic style rules
```html

<link rel="stylesheet" href="path/to/modalizer.css">
```

### Typescript minimal example with HTML trigger
```typescript
import { Modalizer, Modalizable } from 'modalizer'

// Define your modal content and trigger elements
const element = document.querySelector('your-modal-content')
const trigger = document.querySelector('your-modal-trigger')

// Create Modalizable objects
const modalizable: Modalizable = { element, trigger }

// Create a Modalizer instance
const modalizer = new Modalizer(modalizable)
```

### JavaScript minimal example with HTML trigger

```javascript
import { Modalizer } from 'modalizer'

// Define your modal content and trigger elements
const element = document.querySelector('your-modal-content')
const trigger = document.querySelector('your-modal-trigger')

// Create Modalizable objects
const modalizable = { element, trigger }

// Create a Modalizer instance
const modalizer = new Modalizer(modalizable)
```

### Programatic modal invocation
```typescript
import { Modalizer, Modalizable } from 'modalizer'

// Define your modal content
const element = document.querySelector('your-modal-content')

// Create a Modalizer instance
const modalizer = new Modalizer({ element })

// Show modal
modalizer.show()

// Hide modal
modalizer.hide()
```

## Configuration

### Using config object
```typescript

import { ModalizerConfig } from 'modalizer'

const config: ModalizerConfig = {
	animationIn: 'myInAnimation', // CSS class name including animation property
	animationOut: 'myOutAnimation', // CSS class name including animation property
	closeOnEscKeyPress: boolean, // Enable or disable close on esc behaviour
	closer: HTMLElement, // HTML element to close modal on click
	customClassName: 'my-class-name' // CSS class name to apply custom styles
}
```
## Styling 

### Customizing styles

Include a custom class name
```typescript

import { ModalizerConfig } from 'modalizer'

const config: ModalizerConfig = {
	customClassName: 'my-class-name',
	...
}
```

Apply your styles
```css
.my-class-name {
	--modalizer-animation-duration: 0.4s;
	border-radius: 8px;
}

.my-class-name::backdrop {
	background: #6749e39f;
}

```
## Using animations
You can use any animation source. The only requeriment is a css class with the animation property and use it on the config object.

### Using [Animate.css](https://animate.style/) animations

Include animate.css rules
```html

<link rel="stylesheet" href="path/to/animate.css">
```
> ⚠️ Modalizer package includes a simplified animate.css version including only the in & out based animations.

Use Animate.css animation class names on config
```typescript

import { ModalizerConfig } from 'modalizer'

const config: ModalizerConfig = {
	animationIn: 'lightSpeedInLeft',
	animationOut: 'flipOutX'
}
```


### Creating custom animations


Create your custom animation and assign to css classes
```css

.fadeIn {
	animation: fadeIn 0.25s forwards;
}

.fadeOut {
	animation: fadeOut 0.25s forwards;
}

@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes fadeOut {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
```

Use created css classes on config object
```typescript

import { ModalizerConfig } from 'modalizer'

const config: ModalizerConfig = {
	animationIn: 'fadeIn',
	animationOut: 'fadeOut'
}
```

## License
Modalizer is licensed under the MIT [LICENSE](LICENSE). See the LICENSE file for details.


## Contact
If you have any questions or suggestions, feel free to open an issue.