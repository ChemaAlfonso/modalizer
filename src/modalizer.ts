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

export class Modalizer {
	private enabledEvents: { listener: HTMLElement | Document; eventType: string; action: (e: any) => void }[] = []
	private target: ModalizerTarget
	private trigger?: ModalizerTrigger
	private config: ModalizerConfig
	private state: MODALIZER_STATE

	constructor(modalizable: Modalizable) {
		const { element, trigger, config } = modalizable

		this.target = this.wrapContentIntoModalizedTarget(element)
		this.trigger = trigger
		this.config = config ? { ...this.defaultConfig(), ...config } : this.defaultConfig()
		this.state = MODALIZER_STATE.CLOSED

		this.initialize()
	}

	show() {
		if (this.state !== MODALIZER_STATE.CLOSED) return

		this.target.classList.add(this.config.animationIn)

		this.target.showModal()
		this.target.setAttribute('opening', '')
		this.state = MODALIZER_STATE.OPENING
	}

	hide() {
		if (this.state !== MODALIZER_STATE.OPENED) return

		this.target.classList.add(this.config.animationOut)

		this.target.setAttribute('closing', '')
		this.state = MODALIZER_STATE.CLOSING
	}

	destroy() {
		this.target.close()
		this.enabledEvents.forEach(activeEvent => {
			const { listener, eventType, action } = activeEvent
			listener.removeEventListener(eventType, action)
		})
		this.target.parentElement?.removeChild(this.target)
	}

	// Initializers
	private wrapContentIntoModalizedTarget(content: ModalizerContent): ModalizerTarget {
		const modalizerRoot = content?.parentElement || document.body

		const modalizedElement = document.createElement('dialog')
		modalizedElement.classList.add('modalizer')

		modalizerRoot.insertBefore(modalizedElement, content)
		modalizedElement.appendChild(content)

		return modalizedElement
	}

	private initialize(): void {
		const { target, config } = this

		this.enableEvent(target, 'animationend', this.handleAnimationEvents.bind(this))
		this.enableEvent(target, 'cancel', this.handleCancelEvents.bind(this))
		this.enableEvent(document, 'keydown', this.handleKeydownEvents.bind(this))

		if (config?.closer) this.enableEvent(config.closer, 'click', this.hide.bind(this))

		if (this.trigger) this.enableEvent(this.trigger, 'click', this.handleClickEvents.bind(this))

		if (config?.customClassName) target.classList.add(config.customClassName)

		this.enabledEvents.forEach(activeEvent => {
			const { listener, eventType, action } = activeEvent
			listener.addEventListener(eventType, action)
		})

		this.target.classList.add('modalizer--initialized')
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

		if (!this.config.closeOnEscKeyPress) return

		this.hide()
	}

	private handleAnimationEvents(e: AnimationEvent) {
		if (e.pseudoElement) return

		switch (this.state) {
			case MODALIZER_STATE.OPENING:
				this.setAsOpened()
				break
			case MODALIZER_STATE.CLOSING:
				this.setAsClosed()
				break

			default:
				break
		}
	}

	private handleCancelEvents(e: Event) {
		e.preventDefault()
	}

	// Final state setters
	private setAsOpened() {
		this.target.removeAttribute('opening')
		this.state = MODALIZER_STATE.OPENED

		this.target.classList.remove(this.config.animationIn)
	}

	private setAsClosed() {
		this.target.close()
		this.target.removeAttribute('closing')
		this.state = MODALIZER_STATE.CLOSED

		this.target.classList.remove(this.config.animationOut)
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
