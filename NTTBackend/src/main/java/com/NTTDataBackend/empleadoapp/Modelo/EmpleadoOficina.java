package com.NTTDataBackend.empleadoapp.Modelo;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "empleado_oficina")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class EmpleadoOficina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @ManyToOne
    @JoinColumn(name = "oficina_id", nullable = false)
    private Oficina oficina;

    @Column(name = "fecha_asignacion")
    private LocalDate fechaAsignacion;
}
