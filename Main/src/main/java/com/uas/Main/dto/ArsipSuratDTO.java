package com.uas.Main.dto;

import lombok.Data;
import java.util.Date;

@Data
public class ArsipSuratDTO {
    private Long idArsip;
    private String nomorSurat;
    private String judulSurat;
    private Long kategoriSurat;  // ID kategori
    private Date tanggalSurat;
    private String deskripsi;
    private String fileElektronik;
    private Long idPengguna;  // Menambahkan idPengguna sebagai Long
}
