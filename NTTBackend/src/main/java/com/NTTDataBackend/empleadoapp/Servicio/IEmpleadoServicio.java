package com.NTTDataBackend.empleadoapp.Servicio;

import com.NTTDataBackend.empleadoapp.DTO.EmpleadoDTO;
import com.NTTDataBackend.empleadoapp.Modelo.Empleado;
import com.NTTDataBackend.empleadoapp.Modelo.Oficina;

import java.util.List;

public interface IEmpleadoServicio {
     List<EmpleadoDTO> listarTodos();
     EmpleadoDTO buscarPorId(Long id);
     EmpleadoDTO crearEmpleado(EmpleadoDTO empleadoDTO);
     EmpleadoDTO actualizarEmpleado(Long id, EmpleadoDTO empleadoDTO);
     void eliminarEmpleado(Long id);
     Empleado buscarEntidadPorId(Long id);
}
