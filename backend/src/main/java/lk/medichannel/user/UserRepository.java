package lk.medichannel.user;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailLookupHash(String emailLookupHash);
    Page<User> findAllByRole(UserRole role, Pageable pageable);
}
