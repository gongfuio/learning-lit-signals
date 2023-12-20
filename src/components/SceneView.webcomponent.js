/* eslint-env browser */
import { LitElement, html, css } from 'lit-element';
import { SignalWatcher } from '@lit-labs/preact-signals';

export class SceneView extends SignalWatcher(LitElement) {
  #signals;

  static get styles() {
    return css`
      :host {
        height: 100%;
        display: block;
      }
      h1 {
        margin-block-start: 1rem;
      }
      p.coord code {
        font-weight: bold;
      }
      div#scene {
        padding: 0.5rem 1rem;
        height: 20rem;
      }
    `;
  }

  static properties = {
    angles: { type: Array },
    coord: { type: Array },
  };

  constructor() {
    super();

    // Public observed properties
    this.angles = [0, 0, 0];
    this.coord = [0, 0, 0];
  }

  set signals(signals) {
    const {angles, coord} = signals;
    this.#signals = { angles, coord };
  }

  render() {
    return html`
      <div id="scene">
        <slot></slot>
        <h1>Scene</h1>
        <p class="coord">Camera HPR: <code>${JSON.stringify(this.#signals.angles.value)}</code></p>
        <p class="coord">Camera position: <code>${JSON.stringify(this.#signals.coord.value)}</code></p>
      </div>
    `;
  }
}
