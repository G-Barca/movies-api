package fiap.com.br.moviedb.specification;

import fiap.com.br.moviedb.model.Movie;
import org.springframework.data.jpa.domain.Specification;

public class MovieSpecification {

    public static Specification<Movie> titleContains(String title) {
        return (root, query, cb) ->
                cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Movie> hasGenre(String genreName) {
        return (root, query, cb) ->
                cb.equal(cb.lower(root.join("genre").get("name")), genreName.toLowerCase());
    }

    public static Specification<Movie> hasDirectorNameLike(String directorName) {
        return (root, query, cb) ->
                cb.like(cb.lower(root.join("director").get("name")), "%" + directorName.toLowerCase() + "%");
    }

    public static Specification<Movie> hasDirectorId(Long directorId) {
        return (root, query, cb) -> cb.equal(root.join("director").get("id"), directorId);
    }

    public static Specification<Movie> yearBetween(Integer from, Integer to) {
        return (root, query, cb) -> cb.between(root.get("releaseYear"), from, to);
    }

    public static Specification<Movie> yearFrom(Integer from) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("releaseYear"), from);
    }

    public static Specification<Movie> ratingAbove(Double rating) {
        return (root, query, cb) -> cb.greaterThan(root.get("rating"), rating);
    }
}
