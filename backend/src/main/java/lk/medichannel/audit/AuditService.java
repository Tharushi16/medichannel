package lk.medichannel.audit;
import jakarta.servlet.http.HttpServletRequest; import org.springframework.stereotype.Service;
@Service public class AuditService { private final AuditLogRepository repo; public AuditService(AuditLogRepository repo){this.repo=repo;} public void log(Long actor,String action,String type,Object id,HttpServletRequest request){repo.save(AuditLog.of(actor,action,type,id==null?null:id.toString(), request==null?null:request.getRemoteAddr()));} }
