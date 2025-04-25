package com.NTTDataBackend.empleadoapp.Servicio;

import com.NTTDataBackend.empleadoapp.DTO.OficinaDTO;
import com.NTTDataBackend.empleadoapp.Excepciones.RecursoNoEncontradoExcepcion;
import com.NTTDataBackend.empleadoapp.Mapper.OficinaMapper;
import com.NTTDataBackend.empleadoapp.Modelo.Oficina;
import com.NTTDataBackend.empleadoapp.Repositorio.OficinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OficinaServicio implements IOficinaServicio {

    private final OficinaRepository oficinaRepository;
    private final OficinaMapper oficinaMapper;

    @Autowired
    public OficinaServicio(OficinaRepository oficinaRepository, OficinaMapper oficinaMapper) {
        this.oficinaRepository = oficinaRepository;
        this.oficinaMapper = oficinaMapper;
    }

    @Override
    public List<OficinaDTO> listarTodas() {
        return oficinaRepository.findAll().stream()
                .map(oficinaMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OficinaDTO buscarPorId(Long id) {
        Oficina oficina = oficinaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Oficina no encontrada con id: " + id));
        return oficinaMapper.toDTO(oficina);
    }

    @Override
    public OficinaDTO crearOficina(OficinaDTO oficinaDTO) {
        Oficina oficina = oficinaMapper.toEntity(oficinaDTO);
        return oficinaMapper.toDTO(oficinaRepository.save(oficina));
    }

    @Override
    public OficinaDTO actualizarOficina(Long id, OficinaDTO oficinaDTO) {
        Oficina oficinaExistente = oficinaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Oficina no encontrada con id: " + id));

        oficinaExistente.setNombre(oficinaDTO.getNombre());
        oficinaExistente.setDireccion(oficinaDTO.getDireccion());

        return oficinaMapper.toDTO(oficinaRepository.save(oficinaExistente));
    }

    @Override
    public void eliminarOficina(Long id) {
        Oficina oficina = oficinaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Oficina no encontrada con id: " + id));

        if (!oficina.getEmpleados().isEmpty()) {
            throw new IllegalStateException("No se puede eliminar la oficina porque tiene empleados asignados");
        }

        oficinaRepository.delete(oficina);
    }

    @Override
    public Oficina buscarEntidadPorId(Long id) {
        return oficinaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Oficina no encontrada con id: " + id));
    }
}
