package com.uas.Main.controller;

import com.uas.Main.model.KategoriSurat;
import com.uas.Main.repository.KategoriSuratRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kategori-surat")
@RequiredArgsConstructor
public class KategoriSuratController {
    private final KategoriSuratRepository kategoriSuratRepository;

    @PostMapping
    public ResponseEntity<KategoriSurat> tambahKategori(@RequestBody KategoriSurat kategoriSurat) {
        return ResponseEntity.ok(kategoriSuratRepository.save(kategoriSurat));
    }

    @GetMapping
    public ResponseEntity<List<KategoriSurat>> daftarKategori() {
        return ResponseEntity.ok(kategoriSuratRepository.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateKategori(
            @PathVariable Long id,
            @RequestBody KategoriSurat kategoriSurat
    ) {
        KategoriSurat existingKategori = kategoriSuratRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kategori tidak ditemukan"));

        existingKategori.setNamaKategori(kategoriSurat.getNamaKategori());
        existingKategori.setDeskripsi(kategoriSurat.getDeskripsi());

        return ResponseEntity.ok(kategoriSuratRepository.save(existingKategori));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> hapusKategori(@PathVariable Long id) {
        try {
            kategoriSuratRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

