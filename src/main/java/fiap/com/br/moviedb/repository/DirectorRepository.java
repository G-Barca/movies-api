package fiap.com.br.moviedb.repository;

import fiap.com.br.moviedb.model.Director;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectorRepository extends JpaRepository<Director, Long> {
}
