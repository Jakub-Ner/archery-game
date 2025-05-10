package com.game.player_service;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;

@Component
public class TrailingSlashHandlerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        String requestUri = request.getRequestURI();

        if (requestUri.endsWith("/")) {
            String newUrl = requestUri.substring(0, requestUri.length() - 1);
            response.setStatus(HttpStatus.MULTIPLE_CHOICES.value());
            System.out.println(newUrl);
            response.setHeader(HttpHeaders.LOCATION, newUrl);
            return;
        }

        filterChain.doFilter(request, response);
    }
}