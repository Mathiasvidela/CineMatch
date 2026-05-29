package com.cinematch.backend.controller;

import com.cinematch.backend.service.TmdbService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
public class MovieController {
    private final TmdbService tmdbService;

    public MovieController(TmdbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    @GetMapping
    public String getMovies(
            @RequestParam(required = false) String genres,
            @RequestParam(required = false) String yearFrom,
            @RequestParam(required = false) String yearTo,
            @RequestParam(required = false) String duration,
            @RequestParam(required = false, defaultValue = "popular") String sortBy
    ) {
        return tmdbService.getMovies(genres, yearFrom, yearTo, duration, sortBy);
    }


}
