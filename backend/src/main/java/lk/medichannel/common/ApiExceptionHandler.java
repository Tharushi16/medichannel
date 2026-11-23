package lk.medichannel.common;
import lk.medichannel.auth.AuthenticationFailureException; import org.springframework.http.*; import org.springframework.security.access.AccessDeniedException; import org.springframework.web.bind.MethodArgumentNotValidException; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestControllerAdvice public class ApiExceptionHandler {
 @ExceptionHandler(IllegalArgumentException.class) ResponseEntity<Map<String,String>> bad(IllegalArgumentException e){return ResponseEntity.badRequest().body(Map.of("message",e.getMessage()));}
 @ExceptionHandler(AuthenticationFailureException.class) ResponseEntity<Map<String,String>> unauthorized(AuthenticationFailureException e){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message",e.getMessage()));}
 @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<Map<String,String>> validation(MethodArgumentNotValidException e){return ResponseEntity.badRequest().body(Map.of("message",e.getBindingResult().getFieldErrors().stream().findFirst().map(x->x.getField()+" "+x.getDefaultMessage()).orElse("Validation failed")));}
 @ExceptionHandler(AccessDeniedException.class) ResponseEntity<Map<String,String>> forbidden(){return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message","Access denied"));}
}
