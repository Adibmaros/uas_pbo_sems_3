package com.uas.Main.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "level_pengguna")
public class LevelPengguna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_level")
    private Long idLevel;

    @Column(name = "nama_level", nullable = false)
    private String namaLevel;

    @Column(name = "deskripsi_akses")
    private String deskripsiAkses;
}
