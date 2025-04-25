package com.NTTDataBackend.empleadoapp.Mapper;

import com.NTTDataBackend.empleadoapp.DTO.OficinaDTO;
import com.NTTDataBackend.empleadoapp.Modelo.Oficina;
import org.springframework.stereotype.Component;

@Component
public class OficinaMapper {

    public OficinaDTO toDTO(Oficina oficina) {
        if (oficina == null) {
            return null;
        }

        return OficinaDTO.builder()
                .id(oficina.getId())
                .nombre(oficina.getNombre())
                .direccion(oficina.getDireccion())
                .build();
    }

    public Oficina toEntity(OficinaDTO dto) {
        if (dto == null) {
            return null;
        }

        return Oficina.builder()
                .id(dto.getId())
                .nombre(dto.getNombre())
                .direccion(dto.getDireccion())
                .build();
    }
}
