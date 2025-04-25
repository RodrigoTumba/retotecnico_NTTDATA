    package com.NTTDataBackend.empleadoapp.DTO;

    import lombok.*;

    import java.time.LocalDate;
    import java.util.List;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @EqualsAndHashCode
    public class EmpleadoDTO {
        private Long id;
        private String nombre;
        private String telefono;
        private String dni;
        private String direccion;
        private LocalDate fechaNacimiento;
        private boolean trabajoRemoto;
        private List<OficinaDTO> oficinas;
    }
