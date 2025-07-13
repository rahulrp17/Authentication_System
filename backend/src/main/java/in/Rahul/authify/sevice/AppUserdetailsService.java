package in.Rahul.authify.sevice;

import in.Rahul.authify.entity.UserEntity;
import in.Rahul.authify.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AppUserdetailsService implements UserDetailsService {


    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      UserEntity existinguser= userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("Email not found "));
      return new User(existinguser.getEmail(),existinguser.getPassword(),new ArrayList<>());


    }
}
