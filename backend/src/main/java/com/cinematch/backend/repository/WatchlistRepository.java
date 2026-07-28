package com.cinematch.backend.repository;

import com.cinematch.backend.model.WatchlistItem;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface WatchlistRepository extends JpaRepository<WatchlistItem, Long> {


    //trae toda la lista
    List<WatchlistItem> findByUserId(Long userId);

    //busca por tipo, pelicula o serie
    List<WatchlistItem> findByUserIdAndMediaType(Long userId, String mediaType);

    //busca existencia
    boolean existsByUserIdAndTmdbIdAndMediaType(Long userId, Integer tmdbId, String mediaType);

}
