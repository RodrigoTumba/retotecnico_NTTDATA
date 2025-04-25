package com.NTTDataBackend.empleadoapp.Modelo;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "oficina")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Oficina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;
    private String direccion;

    @OneToMany(mappedBy = "oficina", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmpleadoOficina> empleados;

}
