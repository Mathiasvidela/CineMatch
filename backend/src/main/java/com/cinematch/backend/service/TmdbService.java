package com.cinematch.backend.service;

import com.cinematch.backend.dto.SearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

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

    public List<SearchResponse> searchMulti(String query) {

        String encodedQuery = UriUtils.encode(query, StandardCharsets.UTF_8);

        String url = tmdbApiUrl
                + "/search/multi"
                + "?api_key=" + apiKey
                + "&language=es-ES"
                + "&query=" + encodedQuery
                + "&include_adult=false";

        JsonNode response = restClient
                .get()
                .uri(url)
                .retrieve()
                .body(JsonNode.class);

        List<SearchResponse> results = new ArrayList<>();

        if (response == null || !response.has("results")) {
            return results;
        }

        for (JsonNode item : response.get("results")) {

            String mediaType = item.path("media_type").asText();

            if (!mediaType.equals("movie") && !mediaType.equals("tv")) {
                continue;
            }

            Integer tmdbId = item.path("id").asInt();

            String title = mediaType.equals("movie")
                    ? item.path("title").asText()
                    : item.path("name").asText();

            String posterPath = item.path("poster_path").isNull()
                    ? null
                    : item.path("poster_path").asText();

            String date = mediaType.equals("movie")
                    ? item.path("release_date").asText()
                    : item.path("first_air_date").asText();

            Integer releaseYear = extractYear(date);

            Double rating = item.path("vote_average").asDouble();

            String genres = item.has("genre_ids")
                    ? item.path("genre_ids").toString()
                    : "";

            SearchResponse searchResponse = new SearchResponse(
                    tmdbId,
                    title,
                    mediaType,
                    posterPath,
                    releaseYear,
                    rating,
                    genres
            );

            results.add(searchResponse);
        }

        return results;
    }

    private Integer extractYear(String date) {
        if (date == null || date.length() < 4) {
            return null;
        }

        try {
            return Integer.parseInt(date.substring(0, 4));
        } catch (NumberFormatException e) {
            return null;
        }
    }

}
