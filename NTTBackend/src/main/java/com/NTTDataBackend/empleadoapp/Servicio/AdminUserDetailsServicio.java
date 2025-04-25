package com.NTTDataBackend.empleadoapp.Servicio;

import com.NTTDataBackend.empleadoapp.Modelo.Usuario;
import com.NTTDataBackend.empleadoapp.Repositorio.UsuarioRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserDetailsServicio implements UserDetailsService {

    private final UsuarioRepository adminRepo;

    public AdminUserDetailsServicio(UsuarioRepository adminRepo) {
        this.adminRepo = adminRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario admin = adminRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Administrador no encontrado"));
        return new User(admin.getUsername(), admin.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
    }
}
