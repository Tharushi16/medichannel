package lk.medichannel.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lk.medichannel.user.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.*;
import io.jsonwebtoken.JwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwt;
    private final UserRepository users;
    private final String cookieName;

    public JwtAuthenticationFilter(JwtService jwt, UserRepository users,
            @Value("${app.auth.cookie-name:medichannel_token}") String cookieName) {
        this.jwt = jwt;
        this.users = users;
        this.cookieName = cookieName;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        String token = Arrays.stream(Optional.ofNullable(req.getCookies()).orElse(new Cookie[0]))
                .filter(c -> cookieName.equals(c.getName())).map(Cookie::getValue).findFirst().orElse(null);
        if (token != null) {
            try {
                JwtService.JwtPayload p = jwt.parse(token);
                users.findById(p.userId()).filter(User::isActive).ifPresent(u -> {
                    var principal = new CurrentUser(u.getId(), u.getRole());
                    var auth = new UsernamePasswordAuthenticationToken(principal, null,
                            List.of(new SimpleGrantedAuthority("ROLE_" + u.getRole().name())));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                });
            } catch (JwtException | IllegalArgumentException ignored) {
            }
        }
        chain.doFilter(req, res);
    }
}
