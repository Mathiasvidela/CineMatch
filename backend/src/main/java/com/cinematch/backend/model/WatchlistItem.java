package com.cinematch.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "watchlist_items")
public class WatchlistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relacion con el usuario
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer tmdbId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String mediaType; // serie o pelicula

    private String posterPath;

    private Integer releaseYear;

    private Double rating;

    private String genres;

    private LocalDateTime createdAt;

    //constructores

    public WatchlistItem() {
    }

    public WatchlistItem(
            User user,
            Integer tmdbId,
            String title,
            String mediaType,
            String posterPath,
            Integer releaseYear,
            Double rating,
            String genres
    ) {
        this.user = user;
        this.tmdbId = tmdbId;
        this.title = title;
        this.mediaType = mediaType;
        this.posterPath = posterPath;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.genres = genres;
        this.createdAt = LocalDateTime.now();
    }



    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setUser(User user) {
        this.user = user;
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
