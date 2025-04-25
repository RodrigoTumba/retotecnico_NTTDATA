package com.NTTDataBackend.empleadoapp.Repositorio;

import com.NTTDataBackend.empleadoapp.Modelo.Empleado;
import com.NTTDataBackend.empleadoapp.Modelo.EmpleadoOficina;
import com.NTTDataBackend.empleadoapp.Modelo.Oficina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmpleadoOficinaRepository extends JpaRepository<EmpleadoOficina,Long> {
    List<EmpleadoOficina> findByEmpleado(Empleado empleado);
    List<EmpleadoOficina> findByOficina(Oficina oficina);
    boolean existsByEmpleadoAndOficina(Empleado empleado, Oficina oficina);
    void deleteByEmpleado(Empleado empleado);
    Optional<EmpleadoOficina> findByEmpleadoAndOficina(Empleado empleado, Oficina oficina);
}
