package com.uas.Main.repository;

import com.uas.Main.model.ArsipSurat;
import com.uas.Main.model.KategoriSurat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArsipSuratRepository extends JpaRepository<ArsipSurat, Long> {
    List<ArsipSurat> findByKategoriSurat(KategoriSurat kategori);

    @Query("SELECT COUNT(a) FROM ArsipSurat a")
    long countTotalArsipSurat();

    @Query("SELECT k.namaKategori, COUNT(a) FROM ArsipSurat a JOIN a.kategoriSurat k GROUP BY k.namaKategori")
    List<Object[]> countArsipPerKategori();
}
