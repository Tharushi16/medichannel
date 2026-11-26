package lk.medichannel.security;
import io.jsonwebtoken.*; import io.jsonwebtoken.security.Keys; import lk.medichannel.user.*; import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Service;
import javax.crypto.SecretKey; import java.time.*; import java.util.*;
@Service public class JwtService {
 private final SecretKey key; private final long minutes;
 public JwtService(@Value("${app.jwt.secret:}") String secret,@Value("${app.jwt.expiration-minutes:30}") long minutes){if(secret==null||secret.length()<32)throw new IllegalStateException("JWT_SECRET must contain at least 32 characters");this.key=Keys.hmacShaKeyFor(secret.getBytes(java.nio.charset.StandardCharsets.UTF_8));this.minutes=minutes;}
 public String create(User user){Instant now=Instant.now();return Jwts.builder().subject(user.getId().toString()).claim("role",user.getRole().name()).issuedAt(Date.from(now)).expiration(Date.from(now.plus(Duration.ofMinutes(minutes)))).signWith(key).compact();}
 public JwtPayload parse(String token){Claims c=Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();return new JwtPayload(Long.valueOf(c.getSubject()),UserRole.valueOf(c.get("role",String.class)));}
 public long maxAge(){return Duration.ofMinutes(minutes).toSeconds();} public record JwtPayload(Long userId,UserRole role){}
}
