class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.3);
            z-index: 9999;
            justify-content: center;
            align-items: center;
          }
  
          :host(.show) {
            display: flex;
          }
  
          .spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
  
        <div class="spinner"></div>
      `;
  }

  show() {
    this.classList.add("show");
  }

  hide() {
    this.classList.remove("show");
  }
}

customElements.define("loading-indicator", LoadingIndicator);
