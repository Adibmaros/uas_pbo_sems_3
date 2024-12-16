package com.uas.Main.controller;

import com.uas.Main.dto.PenggunaUpdateDTO;
import com.uas.Main.service.PenggunaService;
import com.uas.Main.dto.LoginRequestDTO;
import com.uas.Main.dto.PenggunaDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;  // Tambahkan ini untuk mengimpor List



@RestController
@RequestMapping("/api/pengguna")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PenggunaController {

    private final PenggunaService penggunaService;

    @PostMapping("/login")
    public ResponseEntity<PenggunaDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        // Mengonversi Pengguna menjadi PenggunaDTO setelah login berhasil
        return penggunaService.login(loginRequest)
                .map(pengguna -> new PenggunaDTO(pengguna.getIdPengguna(), pengguna.getUsername(), pengguna.getNamaLengkap(), pengguna.getLevelPengguna().getNamaLevel()))
                .map(ResponseEntity::ok) // Jika login sukses, kembalikan 200 OK
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PenggunaDTO> getPenggunaById(@PathVariable Long id) {
        try {
            // Mengambil pengguna berdasarkan ID dan mengonversinya ke PenggunaDTO
            PenggunaDTO penggunaDTO = penggunaService.getPenggunaById(id);
            return ResponseEntity.ok(penggunaDTO); // Kembalikan response dengan status 200 OK
        } catch (RuntimeException e) {
            // Jika pengguna tidak ditemukan, kembalikan 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<PenggunaDTO>> getAllPengguna() {
        List<PenggunaDTO> penggunaList = penggunaService.getAllPengguna();
        return ResponseEntity.ok(penggunaList); // Kembalikan list pengguna dengan status OK
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePengguna(@PathVariable Long id) {
        try {
            // Menghapus pengguna berdasarkan ID
            penggunaService.deletePengguna(id);
            return ResponseEntity.noContent().build(); // Mengembalikan response 204 No Content jika berhasil
        } catch (RuntimeException e) {
            // Jika pengguna tidak ditemukan, kembalikan 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PenggunaDTO> updatePengguna(@PathVariable Long id, @RequestBody PenggunaUpdateDTO penggunaUpdateDTO) {
        try {
            PenggunaDTO updatedPengguna = penggunaService.updatePengguna(id, penggunaUpdateDTO);
            return ResponseEntity.ok(updatedPengguna);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
