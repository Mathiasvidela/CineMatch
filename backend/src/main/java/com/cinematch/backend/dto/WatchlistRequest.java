package com.cinematch.backend.dto;

public class WatchlistRequest {

    //atriburtos
    private Long userId;
    private Integer tmdbId;
    private String title;
    private String mediaType;
    private String posterPath;
    private Integer releaseYear;
    private Double rating;
    private String genres;

    //constructores
    public WatchlistRequest() {
    }

    public WatchlistRequest(
            Long userId,
            Integer tmdbId,
            String title,
            String mediaType,
            String posterPath,
            Integer releaseYear,
            Double rating,
            String genres
    ) {
        this.userId = userId;
        this.tmdbId = tmdbId;
        this.title = title;
        this.mediaType = mediaType;
        this.posterPath = posterPath;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.genres = genres;
    }

    //getters y setters
    public Long getUserId() {
        return userId;
    }

    public Integer getTmdbId() {
        return tmdbId;
    }

    public String getTitle() {
        return title;
    }

    public String getMediaType() {
        return mediaType;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public Double getRating() {
        return rating;
    }

    public String getGenres() {
        return genres;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setTmdbId(Integer tmdbId) {
        this.tmdbId = tmdbId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

}
