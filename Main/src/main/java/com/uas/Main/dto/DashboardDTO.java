package com.uas.Main.dto;

import lombok.Data;
import java.util.Date;
import java.util.Map;

@Data
public class DashboardDTO {
    private long totalArsipSurat;
    private long totalKategori;
    private long totalPengguna;
    private Map<String, Long> arsipPerKategori;
}
