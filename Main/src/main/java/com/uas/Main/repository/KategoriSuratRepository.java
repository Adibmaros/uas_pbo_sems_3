package com.uas.Main.repository;

import com.uas.Main.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface KategoriSuratRepository extends JpaRepository<KategoriSurat, Long> {
    @Query("SELECT COUNT(k) FROM KategoriSurat k")
    long countTotalKategori();
}
