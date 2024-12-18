package com.uas.Main.repository;

import com.uas.Main.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PenggunaRepository extends JpaRepository<Pengguna, Long> {
    Optional<Pengguna> findByUsername(String username);

    @Query("SELECT COUNT(p) FROM Pengguna p")
    long countTotalPengguna();
}
