package in.Rahul.authify.sevice;

import in.Rahul.authify.io.ProfileRequest;
import in.Rahul.authify.io.ProfileResponse;

public interface ProfileService {

    ProfileResponse createProfile(ProfileRequest request);

    ProfileResponse getprofile(String email);

    void sendResetOtp(String email);
    void resetPassword(String email,String otp,String newPassword);

    void sendOtp (String email);
    void verifyOtp(String email,String otp);
    String getLoggedInUserId(String email);
}
