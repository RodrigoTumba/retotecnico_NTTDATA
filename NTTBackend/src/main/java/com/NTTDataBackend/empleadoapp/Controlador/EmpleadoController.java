package com.NTTDataBackend.empleadoapp.Controlador;


import com.NTTDataBackend.empleadoapp.DTO.EmpleadoDTO;
import com.NTTDataBackend.empleadoapp.Servicio.IEmpleadoServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {


    private final IEmpleadoServicio empleadoServicio;

    @Autowired
    public EmpleadoController(IEmpleadoServicio empleadoServicio) {
        this.empleadoServicio = empleadoServicio;
    }

    @Operation(summary = "Listar todos los empleados", description = "Devuelve una lista de todos los empleados registrados en el sistema")
    @ApiResponse(responseCode = "200", description = "Lista obtenida exitosamente")
    @GetMapping
    public List<EmpleadoDTO> listarTodos() {
        return empleadoServicio.listarTodos();
    }

    @Operation(summary = "Buscar empleado por ID", description = "Busca y devuelve un empleado por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Empleado encontrado"),
            @ApiResponse(responseCode = "404", description = "Empleado no encontrado")
    })
    @GetMapping("/{id}")
    public EmpleadoDTO obtenerPorId(@PathVariable Long id) {
        return empleadoServicio.buscarPorId(id);
    }

    @Operation(summary = "Crear un nuevo empleado", description = "Registra un nuevo empleado en el sistema. Si se proporcionan oficinas, también se asignan.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Empleado creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos o duplicados")
    })
    @PostMapping
    public EmpleadoDTO crear(@RequestBody EmpleadoDTO empleadoDTO) {
        return empleadoServicio.crearEmpleado(empleadoDTO);
    }

    @Operation(summary = "Actualizar un empleado", description = "Modifica la información de un empleado existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Empleado actualizado correctamente"),
            @ApiResponse(responseCode = "404", description = "Empleado no encontrado")
    })
    @PutMapping("/{id}")
    public EmpleadoDTO actualizar(@PathVariable Long id, @RequestBody EmpleadoDTO empleadoDTO) {
        return empleadoServicio.actualizarEmpleado(id, empleadoDTO);
    }

    @Operation(summary = "Eliminar un empleado", description = "Elimina un empleado del sistema por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Empleado eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Empleado no encontrado")
    })
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        empleadoServicio.eliminarEmpleado(id);
    }
}
