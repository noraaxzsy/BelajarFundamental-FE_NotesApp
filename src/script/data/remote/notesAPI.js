const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static getNotes() {
    return fetch(`${BASE_URL}/notes`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`Something went wrong`);
        }
      })
      .then((json) => json.data)
      .catch((error) => {
        console.log("Error getNotes:", error.message);
        return [];
      });
  }

  static getArchivedNotes() {
    return fetch(`${BASE_URL}/notes/archived`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Gagal mengambil data catatan arsip");
      })
      .then((responseJson) => responseJson.data)
      .catch((error) => {
        console.error("Error getArchivedNotes:", error.message);
        return [];
      });
  }

  static createNote(title, body) {
    return fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject("Gagal Membuat Catatan Baru"),
      )
      .then((responseJson) => responseJson.data)
      .catch((error) => {
        console.error("Error createNote:", error);
        return null;
      });
  }

  static archiveNote(id) {
    return fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject("Gagal Melakukan Arsip Note"),
      )
      .then((responseJson) => responseJson.message)
      .catch((error) => {
        console.log("Error archiveNote:", error);
        return null;
      });
  }

  static unarchiveNote(id) {
    return fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: "POST",
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject("Gagal Melakukan Arsip Note"),
      )
      .then((responseJson) => responseJson.message)
      .catch((error) => {
        console.log("Error archiveNote:", error);
        return null;
      });
  }

  static deleteNote(id) {
    return fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject("Gagal menghapus note"),
      )
      .then((responseJson) => responseJson.message)
      .catch((error) => {
        console.log("Error deleteNote:", error);
        return null;
      });
  }

  static getNoteById(id) {
    return fetch(`${BASE_URL}/notes/${id}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Gagal ambil catatan"),
      )
      .then((json) => json.data)
      .catch((err) => {
        console.error("Error getNoteById:", err);
        return null;
      });
  }
}

export default NotesApi;
