var MODALIZER_ANIMATION;
(function (MODALIZER_ANIMATION) {
    MODALIZER_ANIMATION["FADE_IN"] = "modalizer-fadeIn";
    MODALIZER_ANIMATION["FADE_OUT"] = "modalizer-fadeOut";
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
        this.registeredEvents = [];
        const { element, trigger, config } = modalizable;
        this.target = this.wrapContentIntoModalizedTarget(element);
        this.trigger = trigger;
        this.config = config ? { ...this.defaultConfig(), ...config } : this.defaultConfig();
        this.state = MODALIZER_STATE.CLOSED;
        this.initialize();
    }
    show() {
        if (this.state !== MODALIZER_STATE.CLOSED)
            return;
        this.target.classList.add(this.config.animationIn);
        this.target.showModal();
        this.target.setAttribute('opening', '');
        this.state = MODALIZER_STATE.OPENING;
    }
    hide() {
        if (this.state !== MODALIZER_STATE.OPENED)
            return;
        this.target.classList.add(this.config.animationOut);
        this.target.setAttribute('closing', '');
        this.state = MODALIZER_STATE.CLOSING;
    }
    destroy() {
        this.target.close();
        this.registeredEvents.forEach(activeEvent => {
            const { listener, eventType, action } = activeEvent;
            listener.removeEventListener(eventType, action);
        });
        this.target.parentElement?.removeChild(this.target);
    }
    // Initializers
    wrapContentIntoModalizedTarget(content) {
        const modalizerRoot = content?.parentElement || document.body;
        const modalizedElement = document.createElement('dialog');
        modalizedElement.classList.add('modalizer');
        modalizerRoot.insertBefore(modalizedElement, content);
        modalizedElement.appendChild(content);
        return modalizedElement;
    }
    initialize() {
        const { target, trigger, config } = this;
        this.registerEvent(target, 'animationend', this.setStateOnAnimationEnd.bind(this));
        this.registerEvent(target, 'cancel', this.closeOnCancel.bind(this));
        if (config?.closer)
            this.registerEvent(config.closer, 'click', this.hide.bind(this));
        if (trigger)
            this.registerEvent(trigger, 'click', this.show.bind(this));
        this.registeredEvents.forEach(activeEvent => {
            const { listener, eventType, action } = activeEvent;
            listener.addEventListener(eventType, action);
        });
        if (config?.customClassName)
            target.classList.add(config.customClassName);
        this.target.classList.add('modalizer--initialized');
    }
    // Event handlers
    registerEvent(listener, eventType, action) {
        this.registeredEvents.push({ listener, eventType, action });
    }
    closeOnCancel(e) {
        e.preventDefault();
        if (!this.config.closeOnEscKeyPress)
            return;
        this.hide();
    }
    setStateOnAnimationEnd(e) {
        if (e.pseudoElement)
            return;
        switch (this.state) {
            case MODALIZER_STATE.OPENING:
                this.setAsOpened();
                break;
            case MODALIZER_STATE.CLOSING:
                this.setAsClosed();
                break;
        }
    }
    // Final state setters
    setAsOpened() {
        this.target.removeAttribute('opening');
        this.state = MODALIZER_STATE.OPENED;
        this.target.classList.remove(this.config.animationIn);
    }
    setAsClosed() {
        this.target.close();
        this.target.removeAttribute('closing');
        this.state = MODALIZER_STATE.CLOSED;
        this.target.classList.remove(this.config.animationOut);
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