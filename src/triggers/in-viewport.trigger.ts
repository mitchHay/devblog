import { Element } from 'lord-icon-element/element';
import { ITrigger } from 'lord-icon-element/interfaces';
import { Player } from 'lord-icon-element/player';

export class InViewportTrigger implements ITrigger {
  private element: Element;
  private targetElement: Element;
  private player: Player;
  private observer: IntersectionObserver;

  constructor(element: Element, targetElement: Element, player: Player) {
    this.element = element;
    this.targetElement = targetElement;
    this.player = player;

    const intersectionCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && this.player.isPlaying) {
          this.player.loop = false;
          this.player.pause();
        } else if (!this.player.isPlaying) {
          this.player.loop = true;
          this.player.playFromBeginning();
        }
      });
    };

    this.observer = new IntersectionObserver(intersectionCallback, {
      threshold: 0.75
    });
  }

  onReady() {
    this.observer.observe(this.targetElement);
  }

  onDisconnected() {
    this.observer.disconnect();
  }
}
