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
	animationIn: MODALIZER_ANIMATION
	animationOut: MODALIZER_ANIMATION
	closer?: ModalizerCloser
	closeOnEscKeyPress: boolean
	customClassName?: string
}

export interface Modalizable {
	element: ModalizerContent
	trigger?: ModalizerTrigger
	config?: Partial<ModalizerConfig>
}

interface Modalized {
	target: ModalizerTarget
	trigger?: ModalizerTrigger
	config: ModalizerConfig
	state: MODALIZER_STATE
}

export class Modalizer {
	private modalized: Modalized
	private enabledEvents: { listener: HTMLElement | Document; eventType: string; action: (e: any) => void }[] = []

	constructor(modalizable: Modalizable) {
		this.modalized = this.modalize(modalizable)
		this.initialize()
	}

	show() {
		if (this.modalized.state !== MODALIZER_STATE.CLOSED) return

		this.modalized.target.classList.add(this.modalized.config.animationIn)

		this.modalized.target.showModal()
		this.modalized.target.setAttribute('opening', '')
		this.modalized.state = MODALIZER_STATE.OPENING
	}

	hide() {
		if (this.modalized.state !== MODALIZER_STATE.OPENED) return

		this.modalized.target.classList.add(this.modalized.config.animationOut)

		this.modalized.target.setAttribute('closing', '')
		this.modalized.state = MODALIZER_STATE.CLOSING
	}

	destroy() {
		this.modalized.target.close()
		this.enabledEvents.forEach(activeEvent => {
			const { listener, eventType, action } = activeEvent
			listener.removeEventListener(eventType, action)
		})
		this.modalized.target.parentElement?.removeChild(this.modalized.target)
	}

	// Initializers
	private modalize(modalizable: Modalizable): Modalized {
		const { element, trigger, config } = modalizable

		const modalized: Modalized = {
			target: this.insertElementIntoModalizedTarget(element),
			trigger,
			config: config ? { ...this.defaultConfig(), ...config } : this.defaultConfig(),
			state: MODALIZER_STATE.CLOSED
		}

		return modalized
	}

	private insertElementIntoModalizedTarget(element: HTMLElement): ModalizerTarget {
		const modalizerRoot = element?.parentElement || document.body

		const modalizedElement = document.createElement('dialog')
		modalizedElement.classList.add('modalizer')

		modalizerRoot.insertBefore(modalizedElement, element)
		modalizedElement.appendChild(element)

		return modalizedElement
	}

	private initialize(): void {
		const { target, config } = this.modalized

		this.enableEvent(target, 'animationend', this.handleAnimationEvents.bind(this))
		this.enableEvent(target, 'cancel', this.handleCancelEvents.bind(this))
		this.enableEvent(document, 'keydown', this.handleKeydownEvents.bind(this))

		if (config?.closer) this.enableEvent(config.closer, 'click', this.hide.bind(this))

		if (this.modalized.trigger) this.enableEvent(this.modalized.trigger, 'click', this.handleClickEvents.bind(this))

		if (config?.customClassName) target.classList.add(config.customClassName)

		this.enabledEvents.forEach(activeEvent => {
			const { listener, eventType, action } = activeEvent
			listener.addEventListener(eventType, action)
		})

		this.modalized.target.classList.add('modalizer--initialized')
	}

	// Event handlers
	private enableEvent(listener: HTMLElement | Document, eventType: string, action: (e: any) => void) {
		this.enabledEvents.push({ listener, eventType, action })
	}

	private handleClickEvents(e: MouseEvent) {
		const target = e.target as HTMLElement

		if (!target) return

		this.show()
	}

	private handleKeydownEvents(e: KeyboardEvent) {
		if (e.code !== 'Escape') return

		if (!this.modalized.config.closeOnEscKeyPress) return

		this.hide()
	}

	private handleAnimationEvents(e: AnimationEvent) {
		const { pseudoElement } = e

		if (pseudoElement) return

		if (this.modalized.state === MODALIZER_STATE.OPENING) {
			this.setAsOpened()
			return
		}

		if (this.modalized.state === MODALIZER_STATE.CLOSING) {
			this.setAsClosed()
			return
		}
	}

	private handleCancelEvents(e: Event) {
		e.preventDefault()
	}

	// Final state setters
	private setAsOpened() {
		if (this.modalized.state !== MODALIZER_STATE.OPENING) return

		this.modalized.target.removeAttribute('opening')
		this.modalized.state = MODALIZER_STATE.OPENED

		this.modalized.target.classList.remove(this.modalized.config.animationIn)
	}

	private setAsClosed() {
		if (this.modalized.state !== MODALIZER_STATE.CLOSING) return

		this.modalized.target.close()
		this.modalized.target.removeAttribute('closing')
		this.modalized.state = MODALIZER_STATE.CLOSED

		this.modalized.target.classList.remove(this.modalized.config.animationOut)
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
