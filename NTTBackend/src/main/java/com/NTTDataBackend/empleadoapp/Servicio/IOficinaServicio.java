package com.NTTDataBackend.empleadoapp.Servicio;

import com.NTTDataBackend.empleadoapp.DTO.OficinaDTO;
import com.NTTDataBackend.empleadoapp.Modelo.Oficina;

import java.util.List;

public interface IOficinaServicio {
    List<OficinaDTO> listarTodas();
    OficinaDTO buscarPorId(Long id);
    OficinaDTO crearOficina(OficinaDTO oficinaDTO);
    OficinaDTO actualizarOficina(Long id, OficinaDTO oficinaDTO);
    void eliminarOficina(Long id);
    Oficina buscarEntidadPorId(Long id);
}
