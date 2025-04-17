export function renderNotes(activeContainer, archiveContainer, notes) {
  activeContainer.innerHTML = "";
  archiveContainer.innerHTML = "";

  notes.forEach((note) => {
    const noteElement = document.createElement("item-notes");
    noteElement.note = note;

    if (note.archived) {
      archiveContainer.appendChild(noteElement); // Pindahkan ke Arsip
    } else {
      activeContainer.appendChild(noteElement); // Tetap di Perlu Dikerjakan
    }
  });
}
