package lk.medichannel.config;
import lk.medichannel.crypto.CryptoService; import lk.medichannel.user.*; import org.springframework.beans.factory.annotation.Value; import org.springframework.boot.ApplicationArguments; import org.springframework.boot.ApplicationRunner; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.stereotype.Component;
/** Creates exactly one first administrator when all three bootstrap values are configured. */
@Component public class InitialAdminBootstrap implements ApplicationRunner {
 private final UserRepository users; private final CryptoService crypto; private final PasswordEncoder passwords; private final String email,password,name;
 public InitialAdminBootstrap(UserRepository users,CryptoService crypto,PasswordEncoder passwords,@Value("${app.initial-admin.email:}") String email,@Value("${app.initial-admin.password:}") String password,@Value("${app.initial-admin.name:System Administrator}") String name){this.users=users;this.crypto=crypto;this.passwords=passwords;this.email=email;this.password=password;this.name=name;}
 public void run(ApplicationArguments args){if(email.isBlank()||password.isBlank())return;String hash=crypto.hmac(email);if(users.findByEmailLookupHash(hash).isPresent())return;User admin=new User();admin.setEmailCiphertext(crypto.encrypt(email));admin.setEmailLookupHash(hash);admin.setPasswordHash(passwords.encode(password));admin.setRole(UserRole.ADMIN);admin.setPasswordChangeRequired(true);users.save(admin);}
}
