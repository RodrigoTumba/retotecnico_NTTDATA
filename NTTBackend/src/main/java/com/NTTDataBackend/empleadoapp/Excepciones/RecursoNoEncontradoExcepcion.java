package com.NTTDataBackend.empleadoapp.Excepciones;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.NOT_FOUND)
public class RecursoNoEncontradoExcepcion extends RuntimeException{
    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    public RecursoNoEncontradoExcepcion(String mensaje){
        super(mensaje);
        this.resourceName = null;
        this.fieldName = null;
        this.fieldValue = null;
    }

    public RecursoNoEncontradoExcepcion(String nombreRecurso, String nombreCampo, Object valorCampo) {
        super(String.format("%s no encontrado con %s : '%s'", nombreRecurso, nombreCampo, valorCampo));
        this.resourceName = nombreRecurso;
        this.fieldName = nombreCampo;
        this.fieldValue = valorCampo;
    }

}
