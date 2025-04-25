package com.NTTDataBackend.empleadoapp.Servicio;

import com.NTTDataBackend.empleadoapp.DTO.EmpleadoDTO;
import com.NTTDataBackend.empleadoapp.DTO.OficinaDTO;
import com.NTTDataBackend.empleadoapp.Excepciones.RecursoNoEncontradoExcepcion;
import com.NTTDataBackend.empleadoapp.Mapper.EmpleadoMapper;
import com.NTTDataBackend.empleadoapp.Mapper.OficinaMapper;
import com.NTTDataBackend.empleadoapp.Modelo.Empleado;
import com.NTTDataBackend.empleadoapp.Modelo.EmpleadoOficina;
import com.NTTDataBackend.empleadoapp.Modelo.Oficina;
import com.NTTDataBackend.empleadoapp.Repositorio.EmpleadoOficinaRepository;
import com.NTTDataBackend.empleadoapp.Repositorio.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmpleadoOficinaServicio implements IEmpleadoOficinaServicio{

    private final EmpleadoOficinaRepository empleadoOficinaRepository;
    private final IOficinaServicio oficinaServicio;
    private final EmpleadoRepository empleadoRepository;
    private final OficinaMapper oficinaMapper;
    private final EmpleadoMapper empleadoMapper;

    @Autowired
    public EmpleadoOficinaServicio(EmpleadoOficinaRepository empleadoOficinaRepository,
                                   IOficinaServicio oficinaServicio,
                                   EmpleadoRepository empleadoRepository,
                                   OficinaMapper oficinaMapper,
                                   EmpleadoMapper empleadoMapper) {
        this.empleadoOficinaRepository = empleadoOficinaRepository;
        this.oficinaServicio = oficinaServicio;
        this.empleadoRepository = empleadoRepository;
        this.oficinaMapper = oficinaMapper;
        this.empleadoMapper = empleadoMapper;
    }


    @Override
    public List<OficinaDTO> listarOficinasDeEmpleado(Long empleadoId) {
        Empleado empleado = empleadoRepository.findById(empleadoId)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Empleado no encontrado con id: " + empleadoId));
        return empleadoOficinaRepository.findByEmpleado(empleado).stream()
                .map(asignacion -> oficinaMapper.toDTO(asignacion.getOficina()))
                .collect(Collectors.toList());
    }

    @Override
    public List<EmpleadoDTO> listarEmpleadosDeOficina(Long oficinaId) {
        Oficina oficina = oficinaServicio.buscarEntidadPorId(oficinaId);
        return empleadoOficinaRepository.findByOficina(oficina).stream()
                .map(asignacion -> empleadoMapper.toDTO(asignacion.getEmpleado()))
                .collect(Collectors.toList());
    }

    @Override
    public void asignarOficinasAEmpleado(Empleado empleado, List<OficinaDTO> oficinasDTO) {
        oficinasDTO.forEach(oficinaDTO -> {
            Oficina oficina = oficinaServicio.buscarEntidadPorId(oficinaDTO.getId());

            if (!empleadoOficinaRepository.existsByEmpleadoAndOficina(empleado, oficina)) {
                EmpleadoOficina asignacion = new EmpleadoOficina();
                asignacion.setEmpleado(empleado);
                asignacion.setOficina(oficina);
                asignacion.setFechaAsignacion(LocalDate.now());
                empleadoOficinaRepository.save(asignacion);
            }
        });
    }

    @Override
    public void actualizarOficinasDeEmpleado(Empleado empleado, List<OficinaDTO> nuevasOficinasDTO) {
        empleadoOficinaRepository.findByEmpleado(empleado).forEach(asignacion -> {
            boolean sigueEnLista = nuevasOficinasDTO.stream()
                    .anyMatch(oficinaDTO -> oficinaDTO.getId().equals(asignacion.getOficina().getId()));

            if (!sigueEnLista) {
                empleadoOficinaRepository.delete(asignacion);
            }
        });

        asignarOficinasAEmpleado(empleado, nuevasOficinasDTO);
    }

    @Override
    public void eliminarAsignacionesDeEmpleado(Empleado empleado) {
        empleadoOficinaRepository.deleteByEmpleado(empleado);
    }

    @Override
    public void eliminarAsignacionAEmpleado(Long empleadoID, Long oficinaID) {
        Empleado empleado = empleadoRepository.findById(empleadoID)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Empleado no encontrado con id: " + empleadoID));
        Oficina oficina = oficinaServicio.buscarEntidadPorId(oficinaID);
        EmpleadoOficina asignacion = empleadoOficinaRepository
                .findByEmpleadoAndOficina(empleado,oficina)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Asignación no encontrada para el empleado y oficina proporcionados."));;
        empleadoOficinaRepository.delete(asignacion);
    }

}
