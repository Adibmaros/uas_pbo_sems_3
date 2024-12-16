package com.uas.Main.controller;

import com.uas.Main.model.ArsipSurat;
import com.uas.Main.service.ArsipSuratService;
import com.uas.Main.repository.ArsipSuratRepository;
import com.uas.Main.dto.ArsipSuratDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/arsip-surat")
@RequiredArgsConstructor
public class ArsipSuratController {
    private final ArsipSuratService arsipSuratService;
    private final ArsipSuratRepository arsipSuratRepository;

    // Tambah Arsip Surat
    @PostMapping
    public ResponseEntity<?> tambahArsipSurat(@RequestBody ArsipSuratDTO arsipSuratDTO) {
        try {
            ArsipSurat savedArsipSurat = arsipSuratService.simpanArsipSurat(arsipSuratDTO);
            return ResponseEntity.ok(savedArsipSurat);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get Arsip Surat by ID
    @GetMapping("/{id}")
    public ResponseEntity<ArsipSurat> getArsipSuratById(@PathVariable Long id) {
        ArsipSurat arsipSurat = arsipSuratRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Arsip Surat tidak ditemukan dengan ID: " + id));
        return ResponseEntity.ok(arsipSurat);
    }


    // Daftar Arsip Surat
    @GetMapping
    public ResponseEntity<List<ArsipSurat>> daftarArsipSurat() {
        return ResponseEntity.ok(arsipSuratRepository.findAll());
    }

    // Update Arsip Surat
    @PutMapping("/{id}")
    public ResponseEntity<?> updateArsipSurat(@PathVariable Long id, @RequestBody ArsipSuratDTO arsipSuratDTO) {
        try {
            ArsipSurat updatedArsip = arsipSuratService.updateArsipSurat(id, arsipSuratDTO);
            return ResponseEntity.ok(updatedArsip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Hapus Arsip Surat
    @DeleteMapping("/{id}")
    public ResponseEntity<?> hapusArsipSurat(@PathVariable Long id) {
        try {
            arsipSuratRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
