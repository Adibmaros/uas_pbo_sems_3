package com.uas.Main.controller;

import com.uas.Main.model.*;
import com.uas.Main.service.*;
import com.uas.Main.dto.*;
import com.uas.Main.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final PenggunaService penggunaService;
    private final PenggunaRepository penggunaRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        return penggunaService.login(loginRequest)
                .map(pengguna -> ResponseEntity.ok(new PenggunaDTO(
                        pengguna.getIdPengguna(),
                        pengguna.getUsername(),
                        pengguna.getNamaLengkap(),
                        pengguna.getLevelPengguna().getNamaLevel()
                )))
                .orElse(ResponseEntity.ok(new PenggunaDTO(null, null, "Login gagal", null))); // Kembalikan DTO meskipun login gagal
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Pengguna pengguna,
            @RequestParam String level
    ) {
        Pengguna registeredPengguna = penggunaService.register(pengguna, level);
        return ResponseEntity.ok(registeredPengguna);
    }
}
