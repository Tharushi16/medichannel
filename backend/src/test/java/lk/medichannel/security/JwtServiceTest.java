package lk.medichannel.security;

import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {
    @Test void malformedTokenIsRejected() {
        JwtService service = new JwtService("a-long-local-test-secret-that-is-at-least-32-characters", 30);
        assertThrows(JwtException.class, () -> service.parse("not-a-jwt"));
    }
}
