<p align="center">
 <a target="_blank" href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/-TypeScript-FFFFFF?logo=typescript"></a>
<a target="_blank" href="https://sass-lang.com/"><img src="https://img.shields.io/badge/-Sass-pink?logo=sass"></a>
<a target="_blank" href="https://terser.org/"><img src="https://img.shields.io/badge/-Terser-00299F?logo=javascript"></a>
<a target="_blank" href="https://rollupjs.org/"><img src="https://img.shields.io/badge/-Rollup-FCAF41?logo=rollupdotjs"></a>
<a target="_blank" href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/-Npmjs-231F20?logo=npm"></a>
</p>

# Modalizer

Modalizer is a TypeScript library for creating and managing modals in web applications. It provides an easy way to create modal dialogs with customizable animations and styles.

## Features

- Native: Keep the native way using native dialog html element.
- Ease of Use: Implement modals in minutes with a simple and user-friendly API.
- Quick Customization: Adapt the appearance of your modals to fit your project.
- Custom HTML Content: Effortlessly load any HTML content into your modals.
- Compatible animations: Compatible with [Animate.css](https://animate.style/) animations
- Customizable animations: Make your own and use custom animations
- Created in TypeScript: Modalizer is designed for use in TypeScript and JavaScript
	projects.
- Only 4.3kb
- Responsive: Native elements fits your needs on every screen
- Free use: MIT licensed

## Installation

To use Modalizer in your project, you can install it via npm:

```bash
npm i modalizer
```

## Usage

### Typescript minimal example
```typescript
import { Modalizer, Modalizable } from 'modalizer'

// Define your modal content and trigger elements
const modalContent = document.querySelector('your-modal-content')
const modalTrigger = document.querySelector('your-modal-trigger')

// Create Modalizable objects
const modalizable: Modalizable = {
	element: modalContent,
	trigger: modalTrigger
}

// Create a Modalizer instance with an array of Modalizable objects
const modalizer = new Modalizer([modalizable])
```

### JavaScript minimal example

```javascript
import { Modalizer } from 'modalizer'

// Define your modal content and trigger elements
const modalContent = document.querySelector('your-modal-content')
const modalTrigger = document.querySelector('your-modal-trigger')

// Create Modalizable objects
const modalizable = {
	element: modalContent,
	trigger: modalTrigger
}

// Create a Modalizer instance with an array of Modalizable objects
const modalizer = new Modalizer([modalizable])
```
### Using custom config

```typescript

import { ModalizerConfig } from 'modalizer'

const config: ModalizerConfig = {
	animationIn: 'animationInName',
	animationOut: 'animationOutName',
	closeOnEscKeyPress: boolean,
	customClassName: 'CustomizableCssClassName'
}
```

## License
Modalizer is licensed under the MIT [LICENSE](LICENSE). See the LICENSE file for details.


## Contact
If you have any questions or suggestions, feel free to open an issue.