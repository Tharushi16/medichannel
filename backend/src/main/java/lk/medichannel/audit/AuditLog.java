package lk.medichannel.audit;
import jakarta.persistence.*; import java.time.Instant;
@Entity @Table(name="audit_logs") public class AuditLog {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; @Column(name="actor_user_id") private Long actorUserId; @Column(nullable=false) private String action; @Column(name="target_type") private String targetType; @Column(name="target_id") private String targetId; @Column(name="ip_address") private String ipAddress; @Column(name="created_at",nullable=false,updatable=false) private Instant createdAt;
 @PrePersist void create(){createdAt=Instant.now();} public Long getId(){return id;} public Long getActorUserId(){return actorUserId;} public String getAction(){return action;} public String getTargetType(){return targetType;} public String getTargetId(){return targetId;} public String getIpAddress(){return ipAddress;} public Instant getCreatedAt(){return createdAt;}
 public static AuditLog of(Long actor,String action,String targetType,String targetId,String ip){AuditLog a=new AuditLog();a.actorUserId=actor;a.action=action;a.targetType=targetType;a.targetId=targetId;a.ipAddress=ip;return a;}
}
