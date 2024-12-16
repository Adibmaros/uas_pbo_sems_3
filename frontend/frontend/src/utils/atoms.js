import { atomWithStorage } from "jotai/utils";

// Atom with localStorage persistence
export const loginAtom = atomWithStorage("loginData", {
  idPengguna: "",
  username: "",
  namaLengkap: "",
  role: "",
});
