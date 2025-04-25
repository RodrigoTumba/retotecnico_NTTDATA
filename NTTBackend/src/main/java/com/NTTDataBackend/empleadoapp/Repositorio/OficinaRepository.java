package com.NTTDataBackend.empleadoapp.Repositorio;

import com.NTTDataBackend.empleadoapp.Modelo.Oficina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OficinaRepository extends JpaRepository<Oficina,Long> {

}
