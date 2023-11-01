declare enum MODALIZER_ANIMATION {
    FADE_IN = "fadeIn",
    FADE_OUT = "fadeOut"
}
type ModalizerTrigger = HTMLElement;
type ModalizerContent = HTMLElement;
type ModalizerCloser = HTMLElement;
export interface ModalizerConfig {
    animationIn: MODALIZER_ANIMATION | string;
    animationOut: MODALIZER_ANIMATION | string;
    closer?: ModalizerCloser;
    closeOnCancelPress: boolean;
    customClassName?: string;
}
export interface Modalizable {
    element: ModalizerContent;
    trigger?: ModalizerTrigger;
    config?: Partial<ModalizerConfig>;
}
export declare class Modalizer {
    private registeredEvents;
    private target;
    private trigger?;
    private config;
    private state;
    constructor(modalizable: Modalizable);
    show(): void;
    hide(): void;
    destroy(): void;
    private wrapContentIntoModalizedTarget;
    private initialize;
    private registerEvent;
    private closeOnCancel;
    private setStateOnAnimationEnd;
    private setAsOpened;
    private setAsClosed;
    private defaultConfig;
}
export {};
