package com.example.contas.repositories;


import com.example.contas.models.ContasAPagarModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ContasRepository extends JpaRepository<ContasAPagarModel, UUID> {

}
