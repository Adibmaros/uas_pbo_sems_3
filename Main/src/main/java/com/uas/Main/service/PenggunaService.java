package com.uas.Main.service;

import com.uas.Main.dto.PenggunaUpdateDTO;
import com.uas.Main.model.Pengguna;
import com.uas.Main.model.LevelPengguna;
import com.uas.Main.repository.PenggunaRepository;
import com.uas.Main.repository.LevelPenggunaRepository;
import com.uas.Main.dto.LoginRequestDTO;
import com.uas.Main.dto.PenggunaDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;import java.util.List;  // Tambahkan impor untuk List
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PenggunaService {
    private final PenggunaRepository penggunaRepository;
    private final LevelPenggunaRepository levelPenggunaRepository;

    @Transactional
    public Pengguna register(Pengguna pengguna, String levelName) {
        LevelPengguna level = levelPenggunaRepository.findByNamaLevel(levelName)
                .orElseThrow(() -> new RuntimeException("Level not found"));

        pengguna.setLevelPengguna(level);
        return penggunaRepository.save(pengguna);
    }

    public Optional<Pengguna> login(LoginRequestDTO loginRequest) {
        return penggunaRepository.findByUsername(loginRequest.getUsername())
                .filter(p -> p.getPassword().equals(loginRequest.getPassword()));
    }

    public PenggunaDTO getPenggunaById(Long id) {
        Pengguna pengguna = penggunaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pengguna not found"));

        // Mengubah Pengguna menjadi PenggunaDTO
        return new PenggunaDTO(pengguna.getIdPengguna(), pengguna.getUsername(), pengguna.getNamaLengkap(), pengguna.getLevelPengguna().getNamaLevel());
    }

    public List<PenggunaDTO> getAllPengguna() {
        return penggunaRepository.findAll().stream()
                .map(pengguna -> new PenggunaDTO(pengguna.getIdPengguna(), pengguna.getUsername(), pengguna.getNamaLengkap(), pengguna.getLevelPengguna().getNamaLevel()))
                .collect(Collectors.toList());
    }

    public void deletePengguna(Long id) {
        // Mengecek apakah pengguna dengan ID tersebut ada di database
        Pengguna pengguna = penggunaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pengguna not found"));

        // Menghapus pengguna jika ditemukan
        penggunaRepository.delete(pengguna);
    }

    public PenggunaDTO updatePengguna(Long id, PenggunaUpdateDTO penggunaDTO) {
        // Menemukan pengguna berdasarkan ID
        Pengguna pengguna = penggunaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pengguna not found"));

        // Memperbarui informasi pengguna
        pengguna.setUsername(penggunaDTO.getUsername());
        pengguna.setNamaLengkap(penggunaDTO.getNamaLengkap());

        // Jika level pengguna juga diupdate, pastikan level pengguna diperbarui juga
        // Asumsikan levelPengguna adalah tipe data yang memiliki setNamaLevel() jika ada.
        // pengguna.setLevelPengguna(penggunaDTO.getLevelPengguna());

        // Menyimpan perubahan ke database
        penggunaRepository.save(pengguna);

        // Mengembalikan PenggunaDTO yang diperbarui
        return new PenggunaDTO(pengguna.getIdPengguna(), pengguna.getUsername(), pengguna.getNamaLengkap(), pengguna.getLevelPengguna().getNamaLevel());
    }
}
