class InputNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addValidationListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                form {
                    background-color: #EAEAEA;
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin: 1em auto;
                    padding: 1em;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    text-align: center;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: rgb(25, 66, 126);
                    margin: 0.5em;
                    text-transform: uppercase;
                }
                input, textarea {
                    padding: 0.5rem;
                    font-size: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    width: 100%;
                }
                input:focus, textarea:focus {
                    border-color: #4568DC;
                    outline: none;
                }
                
                .error {
                    color: red;
                    font-size: 0.875rem;
                    display: none;
                }

                .btn-grad {
                    background-image: linear-gradient(to right, #4568DC 0%, #B06AB3  51%, #4568DC  100%);
                    padding: 15px;
                    text-align: center;
                    border: none;
                    text-transform: uppercase;
                    transition: 0.5s;
                    background-size: 200% auto;
                    color: white;            
                    box-shadow: 0 0 20px #eee;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: not-allowed;
                    opacity: 0.5;
                    width: 100%;
                }

                .btn-grad.enabled {
                    cursor: pointer;
                    opacity: 1;
                }

                .btn-grad:hover {
                    background-position: right center;
                    color: #fff;
                    text-decoration: none;
                }
            </style>
            <form id="note-form">
                <h2>Buat Catatan Baru</h2>
                <input type="text" id="title" placeholder="Judul Catatan" required>
                <span class="error" id="title-error">Judul minimal 3 karakter</span>
                <span class="error" id="duplicate-error">Judul sudah digunakan, gunakan yang lain!</span>
                <textarea id="body" placeholder="Isi Catatan" required></textarea>
                <span class="error" id="body-error">Isi catatan minimal 10 karakter</span>
                <button type="submit" class="btn-grad" disabled>Tambah Catatan</button>
            </form>
        `;

    this.shadowRoot.querySelector("#note-form").addEventListener("submit", (event) => {
      event.preventDefault();
      this.addNote();
    });
  }

  addValidationListeners() {
    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");
    const submitButton = this.shadowRoot.querySelector("button");

    titleInput.addEventListener("input", () => this.validateForm());
    bodyInput.addEventListener("input", () => this.validateForm());
  }

  validateForm() {
    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");
    const titleError = this.shadowRoot.querySelector("#title-error");
    const duplicateError = this.shadowRoot.querySelector("#duplicate-error");
    const bodyError = this.shadowRoot.querySelector("#body-error");
    const submitButton = this.shadowRoot.querySelector("button");

    let isValid = true;

    // Validasi panjang judul
    if (titleInput.value.trim().length < 3) {
      titleError.style.display = "block";
      isValid = false;
    } else {
      titleError.style.display = "none";
    }

    // Validasi panjang isi catatan
    if (bodyInput.value.trim().length < 10) {
      bodyError.style.display = "block";
      isValid = false;
    } else {
      bodyError.style.display = "none";
    }

    // Aktifkan tombol hanya jika semua validasi lolos
    if (isValid) {
      submitButton.classList.add("enabled");
      submitButton.disabled = false;
    } else {
      submitButton.classList.remove("enabled");
      submitButton.disabled = true;
    }
  }

  addNote() {
    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");

    const newTitle = titleInput.value.trim();
    const newBody = bodyInput.value.trim();

    // Buat event untuk menambahkan catatan
    this.dispatchEvent(
      new CustomEvent("add-note", {
        detail: { title: newTitle, body: newBody },
        bubbles: true,
        composed: true,
      })
    );

    // Reset form setelah submit
    titleInput.value = "";
    bodyInput.value = "";
  }
}

customElements.define("input-note", InputNote);
