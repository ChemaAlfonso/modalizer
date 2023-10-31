enum MODALIZER_ANIMATION {
	FADE_IN = 'fadeIn',
	FADE_OUT = 'fadeOut'
}

enum MODALIZER_STATE {
	OPENING = 'opening',
	OPENED = 'opened',
	CLOSING = 'closing',
	CLOSED = 'closed'
}

type ModalizerTarget = HTMLDialogElement
type ModalizerTrigger = HTMLElement
type ModalizerContent = HTMLElement
type ModalizerCloser = HTMLElement

export interface ModalizerConfig {
	animationIn?: MODALIZER_ANIMATION
	animationOut?: MODALIZER_ANIMATION
	closer?: ModalizerCloser
	closeOnEscKeyPress?: boolean
	customClassName?: string
}

export interface Modalizable {
	element: ModalizerContent
	trigger: ModalizerTrigger
	config?: ModalizerConfig
}

interface Modalized {
	target: ModalizerTarget
	trigger: ModalizerTrigger
	config: ModalizerConfig
	state: MODALIZER_STATE
}

type Modalizations = Map<ModalizerTrigger, Modalized>

export class Modalizer {
	private modalizations: Modalizations
	private openedModalizations: Modalized[] = []

	constructor(modalizables: Modalizable[]) {
		this.modalizations = new Map()
		this.modalize(modalizables)
		this.listen()
	}

	closeLast(): void {
		if (!this.openedModalizations.length) return

		this.hideModalized(this.openedModalizations[this.openedModalizations.length - 1])
	}

	add(modalizables: Modalizable[]) {
		this.modalize(modalizables)
	}

	reset(keepContent = true) {
		this.modalizations.forEach(modalization => {
			modalization.target.close()

			if (keepContent)
				modalization.target.parentElement?.insertBefore(modalization.target.firstChild!, modalization.target)

			modalization.target.parentElement?.removeChild(modalization.target)
		})

		this.modalizations.clear()
		this.openedModalizations = []
	}

	// Generate
	private modalize(modalizables: Modalizable[] = []) {
		modalizables.forEach(({ element, trigger, config }) => {
			const modalized: Modalized = {
				target: this.insertElementIntoModalizedTarget(element),
				trigger,
				config: config ? { ...this.defaultConfig(), ...config } : this.defaultConfig(),
				state: MODALIZER_STATE.CLOSED
			}

			this.initializeModalized(modalized)

			this.modalizations.set(trigger, modalized)
		})
	}

	private insertElementIntoModalizedTarget(element: HTMLElement): ModalizerTarget {
		const modalizerRoot = element?.parentElement || document.body

		const modalizedElement = document.createElement('dialog')
		modalizedElement.classList.add('modalizer')

		modalizerRoot.insertBefore(modalizedElement, element)
		modalizedElement.appendChild(element)

		return modalizedElement
	}

	// Initialize
	private initializeModalized(modalized: Modalized): void {
		const { target, config } = modalized

		if (config?.closer) config.closer.addEventListener('click', () => this.hideModalized(modalized))

		if (config?.customClassName) target.classList.add(config.customClassName)

		target.addEventListener('animationend', e => {
			const { animationName, pseudoElement } = e

			if (pseudoElement) return

			if (animationName === config.animationIn && modalized.state === MODALIZER_STATE.OPENING) {
				this.openModalized(modalized)
				return
			}

			if (animationName === config.animationOut && modalized.state === MODALIZER_STATE.CLOSING) {
				this.closeModalized(modalized)
				return
			}
		})

		target.addEventListener('cancel', e => {
			e.preventDefault()
		})

		modalized.target.classList.add('modalizer--initialized')
	}

	private listen() {
		document.addEventListener('click', e => {
			const target = e.target as HTMLElement

			if (!target) return

			const modalized = this.modalizations.get(target)

			if (!modalized) return

			this.showModalized(modalized)
		})

		document.addEventListener('keydown', e => {
			if (e.code !== 'Escape' || !this.openedModalizations.length) return

			const lastModalizedOpened = this.openedModalizations[this.openedModalizations.length - 1]

			if (!lastModalizedOpened.config.closeOnEscKeyPress) return

			this.hideModalized(lastModalizedOpened)
		})
	}

	// Behaviours
	private showModalized(modalized: Modalized) {
		if (modalized.state !== MODALIZER_STATE.CLOSED) return

		if (modalized.config?.animationIn) modalized.target.classList.add(modalized.config.animationIn)

		modalized.target.showModal()
		modalized.target.setAttribute('opening', '')
		modalized.state = MODALIZER_STATE.OPENING

		this.openedModalizations.push(modalized)
	}

	private openModalized(modalized: Modalized) {
		if (modalized.state !== MODALIZER_STATE.OPENING) return

		modalized.target.removeAttribute('opening')
		modalized.state = MODALIZER_STATE.OPENED

		if (modalized.config?.animationIn) modalized.target.classList.remove(modalized.config.animationIn)
	}

	private hideModalized(modalized: Modalized) {
		if (modalized.state !== MODALIZER_STATE.OPENED) return

		modalized.target.setAttribute('closing', '')
		modalized.state = MODALIZER_STATE.CLOSING

		if (modalized.config?.animationOut) modalized.target.classList.add(modalized.config.animationOut)
	}

	private closeModalized(modalized: Modalized) {
		if (modalized.state !== MODALIZER_STATE.CLOSING) return

		modalized.target.close()
		modalized.target.removeAttribute('closing')
		modalized.state = MODALIZER_STATE.CLOSED

		if (modalized.config?.animationOut) modalized.target.classList.remove(modalized.config.animationOut)

		this.openedModalizations.pop()
	}

	// Default
	private defaultConfig(): ModalizerConfig {
		return {
			animationIn: MODALIZER_ANIMATION.FADE_IN,
			animationOut: MODALIZER_ANIMATION.FADE_OUT,
			closeOnEscKeyPress: true
		}
	}
}
