package fiap.com.br.moviedb.repository;

import fiap.com.br.moviedb.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
