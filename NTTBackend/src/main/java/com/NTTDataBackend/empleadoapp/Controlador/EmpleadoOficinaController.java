package com.NTTDataBackend.empleadoapp.Controlador;

import com.NTTDataBackend.empleadoapp.DTO.EmpleadoDTO;
import com.NTTDataBackend.empleadoapp.DTO.OficinaDTO;
import com.NTTDataBackend.empleadoapp.Modelo.Empleado;
import com.NTTDataBackend.empleadoapp.Servicio.IEmpleadoOficinaServicio;
import com.NTTDataBackend.empleadoapp.Servicio.IEmpleadoServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empleado-oficina")
public class EmpleadoOficinaController {

    private final IEmpleadoOficinaServicio empleadoOficinaServicio;
    private final IEmpleadoServicio empleadoServicio;

    @Autowired
    public EmpleadoOficinaController(IEmpleadoOficinaServicio empleadoOficinaServicio, IEmpleadoServicio empleadoServicio) {
        this.empleadoOficinaServicio = empleadoOficinaServicio;
        this.empleadoServicio = empleadoServicio;
    }


    @Operation(summary = "Asigna una oficina a un Empleado segun su ID", description = "Registra las oficinas de un empleado en el sistema")
    @ApiResponse(responseCode = "200", description = "Asignacion de oficinas para el empleado realizado exitosamente")
    @PostMapping("/asignar/{empleadoId}")
    public void asignarOficinas(@PathVariable Long empleadoId, @RequestBody List<OficinaDTO> oficinasDTO) {
        Empleado empleado = empleadoServicio.buscarEntidadPorId(empleadoId);
        empleadoOficinaServicio.asignarOficinasAEmpleado(empleado, oficinasDTO);
    }

    @Operation(summary = "Actualiza las oficinas de un Empleado segun su ID", description = "Actualiza las oficinas de un empleado en el sistema")
    @ApiResponse(responseCode = "200", description = "Actualizacion de oficinas para el empleado realizado exitosamente")
    @PutMapping("/actualizar/{empleadoId}")
    public void actualizarOficinas(@PathVariable Long empleadoId, @RequestBody List<OficinaDTO> nuevasOficinasDTO) {
        Empleado empleado = empleadoServicio.buscarEntidadPorId(empleadoId);
        empleadoOficinaServicio.actualizarOficinasDeEmpleado(empleado, nuevasOficinasDTO);
    }

    @Operation(summary = "Elimina las oficinas de un Empleado segun su ID", description = "Elimina las oficinas de un empleado en el sistema")
    @ApiResponse(responseCode = "200", description = "Eliminacion de oficinas para el empleado realizado exitosamente")
    @DeleteMapping("/eliminar/{empleadoId}")
    public void eliminarAsignaciones(@PathVariable Long empleadoId) {
        Empleado empleado = empleadoServicio.buscarEntidadPorId(empleadoId);
        empleadoOficinaServicio.eliminarAsignacionesDeEmpleado(empleado);
    }

    @Operation(summary = "Lista las oficinas de un Empleado segun su ID", description = "Lista las oficinas de un empleado en el sistema")
    @ApiResponse(responseCode = "200", description = "Listado de oficinas del empleado realizado exitosamente")
    @GetMapping("/oficinas/{empleadoId}")
    public List<OficinaDTO> listarOficinasDeEmpleado(@PathVariable Long empleadoId) {
        return empleadoOficinaServicio.listarOficinasDeEmpleado(empleadoId);
    }

    @Operation(summary = "Lista los empleados de una oficina segun su ID", description = "Lista los empleados de una oficina en el sistema")
    @ApiResponse(responseCode = "200", description = "Listado de empleados de la oficina realizado exitosamente")
    @GetMapping("/empleados/{oficinaId}")
    public List<EmpleadoDTO> listarEmpleadosDeOficina(@PathVariable Long oficinaId) {
        return empleadoOficinaServicio.listarEmpleadosDeOficina(oficinaId);
    }

    @Operation(summary = "Elimina la asignacion de la Oficina a un empleado mediante sus IDs", description = "Elimina la relacion de la oficina y el empleado mediante sus IDs")
    @ApiResponse(responseCode = "200", description = "Asignacion de oficina para el empleado eliminado")
    @DeleteMapping("/asignaciones/{empleadoId}/{oficinaId}")
    public ResponseEntity<String> eliminarAsignacion(
            @PathVariable Long empleadoId,
            @PathVariable Long oficinaId) {

        empleadoOficinaServicio.eliminarAsignacionAEmpleado(empleadoId, oficinaId);

        return ResponseEntity.ok("Asignación eliminada correctamente");
    }
}
