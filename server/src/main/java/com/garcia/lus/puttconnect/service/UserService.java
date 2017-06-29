package com.garcia.lus.puttconnect.service;

import com.garcia.lus.puttconnect.domain.User;
import com.garcia.lus.puttconnect.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by luisgarcia on 6/20/17.
 */

@Service
public class UserService
{
    @Autowired
    private UserRepo userRepo;


    public List<User> getAllUsers()
    {
        List<User> users = new ArrayList<>();
        userRepo.findAll().forEach(users::add);
        return users;
    }

    public User findUserById(Integer id)
    {
        return userRepo.findOne(id);
    }

    public void addUser(User user)
    {
        userRepo.save(user);
    }

    public void updateUser(User user, Integer id)
    {
        userRepo.save(user);
    }

    public void deleteUser(Integer id)
    {
        userRepo.delete(id);
    }

    public boolean exists(User user)
    {
        return findUserById(user.getUserId()) != null;
    }
}
