package com.cinematch.backend.dto;

public class SearchResponse {

    //atributos
    private Integer tmdbId;
    private String title;
    private String mediaType; // pelicula o serie
    private String posterPath;
    private Integer releaseYear;
    private Double rating;
    private String genres;


    //contructores
    public SearchResponse() {
    }

    public SearchResponse(
            Integer tmdbId,
            String title,
            String mediaType,
            String posterPath,
            Integer releaseYear,
            Double rating,
            String genres
    ) {
        this.tmdbId = tmdbId;
        this.title = title;
        this.mediaType = mediaType;
        this.posterPath = posterPath;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.genres = genres;
    }


    //getters y setters
    public Integer getTmdbId() {
        return tmdbId;
    }

    public void setTmdbId(Integer tmdbId) {
        this.tmdbId = tmdbId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

}
