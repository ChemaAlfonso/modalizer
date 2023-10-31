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
    constructor(modalizables) {
        this.openedModalizations = [];
        this.modalizations = new Map();
        this.modalize(modalizables);
        this.listen();
    }
    closeLast() {
        if (!this.openedModalizations.length)
            return;
        this.hideModalized(this.openedModalizations[this.openedModalizations.length - 1]);
    }
    add(modalizables) {
        this.modalize(modalizables);
    }
    reset(keepContent = true) {
        this.modalizations.forEach(modalization => {
            modalization.target.close();
            if (keepContent)
                modalization.target.parentElement?.insertBefore(modalization.target.firstChild, modalization.target);
            modalization.target.parentElement?.removeChild(modalization.target);
        });
        this.modalizations.clear();
        this.openedModalizations = [];
    }
    // Generate
    modalize(modalizables = []) {
        modalizables.forEach(({ element, trigger, config }) => {
            const modalized = {
                target: this.insertElementIntoModalizedTarget(element),
                trigger,
                config: config ? { ...this.defaultConfig(), ...config } : this.defaultConfig(),
                state: MODALIZER_STATE.CLOSED
            };
            this.initializeModalized(modalized);
            this.modalizations.set(trigger, modalized);
        });
    }
    insertElementIntoModalizedTarget(element) {
        const modalizerRoot = element?.parentElement || document.body;
        const modalizedElement = document.createElement('dialog');
        modalizedElement.classList.add('modalizer');
        modalizerRoot.insertBefore(modalizedElement, element);
        modalizedElement.appendChild(element);
        return modalizedElement;
    }
    // Initialize
    initializeModalized(modalized) {
        const { target, config } = modalized;
        if (config?.closer)
            config.closer.addEventListener('click', () => this.hideModalized(modalized));
        if (config?.customClassName)
            target.classList.add(config.customClassName);
        target.addEventListener('animationend', e => {
            const { animationName, pseudoElement } = e;
            if (pseudoElement)
                return;
            if (animationName === config.animationIn && modalized.state === MODALIZER_STATE.OPENING) {
                this.openModalized(modalized);
                return;
            }
            if (animationName === config.animationOut && modalized.state === MODALIZER_STATE.CLOSING) {
                this.closeModalized(modalized);
                return;
            }
        });
        target.addEventListener('cancel', e => {
            e.preventDefault();
        });
        modalized.target.classList.add('modalizer--initialized');
    }
    listen() {
        document.addEventListener('click', e => {
            const target = e.target;
            if (!target)
                return;
            const modalized = this.modalizations.get(target);
            if (!modalized)
                return;
            this.showModalized(modalized);
        });
        document.addEventListener('keydown', e => {
            if (e.code !== 'Escape' || !this.openedModalizations.length)
                return;
            const lastModalizedOpened = this.openedModalizations[this.openedModalizations.length - 1];
            if (!lastModalizedOpened.config.closeOnEscKeyPress)
                return;
            this.hideModalized(lastModalizedOpened);
        });
    }
    // Behaviours
    showModalized(modalized) {
        if (modalized.state !== MODALIZER_STATE.CLOSED)
            return;
        if (modalized.config?.animationIn)
            modalized.target.classList.add(modalized.config.animationIn);
        modalized.target.showModal();
        modalized.target.setAttribute('opening', '');
        modalized.state = MODALIZER_STATE.OPENING;
        this.openedModalizations.push(modalized);
    }
    openModalized(modalized) {
        if (modalized.state !== MODALIZER_STATE.OPENING)
            return;
        modalized.target.removeAttribute('opening');
        modalized.state = MODALIZER_STATE.OPENED;
        if (modalized.config?.animationIn)
            modalized.target.classList.remove(modalized.config.animationIn);
    }
    hideModalized(modalized) {
        if (modalized.state !== MODALIZER_STATE.OPENED)
            return;
        modalized.target.setAttribute('closing', '');
        modalized.state = MODALIZER_STATE.CLOSING;
        if (modalized.config?.animationOut)
            modalized.target.classList.add(modalized.config.animationOut);
    }
    closeModalized(modalized) {
        if (modalized.state !== MODALIZER_STATE.CLOSING)
            return;
        modalized.target.close();
        modalized.target.removeAttribute('closing');
        modalized.state = MODALIZER_STATE.CLOSED;
        if (modalized.config?.animationOut)
            modalized.target.classList.remove(modalized.config.animationOut);
        this.openedModalizations.pop();
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