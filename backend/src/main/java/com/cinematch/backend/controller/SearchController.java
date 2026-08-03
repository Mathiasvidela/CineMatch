package com.cinematch.backend.controller;

import com.cinematch.backend.dto.SearchResponse;
import com.cinematch.backend.service.TmdbService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final TmdbService tmdbService;

    public SearchController(TmdbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    @GetMapping
    public List<SearchResponse> search(@RequestParam String query) {
        return tmdbService.searchMulti(query);
    }

}
