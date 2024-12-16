package com.uas.Main.service;

import com.uas.Main.model.ArsipSurat;
import com.uas.Main.model.KategoriSurat;
import com.uas.Main.model.Pengguna;
import com.uas.Main.repository.ArsipSuratRepository;
import com.uas.Main.repository.KategoriSuratRepository;
import com.uas.Main.repository.PenggunaRepository;
import com.uas.Main.dto.ArsipSuratDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArsipSuratService {

    private final ArsipSuratRepository arsipSuratRepository;
    private final KategoriSuratRepository kategoriSuratRepository;
    private final PenggunaRepository penggunaRepository;

    @Transactional
    public ArsipSurat simpanArsipSurat(ArsipSuratDTO arsipSuratDTO) {
        KategoriSurat kategori = kategoriSuratRepository.findById(arsipSuratDTO.getKategoriSurat())
                .orElseThrow(() -> new RuntimeException("Kategori tidak ditemukan"));
        Pengguna pengguna = penggunaRepository.findById(arsipSuratDTO.getIdPengguna())
                .orElseThrow(() -> new RuntimeException("Pengguna tidak ditemukan"));

        ArsipSurat arsipSurat = new ArsipSurat();
        arsipSurat.setNomorSurat(arsipSuratDTO.getNomorSurat());
        arsipSurat.setJudulSurat(arsipSuratDTO.getJudulSurat());
        arsipSurat.setDeskripsi(arsipSuratDTO.getDeskripsi());
        arsipSurat.setTanggalSurat(arsipSuratDTO.getTanggalSurat());
        arsipSurat.setFileElektronik(arsipSuratDTO.getFileElektronik());
        arsipSurat.setKategoriSurat(kategori);
        arsipSurat.setPengguna(pengguna);

        return arsipSuratRepository.save(arsipSurat);
    }

    @Transactional
    public ArsipSurat updateArsipSurat(Long id, ArsipSuratDTO arsipSuratDTO) {
        ArsipSurat existingArsipSurat = arsipSuratRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Arsip Surat tidak ditemukan"));

        // Update field
        existingArsipSurat.setNomorSurat(arsipSuratDTO.getNomorSurat());
        existingArsipSurat.setJudulSurat(arsipSuratDTO.getJudulSurat());
        existingArsipSurat.setDeskripsi(arsipSuratDTO.getDeskripsi());
        existingArsipSurat.setTanggalSurat(arsipSuratDTO.getTanggalSurat());
        existingArsipSurat.setFileElektronik(arsipSuratDTO.getFileElektronik());

        // Update kategori
        KategoriSurat kategori = kategoriSuratRepository.findById(arsipSuratDTO.getKategoriSurat())
                .orElseThrow(() -> new RuntimeException("Kategori tidak ditemukan"));
        existingArsipSurat.setKategoriSurat(kategori);

        // Update pengguna
        Pengguna pengguna = penggunaRepository.findById(arsipSuratDTO.getIdPengguna())
                .orElseThrow(() -> new RuntimeException("Pengguna tidak ditemukan"));
        existingArsipSurat.setPengguna(pengguna);

        return arsipSuratRepository.save(existingArsipSurat);
    }
}
