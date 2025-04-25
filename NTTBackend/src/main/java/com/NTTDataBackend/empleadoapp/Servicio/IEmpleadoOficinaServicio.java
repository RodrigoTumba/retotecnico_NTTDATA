package com.NTTDataBackend.empleadoapp.Servicio;

import com.NTTDataBackend.empleadoapp.DTO.EmpleadoDTO;
import com.NTTDataBackend.empleadoapp.DTO.OficinaDTO;
import com.NTTDataBackend.empleadoapp.Modelo.Empleado;

import java.util.List;

public interface IEmpleadoOficinaServicio {
    List<OficinaDTO> listarOficinasDeEmpleado(Long empleadoId);
    List<EmpleadoDTO> listarEmpleadosDeOficina(Long oficinaId);
    void asignarOficinasAEmpleado(Empleado empleado, List<OficinaDTO> oficinasDTO);
    void actualizarOficinasDeEmpleado(Empleado empleado, List<OficinaDTO> nuevasOficinasDTO);
    void eliminarAsignacionesDeEmpleado(Empleado empleado);
    void eliminarAsignacionAEmpleado(Long empleadoID,Long oficinaID);
}
