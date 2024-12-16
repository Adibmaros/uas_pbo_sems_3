package com.uas.Main.dto;

import lombok.Data;

@Data
public class PenggunaUpdateDTO {
    private String username;
    private String namaLengkap;
    private String levelPengguna;

    // Constructor default, jika diperlukan
    public PenggunaUpdateDTO() {}

    public PenggunaUpdateDTO(String username, String namaLengkap, String levelPengguna) {
        this.username = username;
        this.namaLengkap = namaLengkap;
        this.levelPengguna = levelPengguna;
    }
}

