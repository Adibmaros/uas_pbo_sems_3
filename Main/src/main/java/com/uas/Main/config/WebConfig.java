package com.uas.Main.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Tentukan path yang perlu diberi akses CORS
                .allowedOrigins("http://localhost:5173")  // URL dari frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Metode HTTP yang diizinkan
                .allowedHeaders("*")  // Semua header diizinkan
                .allowCredentials(true);  // Menambahkan dukungan untuk kredensial seperti cookies
    }
}
