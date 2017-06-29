package com.garcia.lus.puttconnect.repo;

import com.garcia.lus.puttconnect.domain.Rental;
import com.garcia.lus.puttconnect.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by luisgarcia on 6/20/17.
 */

public interface UserRepo extends CrudRepository<User, Integer>
{

}
