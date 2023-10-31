var t,e;!function(t){t.FADE_IN="fadeIn",t.FADE_OUT="fadeOut"}(t||(t={})),function(t){t.OPENING="opening",t.OPENED="opened",t.CLOSING="closing",t.CLOSED="closed"}(e||(e={}));class i{constructor(t){this.openedModalizations=[],this.modalizations=new Map,this.modalize(t),this.listen()}closeLast(){this.openedModalizations.length&&this.hideModalized(this.openedModalizations[this.openedModalizations.length-1])}add(t){this.modalize(t)}reset(t=!0){this.modalizations.forEach((e=>{e.target.close(),t&&e.target.parentElement?.insertBefore(e.target.firstChild,e.target),e.target.parentElement?.removeChild(e.target)})),this.modalizations.clear(),this.openedModalizations=[]}modalize(t=[]){t.forEach((({element:t,trigger:i,config:a})=>{const n={target:this.insertElementIntoModalizedTarget(t),trigger:i,config:a?{...this.defaultConfig(),...a}:this.defaultConfig(),state:e.CLOSED};this.initializeModalized(n),this.modalizations.set(i,n)}))}insertElementIntoModalizedTarget(t){const e=t?.parentElement||document.body,i=document.createElement("dialog");return i.classList.add("modalizer"),e.insertBefore(i,t),i.appendChild(t),i}initializeModalized(t){const{target:i,config:a}=t;a?.closer&&a.closer.addEventListener("click",(()=>this.hideModalized(t))),a?.customClassName&&i.classList.add(a.customClassName),i.addEventListener("animationend",(i=>{const{animationName:n,pseudoElement:o}=i;o||(n!==a.animationIn||t.state!==e.OPENING?n!==a.animationOut||t.state!==e.CLOSING||this.closeModalized(t):this.openModalized(t))})),i.addEventListener("cancel",(t=>{t.preventDefault()})),t.target.classList.add("modalizer--initialized")}listen(){document.addEventListener("click",(t=>{const e=t.target;if(!e)return;const i=this.modalizations.get(e);i&&this.showModalized(i)})),document.addEventListener("keydown",(t=>{if("Escape"!==t.code||!this.openedModalizations.length)return;const e=this.openedModalizations[this.openedModalizations.length-1];e.config.closeOnEscKeyPress&&this.hideModalized(e)}))}showModalized(t){t.state===e.CLOSED&&(t.config?.animationIn&&t.target.classList.add(t.config.animationIn),t.target.showModal(),t.target.setAttribute("opening",""),t.state=e.OPENING,this.openedModalizations.push(t))}openModalized(t){t.state===e.OPENING&&(t.target.removeAttribute("opening"),t.state=e.OPENED,t.config?.animationIn&&t.target.classList.remove(t.config.animationIn))}hideModalized(t){t.state===e.OPENED&&(t.target.setAttribute("closing",""),t.state=e.CLOSING,t.config?.animationOut&&t.target.classList.add(t.config.animationOut))}closeModalized(t){t.state===e.CLOSING&&(t.target.close(),t.target.removeAttribute("closing"),t.state=e.CLOSED,t.config?.animationOut&&t.target.classList.remove(t.config.animationOut),this.openedModalizations.pop())}defaultConfig(){return{animationIn:t.FADE_IN,animationOut:t.FADE_OUT,closeOnEscKeyPress:!0}}}export{i as Modalizer};