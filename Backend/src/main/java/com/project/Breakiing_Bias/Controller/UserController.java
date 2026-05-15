package com.project.Breakiing_Bias.Controller;

import com.project.Breakiing_Bias.DTO.EmailRequest;
import com.project.Breakiing_Bias.DTO.LoginRequest;
import com.project.Breakiing_Bias.DTO.ResetPasswordRequest;
import com.project.Breakiing_Bias.DTO.UsernameRequest;
import com.project.Breakiing_Bias.Entity.Users;
import com.project.Breakiing_Bias.Service.JwtService;
import com.project.Breakiing_Bias.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/")
    public String run(){
        return "Server is running.............";
    }

    // STEP 1
    @PostMapping("/start")
    public ResponseEntity<?> start(
            @RequestBody EmailRequest user
    ) {

        userService.startRegistration(user.getEmail());

        System.out.println(
                "Registration initiated ....."
        );

        return ResponseEntity.ok(
                "Verification email sent"
        );
    }

    // STEP 2
    @GetMapping("/verify")
    public ResponseEntity<?> verify(
            @RequestParam String token
    ) {

        System.out.println(
                "Verify Hiiiii......"
        );

        userService.verifyEmail(token);

        System.out.println(frontendUrl);

        return ResponseEntity

                .status(HttpStatus.FOUND)

                .location(
                        URI.create(
                                frontendUrl
                                        + "/register/complete"
                        )
                )

                .build();
    }

    // STEP 3
    @PostMapping("/complete")
    public ResponseEntity<?> complete(
            @RequestBody Users user
    ) {

        System.out.println(
                "verification complete....."
        );

        userService.completeRegistration(
                user.getEmail(),
                user.getUsername(),
                user.getPassword()
        );

        return ResponseEntity.ok(
                "Registration completed"
        );
    }

    // LOGIN WITH JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        try {

            Authentication authentication =

                    authenticationManager.authenticate(

                            new UsernamePasswordAuthenticationToken(

                                    request.getUsername(),

                                    request.getPassword()
                            )
                    );

            if(authentication.isAuthenticated()) {

                String token =

                        jwtService.generateToken(
                                request.getUsername()
                        );

                return ResponseEntity.ok(token);
            }

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }
    }

    @PostMapping("/forgot/start")
    public ResponseEntity<?> forgotStart(
            @RequestBody UsernameRequest request
    ) {

        System.out.println(
                "Forgot password process initiated......."
        );

        try {

            Users user =
                    userService.findUser(
                            request.getUsername()
                    );

            if (user == null) {

                return new ResponseEntity<>(

                        "Username not found",

                        HttpStatus.BAD_REQUEST
                );
            }

            userService.startForgotPassword(
                    user.getUsername()
            );

            return ResponseEntity.ok(
                    "Reset link sent to your registered email"
            );

        } catch (Exception e) {

            return new ResponseEntity<>(

                    "Something went wrong",

                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @GetMapping("/forgot/verify")
    public ResponseEntity<?> forgotVerify(
            @RequestParam String token
    ) {

        System.out.println(
                "=== FORGOT VERIFY HIT ==="
        );

        userService.verifyEmail(token);

        String redirectUrl =
                frontendUrl
                        + "/forgot-password?token="
                        + token;

        System.out.println(
                "=== REDIRECTING TO: "
                        + redirectUrl
        );

        HttpHeaders headers =
                new HttpHeaders();

        headers.setLocation(
                URI.create(redirectUrl)
        );

        return new ResponseEntity<>(
                headers,
                HttpStatus.FOUND
        );
    }

    @PostMapping("/forgot/complete")
    public ResponseEntity<?> forgotComplete(
            @RequestBody ResetPasswordRequest request
    ) {

        System.out.println(
                "Forgot password process completed......."
        );

        userService.completeForgotPassword(
                request.getToken(),
                request.getNewPassword()
        );

        return ResponseEntity.ok(
                "Password reset successfully"
        );
    }
}