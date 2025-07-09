package com.EventManagement.Backend.config;

import com.EventManagement.Backend.Services.CustomUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException; // Added
import io.jsonwebtoken.SignatureException; // Added
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // Added
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException; // Added
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        String path = request.getServletPath();
        if (path.equals("/login") || path.equals("/register")) {
            chain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(token);
            } catch (ExpiredJwtException e) {
                // Token has expired
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write("JWT Token has expired: " + e.getMessage());
                return;
            } catch (SignatureException e) {
                // Invalid JWT Signature (tampered token)
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write("Invalid JWT Signature: " + e.getMessage());
                return;
            } catch (Exception e) {
                // Other general JWT parsing issues (e.g., malformed token)
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write("Invalid JWT Token: " + e.getMessage());
                return;
            }
        }

        // If username is extracted and no authentication is currently set in SecurityContext
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = null;
            try {
                userDetails = userDetailsService.loadUserByUsername(username);
            } catch (UsernameNotFoundException e) {
                // User associated with token not found in DB
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write("User not found for the provided token: " + e.getMessage());
                return;
            }

            // If userDetails are found and token is valid
            if (userDetails != null && jwtUtil.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                // Token validation failed (e.g., username mismatch, but already caught expiration)
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write("Token validation failed for user " + username + ".");
                return;
            }
        }
        // If authHeader is null or doesn't start with "Bearer ", or if SecurityContext already has auth,
        // proceed to the next filter. Spring Security will then determine if the endpoint requires authentication.

        chain.doFilter(request, response);
    }
}