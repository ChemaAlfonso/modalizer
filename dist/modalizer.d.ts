declare enum MODALIZER_ANIMATION {
    FADE_IN = "fadeIn",
    FADE_OUT = "fadeOut"
}
type ModalizerTrigger = HTMLElement;
type ModalizerContent = HTMLElement;
type ModalizerCloser = HTMLElement;
export interface ModalizerConfig {
    animationIn?: MODALIZER_ANIMATION;
    animationOut?: MODALIZER_ANIMATION;
    closer?: ModalizerCloser;
    closeOnEscKeyPress?: boolean;
    customClassName?: string;
}
export interface Modalizable {
    element: ModalizerContent;
    trigger: ModalizerTrigger;
    config?: ModalizerConfig;
}
export declare class Modalizer {
    private modalizations;
    private openedModalizations;
    constructor(modalizables: Modalizable[]);
    closeLast(): void;
    add(modalizables: Modalizable[]): void;
    reset(keepContent?: boolean): void;
    private modalize;
    private insertElementIntoModalizedTarget;
    private initializeModalized;
    private listen;
    private showModalized;
    private openModalized;
    private hideModalized;
    private closeModalized;
    private defaultConfig;
}
export {};
