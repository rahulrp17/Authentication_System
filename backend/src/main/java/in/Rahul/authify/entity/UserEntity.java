package in.Rahul.authify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name="tbl_users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String userId;
    private String name;
    @Column(unique = true)
    private String email;

    private String password;

    private Boolean isAccountVerified;

    private String verifyOtp;

    private Long verifyOtpExpireAt;

    private String resetOtp;

    private Long resetOtpExpireAt;
    @CreationTimestamp
    @Column(unique = false)
    private Timestamp createdAt;
    @UpdateTimestamp
    private Timestamp updatedAt;



}
