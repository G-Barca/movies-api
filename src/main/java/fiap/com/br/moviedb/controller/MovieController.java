package fiap.com.br.moviedb.controller;

import fiap.com.br.moviedb.dto.MovieAutocompleteDTO;
import fiap.com.br.moviedb.dto.MovieSummaryDTO;
import fiap.com.br.moviedb.model.Movie;
import fiap.com.br.moviedb.service.MovieService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // Endpoints 1, 3, 4, 5, 6, 7 - todos via parametros opcionais combinaveis
    @GetMapping
    public Page<Movie> findAll(@RequestParam(required = false) String genre,
                                @RequestParam(required = false) String director,
                                @RequestParam(required = false) Integer yearFrom,
                                @RequestParam(required = false) Integer yearTo,
                                @RequestParam(required = false) Double ratingAbove,
                                Pageable pageable) {
        return movieService.findAll(genre, director, yearFrom, yearTo, ratingAbove, pageable);
    }

    // Endpoint 2
    @GetMapping("/search")
    public Page<Movie> search(@RequestParam String title, Pageable pageable) {
        return movieService.searchByTitle(title, pageable);
    }

    // Endpoint 8
    @GetMapping("/director/{directorId}/top")
    public Page<Movie> topByDirector(@PathVariable Long directorId,
                                      @RequestParam Double ratingAbove,
                                      Pageable pageable) {
        return movieService.findTopByDirector(directorId, ratingAbove, pageable);
    }

    // Endpoint 9
    @GetMapping("/autocomplete")
    public List<MovieAutocompleteDTO> autocomplete(@RequestParam String q) {
        return movieService.autocomplete(q);
    }

    // Endpoint 10
    @GetMapping("/summary")
    public Page<MovieSummaryDTO> summary(Pageable pageable) {
        return movieService.summary(pageable);
    }

    // Endpoint 11
    @GetMapping("/top5")
    public List<Movie> top5() {
        return movieService.top5();
    }
}
