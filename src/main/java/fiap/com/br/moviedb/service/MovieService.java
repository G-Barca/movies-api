package fiap.com.br.moviedb.service;

import fiap.com.br.moviedb.dto.MovieAutocompleteDTO;
import fiap.com.br.moviedb.dto.MovieSummaryDTO;
import fiap.com.br.moviedb.model.Movie;
import fiap.com.br.moviedb.repository.MovieRepository;
import fiap.com.br.moviedb.specification.MovieSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Page<Movie> findAll(String genre, String director, Integer yearFrom, Integer yearTo,
                                Double ratingAbove, Pageable pageable) {
        Specification<Movie> spec = Specification.where((Specification<Movie>) null);

        if (genre != null && !genre.isBlank()) {
            spec = spec.and(MovieSpecification.hasGenre(genre));
        }
        if (director != null && !director.isBlank()) {
            spec = spec.and(MovieSpecification.hasDirectorNameLike(director));
        }
        if (yearFrom != null && yearTo != null) {
            spec = spec.and(MovieSpecification.yearBetween(yearFrom, yearTo));
        } else if (yearFrom != null) {
            spec = spec.and(MovieSpecification.yearFrom(yearFrom));
        }
        if (ratingAbove != null) {
            spec = spec.and(MovieSpecification.ratingAbove(ratingAbove));
        }

        return movieRepository.findAll(spec, pageable);
    }

    public Page<Movie> searchByTitle(String title, Pageable pageable) {
        return movieRepository.findAll(MovieSpecification.titleContains(title), pageable);
    }

    public Page<Movie> findTopByDirector(Long directorId, Double ratingAbove, Pageable pageable) {
        Specification<Movie> spec = Specification.where(MovieSpecification.hasDirectorId(directorId))
                .and(MovieSpecification.ratingAbove(ratingAbove));
        return movieRepository.findAll(spec, pageable);
    }

    public List<MovieAutocompleteDTO> autocomplete(String q) {
        return movieRepository.findAll(MovieSpecification.titleContains(q)).stream()
                .map(m -> new MovieAutocompleteDTO(m.getId(), m.getTitle()))
                .toList();
    }

    public Page<MovieSummaryDTO> summary(Pageable pageable) {
        return movieRepository.findAll(Specification.where((Specification<Movie>) null), pageable)
                .map(m -> new MovieSummaryDTO(
                        m.getTitle(),
                        m.getReleaseYear(),
                        m.getRating(),
                        m.getGenre() != null ? m.getGenre().getName() : null
                ));
    }

    public List<Movie> top5() {
        return movieRepository.findAll(
                Specification.where((Specification<Movie>) null),
                PageRequest.of(0, 5, Sort.by("rating").descending())
        ).getContent();
    }
}
