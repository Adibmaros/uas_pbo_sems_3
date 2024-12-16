package com.uas.Main.service;

import com.uas.Main.model.*;
import com.uas.Main.repository.*;
import com.uas.Main.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KategoriSuratService {
    private final KategoriSuratRepository kategoriSuratRepository;

    @Transactional
    public KategoriSurat createKategoriSurat(KategoriSurat kategoriSurat) {
        return kategoriSuratRepository.save(kategoriSurat);
    }

    @Transactional(readOnly = true)
    public List<KategoriSurat> getAllKategoriSurat() {
        return kategoriSuratRepository.findAll();
    }

    @Transactional
    public KategoriSurat updateKategoriSurat(Long id, KategoriSurat kategoriSuratDetails) {
        KategoriSurat kategoriSurat = kategoriSuratRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kategori Surat not found"));
        kategoriSurat.setNamaKategori(kategoriSuratDetails.getNamaKategori());
        kategoriSurat.setDeskripsi(kategoriSuratDetails.getDeskripsi());
        return kategoriSuratRepository.save(kategoriSurat);
    }

    @Transactional
    public void deleteKategoriSurat(Long id) {
        KategoriSurat kategoriSurat = kategoriSuratRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kategori Surat not found"));
        kategoriSuratRepository.delete(kategoriSurat);
    }
}