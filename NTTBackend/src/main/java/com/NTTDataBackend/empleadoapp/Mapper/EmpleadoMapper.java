package com.NTTDataBackend.empleadoapp.Mapper;

import com.NTTDataBackend.empleadoapp.DTO.EmpleadoDTO;
import com.NTTDataBackend.empleadoapp.DTO.OficinaDTO;
import com.NTTDataBackend.empleadoapp.Modelo.Empleado;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class EmpleadoMapper {
    public EmpleadoDTO toDTO(Empleado empleado) {
        if (empleado == null) return null;

        List<OficinaDTO> oficinasDTO = Optional.ofNullable(empleado.getOficinas())
                .orElse(Collections.emptyList())
                .stream()
                .map(eo -> new OficinaDTO(
                        eo.getOficina().getId(),
                        eo.getOficina().getNombre(),
                        eo.getOficina().getDireccion()))
                .distinct()
                .toList();

        return EmpleadoDTO.builder()
                .id(empleado.getId())
                .nombre(empleado.getNombre())
                .telefono(empleado.getTelefono())
                .dni(empleado.getDni())
                .direccion(empleado.getDireccion())
                .fechaNacimiento(empleado.getFechaNacimiento())
                .trabajoRemoto(empleado.isTrabajoRemoto())
                .oficinas(oficinasDTO)
                .build();
    }

    public Empleado toEntity(EmpleadoDTO dto) {
        if (dto == null) return null;

        return Empleado.builder()
                .id(dto.getId())
                .nombre(dto.getNombre())
                .telefono(dto.getTelefono())
                .dni(dto.getDni())
                .direccion(dto.getDireccion())
                .fechaNacimiento(dto.getFechaNacimiento())
                .trabajoRemoto(dto.isTrabajoRemoto())
                .build();
        // Nota: La asignación de oficinas se debe manejar en el servicio
    }
}
