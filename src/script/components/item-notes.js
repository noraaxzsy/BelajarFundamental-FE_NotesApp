import gsap from "gsap";

class ItemNotes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set note(note) {
    this._note = note;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                .note {
                    border: 1px solid #ddd;
                    padding: 1rem;
                    border-radius: 8px;
                    background-color: ${this._note.archived ? "#F9F9F9" : "#FFEDFA"};
                    margin: 0.5rem;
                    opacity: 0;
                }

                .note h3 {
                    margin: 0;
                }
                .note button {
                    margin-top: 0.5rem;
                    border-radius: 5px;
                    color: white;
                    border: none;
                    padding: 0.5rem;
                    cursor: pointer;
                }
                #archive{
                    background-color: #211C84;
                }
                #delete-btn{
                    background-color:rgb(189, 36, 16);
                }
                #archive:hover{
                    background-color:rgb(21, 18, 86);
                }
                #delete-btn:hover{
                    background-color:rgb(129, 21, 7);
                }
                
            </style>
            <div class="note" data-id="${this._note.id}">
                <h3>${this._note.title}</h3>
                <p>${this._note.body}</p>
                <button id="archive">${this._note.archived ? "Non-arsipkan" : "Arsipkan"}</button>
                <button id="delete-btn">Hapus</button>
            </div>
        `;

    // Animation for smooth fade-in effect on note rendering
    gsap.to(this.shadowRoot.querySelector(".note"), {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    });

    // Animasi hover dengan GSAP
    const noteElement = this.shadowRoot.querySelector(".note");
    const gradient = this.getAttribute("gradient") || "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)";
    noteElement.addEventListener("mouseenter", () => {
      gsap.to(noteElement, {
        scale: 1.025,
        boxShadow: `
        0 0 6px rgba(255, 60, 172, 0.3),   
        0 0 12px rgba(120, 75, 160, 0.3),  
        0 0 18px rgba(43, 134, 197, 0.3)   
        `,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    noteElement.addEventListener("mouseleave", () => {
      gsap.to(noteElement, {
        scale: 1,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    });
    // Event listener untuk menghapus catatan
    this.shadowRoot.querySelector("#delete-btn").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("delete-note", {
          detail: this._note.id,
          bubbles: true,
          composed: true,
        })
      );
    });

    // Event listener untuk mengarsipkan catatan
    this.shadowRoot.querySelector("#archive").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("toggle-archive", {
          detail: this._note.id,
          bubbles: true,
          composed: true,
        })
      );
    });

    // Animation on archiving/unarchiving
    this.shadowRoot.querySelector("#archive").addEventListener("click", () => {
      gsap.to(this.shadowRoot.querySelector(".note"), {
        scale: 1.05,
        duration: 0.3,
        ease: "bounce.out",
        yoyo: true,
        repeat: 1,
      });
    });
    // Animation for delete button click
    this.shadowRoot.querySelector("#delete-btn").addEventListener("click", () => {
      gsap.to(this.shadowRoot.querySelector(".note"), {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // After the animation, remove the element
          this.remove();
        },
      });
    });
  }
}

customElements.define("item-notes", ItemNotes);
