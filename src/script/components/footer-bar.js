class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["footer", "color"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
  connectedCallback() {
    this.render();
  }

  render() {
    const footer =
      this.getAttribute("footer") || "© 2024 Copyright • Made by Rimoon";
    const gradient =
      this.getAttribute("gradient") ||
      "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)";
    this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background: ${gradient};
                    color: white;
                    text-align: center;
                    padding: 1rem;
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    font-size: 0.9rem;
                }
            </style>
            <footer>${footer}</footer>
        `;
  }
}

customElements.define("footer-bar", FooterBar);
