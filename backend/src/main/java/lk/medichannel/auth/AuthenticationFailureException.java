package lk.medichannel.auth;

/** Deliberately generic so an attacker cannot enumerate registered accounts. */
public class AuthenticationFailureException extends RuntimeException {
    public AuthenticationFailureException() { super("Invalid email or password"); }
}
