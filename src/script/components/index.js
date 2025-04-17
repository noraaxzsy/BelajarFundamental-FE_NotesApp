import Swal from "sweetalert2";
import "../../styles/style.css";
import "../view/view.js";
import "./app-bar.js";
import "./footer-bar.js";
import "./input-note.js";
import "./item-notes.js";
import "./note-popup.js";
import "./loading.js";
import { renderNotes } from "../view/view.js";
import NotesApi from "../data/remote/notesAPI.js";

document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.querySelector("#notes-list");
  const archiveList = document.querySelector(".Arsip #notes-list"); // Ambil elemen arsip

  const refreshNotes = () => {
    const loading = document.querySelector("#loading-indicator");
    loading.show();

    Promise.all([NotesApi.getNotes(), NotesApi.getArchivedNotes()])
      .then(([activeNotes, archivedNotes]) => {
        const allNotes = [...activeNotes, ...archivedNotes];
        renderNotes(notesList, archiveList, allNotes);
      })
      .catch((error) => {
        console.error("Gagal memuat catatan:", error.message);
        Swal.fire({
          title: "Error!",
          text: "Terjadi kesalahan saat memuat catatan. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      })
      .finally(() => {
        loading.hide();
      });
  };

  document.addEventListener("add-note", (event) => {
    const { title, body } = event.detail;
    const loading = document.querySelector("#loading-indicator");
    loading.show();

    const createPromise = NotesApi.createNote(title, body);
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 300));

    Promise.all([createPromise, delayPromise])
      .then(([newNote]) => {
        if (newNote) refreshNotes();
      })
      .catch((error) => {
        console.error("Gagal memuat catatan:", error.message);
        Swal.fire({
          title: "Error!",
          text: "Terjadi kesalahan saat memuat catatan. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      })
      .finally(() => {
        loading.hide();
      });
  });

  document.addEventListener("toggle-archive", (event) => {
    const id = event.detail;
    const loading = document.querySelector("#loading-indicator");
    loading.show();

    // Fetch catatan untuk mengecek apakah sudah diarsipkan atau belum
    const fetchNotePromise = fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`)
      .then((res) => res.json())
      .then((note) => {
        const isArchived = note.data.archived;
        const action = isArchived ? NotesApi.unarchiveNote : NotesApi.archiveNote;

        return action(id);
      });

    // Menambahkan delay 2 detik
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 300));

    // Menunggu kedua proses selesai
    Promise.all([fetchNotePromise, delayPromise])
      .then(() => {
        refreshNotes();
      })
      .catch((error) => {
        console.error("Gagal mengarsip catatan:", error.message);
        Swal.fire({
          title: "Error!",
          text: "Terjadi kesalahan memproses catatan. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      })
      .finally(() => {
        loading.hide();
      });
  });

  document.addEventListener("delete-note", (event) => {
    const id = event.detail;
    const loading = document.querySelector("#loading-indicator");
    loading.show();

    // Menunggu proses delete selesai
    const deleteNotePromise = NotesApi.deleteNote(id);

    // Menambahkan delay 2 detik
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 300));

    // Menunggu kedua proses selesai
    Promise.all([deleteNotePromise, delayPromise])
      .then(() => {
        refreshNotes();
      })
      .catch((error) => {
        console.error("Gagal mengarsip catatan:", error.message);
        Swal.fire({
          title: "Error!",
          text: "Terjadi kesalahan memproses catatan. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      })
      .finally(() => {
        loading.hide();
      });
  });

  // Render pertama kali
  refreshNotes();

  document.body.addEventListener("click", (e) => {
    const path = e.composedPath();

    // Cari item-notes dari jalur event
    const noteElement = path.find((el) => el.tagName === "ITEM-NOTES");
    if (!noteElement) {
      return;
    }

    // Ambil tombol dari shadow DOM
    const archiveBtn = noteElement.shadowRoot.querySelector("#archive");
    const deleteBtn = noteElement.shadowRoot.querySelector("#delete-btn");

    // Cek apakah klik berasal dari tombol
    const clickedInsideButton = path.includes(archiveBtn) || path.includes(deleteBtn);
    if (clickedInsideButton) {
      return;
    }

    const noteId = noteElement.shadowRoot.querySelector(".note")?.dataset?.id;
    if (!noteId) {
      return;
    }
    const modal = document.querySelector("note-modal");
    modal.noteId = noteId;
    modal.classList.add("visible");
  });
});
