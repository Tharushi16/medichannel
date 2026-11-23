package lk.medichannel.user;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(name = "email_ciphertext", nullable = false) private String emailCiphertext;
    @Column(name = "email_lookup_hash", nullable = false, unique = true, length = 64) private String emailLookupHash;
    @Column(name = "password_hash", nullable = false) private String passwordHash;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private UserRole role;
    @Column(nullable = false) private boolean active = true;
    @Column(name = "failed_login_attempts", nullable = false) private int failedLoginAttempts;
    @Column(name = "locked_until") private Instant lockedUntil;
    @Column(name = "password_change_required", nullable = false) private boolean passwordChangeRequired;
    @Column(name = "created_at", nullable = false, updatable = false) private Instant createdAt;
    @Column(name = "updated_at", nullable = false) private Instant updatedAt;
    @PrePersist void created() { createdAt = updatedAt = Instant.now(); }
    @PreUpdate void updated() { updatedAt = Instant.now(); }
    public Long getId(){return id;} public String getEmailCiphertext(){return emailCiphertext;} public void setEmailCiphertext(String v){emailCiphertext=v;}
    public String getEmailLookupHash(){return emailLookupHash;} public void setEmailLookupHash(String v){emailLookupHash=v;}
    public String getPasswordHash(){return passwordHash;} public void setPasswordHash(String v){passwordHash=v;}
    public UserRole getRole(){return role;} public void setRole(UserRole v){role=v;} public boolean isActive(){return active;} public void setActive(boolean v){active=v;}
    public int getFailedLoginAttempts(){return failedLoginAttempts;} public void setFailedLoginAttempts(int v){failedLoginAttempts=v;}
    public Instant getLockedUntil(){return lockedUntil;} public void setLockedUntil(Instant v){lockedUntil=v;}
    public boolean isPasswordChangeRequired(){return passwordChangeRequired;} public void setPasswordChangeRequired(boolean v){passwordChangeRequired=v;}
    public Instant getCreatedAt(){return createdAt;}
}
