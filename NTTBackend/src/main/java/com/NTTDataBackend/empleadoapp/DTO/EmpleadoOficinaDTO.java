package com.NTTDataBackend.empleadoapp.DTO;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class EmpleadoOficinaDTO {
    private Long id;
    private Long empleadoId;
    private Long oficinaId;
    private LocalDate fechaAsignacion;
}
