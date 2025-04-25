package com.NTTDataBackend.empleadoapp.Controlador;

import com.NTTDataBackend.empleadoapp.DTO.OficinaDTO;
import com.NTTDataBackend.empleadoapp.Servicio.IOficinaServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/oficinas")
public class OficinaController {

        private final IOficinaServicio oficinaServicio;

        @Autowired
        public OficinaController(IOficinaServicio oficinaServicio) {
            this.oficinaServicio = oficinaServicio;
        }

        @Operation(summary = "Listar todas las oficinas", description = "Devuelve una lista de todas las oficinas registradas en el sistema")
        @ApiResponse(responseCode = "200", description = "Lista obtenida exitosamente")
        @GetMapping
        public List<OficinaDTO> listarTodas() {
            return oficinaServicio.listarTodas();
        }

        @Operation(summary = "Buscar oficina por ID", description = "Busca y devuelve una oficina por su ID")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "Oficina encontrada"),
                @ApiResponse(responseCode = "404", description = "Oficina no encontrada")
        })
        @GetMapping("/{id}")
        public OficinaDTO obtenerPorId(@PathVariable Long id) {
            return oficinaServicio.buscarPorId(id);
        }

        @Operation(summary = "Crear una nueva oficina", description = "Registra una nueva oficina en el sistema.")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "201", description = "Oficina creada exitosamente"),
                @ApiResponse(responseCode = "400", description = "Datos inválidos o duplicados")
        })
        @PostMapping
        public OficinaDTO crear(@RequestBody OficinaDTO oficinaDTO) {
            return oficinaServicio.crearOficina(oficinaDTO);
        }

        @Operation(summary = "Actualiza una oficina", description = "Modifica la información de una oficina existente")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "Oficina actualizada correctamente"),
                @ApiResponse(responseCode = "404", description = "Oficina no encontrada")
        })
        @PutMapping("/{id}")
        public OficinaDTO actualizar(@PathVariable Long id, @RequestBody OficinaDTO oficinaDTO) {
            return oficinaServicio.actualizarOficina(id, oficinaDTO);
        }

        @Operation(summary = "Eliminar una oficina", description = "Elimina una oficina del sistema por su ID")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "204", description = "Oficina eliminada exitosamente"),
                @ApiResponse(responseCode = "404", description = "Oficina no encontrada")
        })
        @DeleteMapping("/{id}")
        public void eliminar(@PathVariable Long id) {
            oficinaServicio.eliminarOficina(id);
        }
}

