

<h1 align="center">
  Modalizer
</h1>

<p align="center">
<a target="_blank" href="https://www.npmjs.com/package/@chemaalfonso/modalizer"><img src="https://img.shields.io/npm/v/@chemaalfonso/modalizer" alt="NPM version"/></a>
<a target="_blank" href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/-TypeScript-FFFFFF?logo=typescript" alt="Typescript"></a>
<a target="_blank" href="https://sass-lang.com/"><img src="https://img.shields.io/badge/-Sass-pink?logo=sass" alt="Javascript"></a>
<a target="_blank" href="https://terser.org/"><img src="https://img.shields.io/badge/-Terser-DB3AB3?logo=javascript" alt="Terser"></a>
<a target="_blank" href="https://rollupjs.org/"><img src="https://img.shields.io/badge/-Rollup-FCAF41?logo=rollupdotjs" alt="Rollup"></a>
<a target="_blank" href="https://eslint.org/"><img src="https://img.shields.io/badge/-ESLint-4B32C4?logo=eslint" alt="ESLint"/></a>
<a target="_blank" href="https://prettier.io/"><img src="https://img.shields.io/badge/-Prettier-57B3B5?logo=prettier" alt="Prettier"/></a>
</p>

<p align="center">
	Modalizer is a JavaScript library for creating and managing modals in web applications. Written in TypeScript, it provides an easy way to create modal dialogs with customizable animations and styles.
</p>

## ✨ Features

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
- Only 3.3kb minimified incuding styles
- Responsive: Native elements fits your needs on every screen
- Free use: MIT licensed

## 👀 Demo
[View working example](https://chemaalfonso.github.io/modalizer/)

## ⚙️ Installation

To use Modalizer in your project, you can:

### Direct use from cdn
1. Basic styles:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@chemaalfonso/modalizer/dist/css/styles.min.css">
```

2. (Optional) Extra animations:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@chemaalfonso/modalizer/dist/css/animate.min.css">
```

3. Script:
```html
    <script type="module">
        import { Modalizer } from 'https://cdn.jsdelivr.net/npm/@chemaalfonso/modalizer/dist/modalizer.min.js'
    </script>
```

### Install via npm
```bash
npm i @chemaalfonso/modalizer
```

## 📝 Usage

### Import into your project
1. Include style rules:
	```js
    // Basic css styles with fade in & out default animations
	import '@chemaalfonso/modalizer/dist/css/styles.css';

    // (Optional) Extra animate.css animations
	import '@chemaalfonso/modalizer/dist/css/animate.css';
	```

2. Import & use script:

	### Minimal example with HTML trigger
	```typescript
	import { Modalizer, Modalizable } from '@chemaalfonso/modalizer'

	// Define your modal content and trigger elements
	const element = document.querySelector('your-modal-content') as HTMLElement
	const trigger = document.querySelector('your-modal-trigger') as HTMLElement

	// Create a Modalizer instance
	const modalizer = new Modalizer({ element, trigger })
	```

	### Programatic modal invocation
	```typescript
	import { Modalizer, Modalizable } from '@chemaalfonso/modalizer'

	// Define your modal content
	const element = document.querySelector('your-modal-content') as HTMLElement

	// Create a Modalizer instance
	const modalizer = new Modalizer({ element })

	// Show modal
	modalizer.show()

	// Hide modal
	modalizer.hide()
	```

## 🛠️ Configuration

### Using config object
```typescript

import { ModalizerConfig } from '@chemaalfonso/modalizer'

const config: ModalizerConfig = {
	animationIn: 'myInAnimation',
	animationOut: 'myOutAnimation',
	closeOnEscKeyPress: true,
	closer: myHtmlCloserElement,
	customClassName: 'my-class-name'
}
```
### Config options reference
| Property Name        | Default Value      			| Description                                     					|
|----------------------|--------------------------------|-------------------------------------------------------------------|
| animationIn          | `'modalizer-fadeIn'`         	| The css class name with the animation for modal entry.			|
| animationOut         | `'modalizer-fadeOut'`        	| The css class name with the animation for modal exit.				|
| closeOnEscKeyPress   | `true`             			| Controls whether the modal is closed when pressing "Cancel." 		|
| closer               | `undefined`        			| `Optional`: The HTML element to close the modal. 					|
| customClassName      | `undefined`        			| `Optional`: Allows setting a CSS class to customize the modal. 	|



## 🎨 Styling 

### Customizing styles

Include a custom class name
```typescript

import { ModalizerConfig } from '@chemaalfonso/modalizer'

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
## 💃 Using animations
You can use any animation source. The only requeriment is a css class with the animation property and use it on the config object.

### Using [Animate.css](https://animate.style/) animations

Include animate.css rules
```js
import '@chemaalfonso/modalizer/dist/css/animate.css';
```

> ⚠️ Modalizer package includes a simplified animate.css version including only the in & out based animations.

Use Animate.css animation class names on config
```typescript

import { ModalizerConfig } from '@chemaalfonso/modalizer'
import { MODALIZER_ANIMATE_ANIMATION_IN, MODALIZER_ANIMATE_ANIMATION_OUT } from '@chemaalfonso/modalizer/dist/animateAnimations'

const config: ModalizerConfig = {
	animationIn: MODALIZER_ANIMATE_ANIMATION_IN.LIGHTSPEED_IN_LEFT,
	animationOut: MODALIZER_ANIMATE_ANIMATION_OUT.FLIP_OUT_X
}
```


### Creating custom animations


1. Create your custom animation and assign to css classes:
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

2. Use created css classes on config object:
	```typescript

	import { ModalizerConfig } from '@chemaalfonso/modalizer'

	const config: ModalizerConfig = {
		animationIn: 'fadeIn',
		animationOut: 'fadeOut'
	}
	```

### 🔦 Linting

- `npm run lint`: Run linter
- `npm run lint:fix`: Fix lint issues

### 🔨 Dev

- `npm run dev`: Run tsc transpiler with watcher
- `npm run dev:styles`: Run styles compiler with watcher

### 📚 Build

- `npm run build`: Run project builder

## 📄 License
Modalizer is licensed under the MIT [LICENSE](LICENSE). See the LICENSE file for details.


## 📱 Contact
If you have any questions or suggestions, feel free to open an issue.
