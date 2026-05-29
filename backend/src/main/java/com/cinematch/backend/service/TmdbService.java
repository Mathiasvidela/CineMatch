package com.cinematch.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class TmdbService {


    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.api.url}")
    private String tmdbApiUrl;

    private final RestClient restClient = RestClient.create();

    public String getMovies(
            String genres,
            String yearFrom,
            String yearTo,
            String duration,
            String sortBy
    ) {
        String tmdbSortBy = getTmdbSortBy(sortBy);

        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString(tmdbApiUrl + "/discover/movie")
                .queryParam("api_key", apiKey)
                .queryParam("language", "es-ES")
                .queryParam("sort_by", tmdbSortBy)
                .queryParam("include_adult", "false")
                .queryParam("page", "1");

        if (genres != null && !genres.isBlank()) {
            builder.queryParam("with_genres", genres);
        }

        if (yearFrom != null && !yearFrom.isBlank()) {
            builder.queryParam("primary_release_date.gte", yearFrom + "-01-01");
        }

        if (yearTo != null && !yearTo.isBlank()) {
            builder.queryParam("primary_release_date.lte", yearTo + "-12-31");
        }

        if ("short".equals(duration)) {
            builder.queryParam("with_runtime.lte", "90");
        }

        if ("normal".equals(duration)) {
            builder.queryParam("with_runtime.gte", "90");
            builder.queryParam("with_runtime.lte", "140");
        }

        if ("long".equals(duration)) {
            builder.queryParam("with_runtime.gte", "140");
        }

        if ("top_rated".equals(sortBy)) {
            builder.queryParam("vote_count.gte", "200");
        }

        if ("hidden_gems".equals(sortBy)) {
            builder.queryParam("vote_count.gte", "80");
            builder.queryParam("vote_count.lte", "800");
        }

        return restClient
                .get()
                .uri(builder.toUriString())
                .retrieve()
                .body(String.class);
    }

    private String getTmdbSortBy(String sortBy) {
        if ("top_rated".equals(sortBy)) {
            return "vote_average.desc";
        }

        if ("recent".equals(sortBy)) {
            return "primary_release_date.desc";
        }

        if ("hidden_gems".equals(sortBy)) {
            return "vote_average.desc";
        }

        return "popularity.desc";
    }
}
