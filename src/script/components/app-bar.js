class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["title", "gradient"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "📝 Aplikasi Pencatatan";
    const gradient =
      this.getAttribute("gradient") ||
      "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)";

    this.shadowRoot.innerHTML = `
        <style>
          header {
            background: ${gradient};
            color: white;
            padding: 1.3rem;
            text-align: center;
            font-size: 2rem;
            font-weight: 300;
            
          }
        </style>
        <header>${title}</header>
      `;
  }
}

customElements.define("app-bar", AppBar);
