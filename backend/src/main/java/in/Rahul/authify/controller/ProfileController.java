package in.Rahul.authify.controller;


import in.Rahul.authify.io.ProfileRequest;
import in.Rahul.authify.io.ProfileResponse;
import in.Rahul.authify.sevice.EmailService;
import in.Rahul.authify.sevice.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private  final EmailService emailService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid  @RequestBody ProfileRequest request){
        ProfileResponse response =profileService.createProfile(request);
        emailService.sendWelcomeEmail(response.getEmail(),response.getName() );
        return response;
    }
    @GetMapping("/profile")
    public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name") String email){
         return profileService.getprofile(email);
    }
}
