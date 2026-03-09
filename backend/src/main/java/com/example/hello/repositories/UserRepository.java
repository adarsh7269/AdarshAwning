package com.example.hello.repositories;

import com.example.hello.models.AwningUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<AwningUser, Long> {
    Optional<AwningUser> findByUsername(String username);

    Optional<AwningUser> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
