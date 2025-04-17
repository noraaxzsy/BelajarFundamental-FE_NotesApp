import NotesApi from "../data/remote/notesAPI.js";

class NoteModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector("#modal-close").addEventListener("click", () => {
      this.hide();
    });
  }
  get noteId() {
    return this._noteId;
  }
  set noteId(id) {
    this._noteId = id;
    this.fetchAndRenderNote();
  }

  show() {
    this.classList.add("visible");
  }

  hide() {
    this.classList.remove("visible");
  }

  async fetchAndRenderNote() {
    if (!this._noteId) return;

    const note = await NotesApi.getNoteById(this._noteId);
    if (!note) return;

    this.shadowRoot.querySelector("#modal-title").innerText = note.title;
    this.shadowRoot.querySelector("#modal-body").innerText = note.body;
    this.shadowRoot.querySelector("#modal-date").innerText = `Dibuat: ${new Date(note.createdAt).toLocaleString()}`;
    this.shadowRoot.querySelector("#modal-status").innerText = note.archived ? "📦 Diarsipkan" : "📝 Perlu Dikerjakan";

    this.show();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
            position: fixed;
            z-index: 999;
            left: 0; top: 0;
            width: 100%; height: 100%;
            justify-content: center;
            align-items: center;
            background-color: rgba(0,0,0,0.5);
            display: none; /* default hidden */
        }
        :host(.visible) {
        display: flex !important;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .close {
          float: right;
          cursor: pointer;
          font-size: 24px;
        }
      </style>

      <div class="modal-content">
        <span id="modal-close" class="close">&times;</span>
        <h2 id="modal-title"></h2>
        <p id="modal-body"></p>
        <small id="modal-date"></small><br/>
        <strong id="modal-status"></strong>
      </div>
    `;
  }
}

customElements.define("note-modal", NoteModal);
