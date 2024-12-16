package com.uas.Main.controller;

import com.uas.Main.dto.DashboardDTO;
import com.uas.Main.repository.ArsipSuratRepository;
import com.uas.Main.repository.KategoriSuratRepository;
import com.uas.Main.repository.PenggunaRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final ArsipSuratRepository arsipSuratRepository;
    private final KategoriSuratRepository kategoriSuratRepository;
    private final PenggunaRepository penggunaRepository;

    @GetMapping
    public ResponseEntity<DashboardDTO> getDashboardData() {
        DashboardDTO dashboard = new DashboardDTO();
        dashboard.setTotalArsipSurat(arsipSuratRepository.countTotalArsipSurat());
        dashboard.setTotalKategori(kategoriSuratRepository.countTotalKategori());
        dashboard.setTotalPengguna(penggunaRepository.countTotalPengguna());

        // Perbaikan bagian Collectors.toMap
        dashboard.setArsipPerKategori(
                arsipSuratRepository.countArsipPerKategori().stream()
                        .filter(arr -> arr != null && arr.length == 2) // Validasi null dan panjang array
                        .collect(Collectors.toMap(
                                arr -> (String) arr[0], // Pastikan elemen pertama adalah String
                                arr -> (Long) arr[1],   // Pastikan elemen kedua adalah Long
                                (existing, replacement) -> existing // Mengatasi duplikasi
                        ))
        );

        return ResponseEntity.ok(dashboard);
    }
}
