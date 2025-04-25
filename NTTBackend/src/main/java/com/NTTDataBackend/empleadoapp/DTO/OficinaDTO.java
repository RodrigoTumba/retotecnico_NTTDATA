package com.NTTDataBackend.empleadoapp.DTO;


import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class OficinaDTO {

    private Long id;
    private String nombre;
    private String direccion;
}
