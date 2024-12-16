package com.uas.Main.dto;

import lombok.Data;
import java.util.Date;
import java.util.Map;

@Data
public class PenggunaDTO {
    private Long idPengguna;
    private String username;
    private String namaLengkap;
    private String levelPengguna;

    // Constructor dengan parameter
    public PenggunaDTO(Long idPengguna, String username, String namaLengkap, String levelPengguna) {
        this.idPengguna = idPengguna;
        this.username = username;
        this.namaLengkap = namaLengkap;
        this.levelPengguna = levelPengguna;
    }
}