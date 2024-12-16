package com.uas.Main.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "arsip_surat")
public class ArsipSurat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_arsip")
    private Long idArsip;

    @Column(name = "nomor_surat", nullable = false)
    private String nomorSurat;

    @Column(name = "judul_surat", nullable = false)
    private String judulSurat;

    @ManyToOne
    @JoinColumn(name = "id_kategori", nullable = false)
    private KategoriSurat kategoriSurat;

    @Column(name = "file_elektronik")
    private String fileElektronik;

    @Column(name = "tanggal_surat")
    @Temporal(TemporalType.DATE)
    private Date tanggalSurat;

    private String deskripsi;

    @ManyToOne
    @JoinColumn(name = "id_pengguna", nullable = false)
    private Pengguna pengguna;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
