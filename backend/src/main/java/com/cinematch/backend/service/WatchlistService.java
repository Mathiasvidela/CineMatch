package com.cinematch.backend.service;

import com.cinematch.backend.dto.WatchlistResponse;
import org.springframework.stereotype.Service;
import com.cinematch.backend.dto.WatchlistRequest;
import com.cinematch.backend.model.User;
import com.cinematch.backend.model.WatchlistItem;
import com.cinematch.backend.repository.UserRepository;
import com.cinematch.backend.repository.WatchlistRepository;

import java.util.List;

@Service
public class WatchlistService {


    private final WatchlistRepository watchlistRepository;
    private final UserRepository userRepository;

    public WatchlistService(
            WatchlistRepository watchlistRepository,
            UserRepository userRepository
    ) {
        this.watchlistRepository = watchlistRepository;
        this.userRepository = userRepository;
    }

    public WatchlistResponse saveItem(WatchlistRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        boolean alreadyExists = watchlistRepository.existsByUserIdAndTmdbIdAndMediaType(
                request.getUserId(),
                request.getTmdbId(),
                request.getMediaType()
        );

        if (alreadyExists) {
            throw new RuntimeException("Este contenido ya está guardado en tu Watchlist");
        }

        WatchlistItem item = new WatchlistItem(
                user,
                request.getTmdbId(),
                request.getTitle(),
                request.getMediaType(),
                request.getPosterPath(),
                request.getReleaseYear(),
                request.getRating(),
                request.getGenres()
        );

        WatchlistItem savedItem = watchlistRepository.save(item);

        return mapToResponse(savedItem);
    }

    public List<WatchlistResponse> getUserWatchlist(Long userId) {
        return watchlistRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<WatchlistResponse> getUserWatchlistByType(Long userId, String mediaType) {
        return watchlistRepository.findByUserIdAndMediaType(userId, mediaType)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void deleteItem(Long itemId) {
        if (!watchlistRepository.existsById(itemId)) {
            throw new RuntimeException("El item no existe");
        }

        watchlistRepository.deleteById(itemId);
    }

    private WatchlistResponse mapToResponse(WatchlistItem item) {
        return new WatchlistResponse(
                item.getId(),
                item.getUser().getId(),
                item.getTmdbId(),
                item.getTitle(),
                item.getMediaType(),
                item.getPosterPath(),
                item.getReleaseYear(),
                item.getRating(),
                item.getGenres(),
                item.getCreatedAt()
        );
    }
}
