var MODALIZER_ANIMATION;
(function (MODALIZER_ANIMATION) {
    MODALIZER_ANIMATION["FADE_IN"] = "fadeIn";
    MODALIZER_ANIMATION["FADE_OUT"] = "fadeOut";
})(MODALIZER_ANIMATION || (MODALIZER_ANIMATION = {}));
var MODALIZER_STATE;
(function (MODALIZER_STATE) {
    MODALIZER_STATE["OPENING"] = "opening";
    MODALIZER_STATE["OPENED"] = "opened";
    MODALIZER_STATE["CLOSING"] = "closing";
    MODALIZER_STATE["CLOSED"] = "closed";
})(MODALIZER_STATE || (MODALIZER_STATE = {}));
class Modalizer {
    constructor(modalizable) {
        this.enabledEvents = [];
        this.modalized = this.modalize(modalizable);
        this.initialize();
    }
    show() {
        if (this.modalized.state !== MODALIZER_STATE.CLOSED)
            return;
        this.modalized.target.classList.add(this.modalized.config.animationIn);
        this.modalized.target.showModal();
        this.modalized.target.setAttribute('opening', '');
        this.modalized.state = MODALIZER_STATE.OPENING;
    }
    hide() {
        if (this.modalized.state !== MODALIZER_STATE.OPENED)
            return;
        this.modalized.target.classList.add(this.modalized.config.animationOut);
        this.modalized.target.setAttribute('closing', '');
        this.modalized.state = MODALIZER_STATE.CLOSING;
    }
    destroy() {
        this.modalized.target.close();
        this.enabledEvents.forEach(activeEvent => {
            const { listener, eventType, action } = activeEvent;
            listener.removeEventListener(eventType, action);
        });
        this.modalized.target.parentElement?.removeChild(this.modalized.target);
    }
    // Initializers
    modalize(modalizable) {
        const { element, trigger, config } = modalizable;
        const modalized = {
            target: this.insertElementIntoModalizedTarget(element),
            trigger,
            config: config ? { ...this.defaultConfig(), ...config } : this.defaultConfig(),
            state: MODALIZER_STATE.CLOSED
        };
        return modalized;
    }
    insertElementIntoModalizedTarget(element) {
        const modalizerRoot = element?.parentElement || document.body;
        const modalizedElement = document.createElement('dialog');
        modalizedElement.classList.add('modalizer');
        modalizerRoot.insertBefore(modalizedElement, element);
        modalizedElement.appendChild(element);
        return modalizedElement;
    }
    initialize() {
        const { target, config } = this.modalized;
        this.enableEvent(target, 'animationend', this.handleAnimationEvents.bind(this));
        this.enableEvent(target, 'cancel', this.handleCancelEvents.bind(this));
        this.enableEvent(document, 'keydown', this.handleKeydownEvents.bind(this));
        if (config?.closer)
            this.enableEvent(config.closer, 'click', this.hide.bind(this));
        if (this.modalized.trigger)
            this.enableEvent(document, 'click', this.handleClickEvents.bind(this));
        if (config?.customClassName)
            target.classList.add(config.customClassName);
        this.enabledEvents.forEach(activeEvent => {
            const { listener, eventType, action } = activeEvent;
            listener.addEventListener(eventType, action);
        });
        this.modalized.target.classList.add('modalizer--initialized');
    }
    // Event handlers
    enableEvent(listener, eventType, action) {
        this.enabledEvents.push({ listener, eventType, action });
    }
    handleClickEvents(e) {
        const target = e.target;
        if (!target || target !== this.modalized.trigger)
            return;
        this.show();
    }
    handleKeydownEvents(e) {
        if (e.code !== 'Escape')
            return;
        if (!this.modalized.config.closeOnEscKeyPress)
            return;
        this.hide();
    }
    handleAnimationEvents(e) {
        const { pseudoElement } = e;
        if (pseudoElement)
            return;
        if (this.modalized.state === MODALIZER_STATE.OPENING) {
            this.setAsOpened();
            return;
        }
        if (this.modalized.state === MODALIZER_STATE.CLOSING) {
            this.setAsClosed();
            return;
        }
    }
    handleCancelEvents(e) {
        e.preventDefault();
    }
    // Final state setters
    setAsOpened() {
        if (this.modalized.state !== MODALIZER_STATE.OPENING)
            return;
        this.modalized.target.removeAttribute('opening');
        this.modalized.state = MODALIZER_STATE.OPENED;
        this.modalized.target.classList.remove(this.modalized.config.animationIn);
    }
    setAsClosed() {
        if (this.modalized.state !== MODALIZER_STATE.CLOSING)
            return;
        this.modalized.target.close();
        this.modalized.target.removeAttribute('closing');
        this.modalized.state = MODALIZER_STATE.CLOSED;
        this.modalized.target.classList.remove(this.modalized.config.animationOut);
    }
    // Default
    defaultConfig() {
        return {
            animationIn: MODALIZER_ANIMATION.FADE_IN,
            animationOut: MODALIZER_ANIMATION.FADE_OUT,
            closeOnEscKeyPress: true
        };
    }
}export{Modalizer};