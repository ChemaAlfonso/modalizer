declare enum MODALIZER_ANIMATION {
    FADE_IN = "fadeIn",
    FADE_OUT = "fadeOut"
}
type ModalizerTrigger = HTMLElement;
type ModalizerContent = HTMLElement;
type ModalizerCloser = HTMLElement;
export interface ModalizerConfig {
    animationIn: MODALIZER_ANIMATION;
    animationOut: MODALIZER_ANIMATION;
    closer?: ModalizerCloser;
    closeOnEscKeyPress: boolean;
    customClassName?: string;
}
export interface Modalizable {
    element: ModalizerContent;
    trigger?: ModalizerTrigger;
    config?: Partial<ModalizerConfig>;
}
export declare class Modalizer {
    private modalized;
    private enabledEvents;
    constructor(modalizable: Modalizable);
    show(): void;
    hide(): void;
    destroy(): void;
    private modalize;
    private insertElementIntoModalizedTarget;
    private initialize;
    private enableEvent;
    private handleClickEvents;
    private handleKeydownEvents;
    private handleAnimationEvents;
    private handleCancelEvents;
    private setAsOpened;
    private setAsClosed;
    private defaultConfig;
}
export {};
