package com.NTTDataBackend.empleadoapp.Servicio;

import com.NTTDataBackend.empleadoapp.DTO.EmpleadoDTO;
import com.NTTDataBackend.empleadoapp.Excepciones.RecursoNoEncontradoExcepcion;
import com.NTTDataBackend.empleadoapp.Mapper.EmpleadoMapper;
import com.NTTDataBackend.empleadoapp.Modelo.Empleado;
import com.NTTDataBackend.empleadoapp.Modelo.Oficina;
import com.NTTDataBackend.empleadoapp.Repositorio.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmpleadoServicio implements IEmpleadoServicio{

    private final EmpleadoRepository empleadoRepository;
    private final EmpleadoMapper empleadoMapper;
    private final IOficinaServicio oficinaServicio;

    @Lazy
    private final IEmpleadoOficinaServicio empleadoOficinaServicio;

    @Autowired
    public EmpleadoServicio(EmpleadoRepository empleadoRepository,
                               EmpleadoMapper empleadoMapper,
                               IOficinaServicio oficinaServicio,
                               IEmpleadoOficinaServicio empleadoOficinaServicio) {
        this.empleadoRepository = empleadoRepository;
        this.empleadoMapper = empleadoMapper;
        this.oficinaServicio = oficinaServicio;
        this.empleadoOficinaServicio = empleadoOficinaServicio;
    }

    @Override
    public List<EmpleadoDTO> listarTodos() {
        return empleadoRepository.findAll().stream()
                .map(empleadoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EmpleadoDTO buscarPorId(Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Empleado no encontrado con id: " + id));
        return empleadoMapper.toDTO(empleado);
    }

    @Override
    public EmpleadoDTO crearEmpleado(EmpleadoDTO empleadoDTO) {
        if (empleadoRepository.existsByDni(empleadoDTO.getDni())) {
            throw new IllegalArgumentException("Ya existe un empleado con el DNI: " + empleadoDTO.getDni());
        }
        Empleado empleado = empleadoMapper.toEntity(empleadoDTO);
        if (empleadoDTO.getOficinas() == null || empleadoDTO.getOficinas().isEmpty()) {
            empleado.setTrabajoRemoto(true);
        } else {
            empleado.setTrabajoRemoto(false);
        }
        empleado = empleadoRepository.save(empleado);

        if (empleadoDTO.getOficinas() != null && !empleadoDTO.getOficinas().isEmpty()) {
            empleadoOficinaServicio.asignarOficinasAEmpleado(empleado, empleadoDTO.getOficinas());
        }
        return empleadoMapper.toDTO(empleado);
    }

    @Override
    public EmpleadoDTO actualizarEmpleado(Long id, EmpleadoDTO empleadoDTO) {
        Empleado empleadoExistente = empleadoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Empleado no encontrado con id: " + id));

        empleadoExistente.setNombre(empleadoDTO.getNombre());
        empleadoExistente.setTelefono(empleadoDTO.getTelefono());
        empleadoExistente.setDireccion(empleadoDTO.getDireccion());
        empleadoExistente.setFechaNacimiento(empleadoDTO.getFechaNacimiento());
        empleadoExistente.setTrabajoRemoto(empleadoDTO.isTrabajoRemoto());
        if (empleadoDTO.getOficinas() == null || empleadoDTO.getOficinas().isEmpty()) {
            empleadoExistente.setTrabajoRemoto(true);
        } else {
            empleadoExistente.setTrabajoRemoto(false);
        }

        empleadoOficinaServicio.actualizarOficinasDeEmpleado(empleadoExistente, empleadoDTO.getOficinas());

        return empleadoMapper.toDTO(empleadoRepository.save(empleadoExistente));
    }

    @Override
    public void eliminarEmpleado(Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Empleado no encontrado con id: " + id));

        empleadoOficinaServicio.eliminarAsignacionesDeEmpleado(empleado);
        empleadoRepository.delete(empleado);
    }

    @Override
    public Empleado buscarEntidadPorId(Long id) {
            return empleadoRepository.findById(id)
                    .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Empleado no encontrada con id: " + id));
    }

}

