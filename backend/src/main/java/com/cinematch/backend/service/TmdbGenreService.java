package com.cinematch.backend.service;

import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class TmdbGenreService {

    private static final Map<Integer, String> MOVIE_GENRES = Map.ofEntries(
            Map.entry(28, "Acción"),
            Map.entry(12, "Aventura"),
            Map.entry(16, "Animación"),
            Map.entry(35, "Comedia"),
            Map.entry(80, "Crimen"),
            Map.entry(99, "Documental"),
            Map.entry(18, "Drama"),
            Map.entry(10751, "Familia"),
            Map.entry(14, "Fantasía"),
            Map.entry(36, "Historia"),
            Map.entry(27, "Terror"),
            Map.entry(10402, "Música"),
            Map.entry(9648, "Misterio"),
            Map.entry(10749, "Romance"),
            Map.entry(878, "Ciencia ficción"),
            Map.entry(10770, "Película de TV"),
            Map.entry(53, "Suspenso"),
            Map.entry(10752, "Bélica"),
            Map.entry(37, "Western")
    );

    private static final Map<Integer, String> TV_GENRES = Map.ofEntries(
            Map.entry(10759, "Acción y aventura"),
            Map.entry(16, "Animación"),
            Map.entry(35, "Comedia"),
            Map.entry(80, "Crimen"),
            Map.entry(99, "Documental"),
            Map.entry(18, "Drama"),
            Map.entry(10751, "Familia"),
            Map.entry(10762, "Kids"),
            Map.entry(9648, "Misterio"),
            Map.entry(10763, "Noticias"),
            Map.entry(10764, "Reality"),
            Map.entry(10765, "Sci-Fi y fantasía"),
            Map.entry(10766, "Soap"),
            Map.entry(10767, "Talk"),
            Map.entry(10768, "Guerra y política"),
            Map.entry(37, "Western")
    );

    public String mapGenres(JsonNode genreIdsNode, String mediaType) {
        if (genreIdsNode == null || !genreIdsNode.isArray() || genreIdsNode.isEmpty()) {
            return "";
        }

        Map<Integer, String> genreMap = mediaType.equals("movie")
                ? MOVIE_GENRES
                : TV_GENRES;

        List<String> genreNames = new ArrayList<>();

        for (JsonNode genreIdNode : genreIdsNode) {
            int genreId = genreIdNode.asInt();

            String genreName = genreMap.get(genreId);

            if (genreName != null) {
                genreNames.add(genreName);
            }
        }

        return String.join(", ", genreNames);
    }


}
