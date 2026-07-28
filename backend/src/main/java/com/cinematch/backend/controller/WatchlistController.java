package com.cinematch.backend.controller;
import com.cinematch.backend.dto.WatchlistRequest;
import com.cinematch.backend.dto.WatchlistResponse;
import com.cinematch.backend.service.WatchlistService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @PostMapping
    public WatchlistResponse saveItem(@RequestBody WatchlistRequest request) {
        return watchlistService.saveItem(request);
    }

    @GetMapping("/user/{userId}")
    public List<WatchlistResponse> getUserWatchlist(@PathVariable Long userId) {
        return watchlistService.getUserWatchlist(userId);
    }

    @GetMapping("/user/{userId}/type/{mediaType}")
    public List<WatchlistResponse> getUserWatchlistByType(
            @PathVariable Long userId,
            @PathVariable String mediaType
    ) {
        return watchlistService.getUserWatchlistByType(userId, mediaType);
    }

    @DeleteMapping("/{itemId}")
    public void deleteItem(@PathVariable Long itemId) {
        watchlistService.deleteItem(itemId);
    }

}

