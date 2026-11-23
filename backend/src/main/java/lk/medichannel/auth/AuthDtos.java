package lk.medichannel.auth;
import jakarta.validation.constraints.*; import lk.medichannel.user.UserRole; import java.time.Instant;
public final class AuthDtos { private AuthDtos(){}
 public record RegisterRequest(@NotBlank @Email @Size(max=254) String email,@NotBlank @Size(min=12,max=72) String password){}
 public record LoginRequest(@NotBlank @Email String email,@NotBlank String password){}
 public record ChangePasswordRequest(@NotBlank @Size(min=12,max=72) String currentPassword,@NotBlank @Size(min=12,max=72) String newPassword){}
 public record UserResponse(Long id,String email,UserRole role,boolean active,boolean passwordChangeRequired,Instant createdAt){}
 public record LoginResponse(UserResponse user){}
}
