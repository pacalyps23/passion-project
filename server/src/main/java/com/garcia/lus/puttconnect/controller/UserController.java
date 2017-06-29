package com.garcia.lus.puttconnect.controller;

import com.garcia.lus.puttconnect.domain.User;
import com.garcia.lus.puttconnect.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Created by luisgarcia on 6/23/17.
 */

@CrossOrigin("http://localhost:8100")
@RequestMapping("/users")
@RestController
public class UserController
{
    @Autowired
    private UserService userService;
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    @RequestMapping
    public ResponseEntity<List<User>> getAllUser()
    {
        logger.info("get all users");
        List<User> users = userService.getAllUsers();
        if(users == null || users.isEmpty())
        {
            logger.info("no users found");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id)
    {
        logger.info("getting user with id {}", id);
        User user = userService.findUserById(id);
        if(user == null)
        {
            logger.info("user with id {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Void> addUser(@RequestBody User user)
    {
        logger.info("creating new user {}", user);
        if(userService.exists(user))
        {
            logger.info("a user with name " + user.getFirstName() + " already exists");
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        userService.addUser(user);
       return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public ResponseEntity<Void> updateUser(@RequestBody User user, @PathVariable Integer id)
    {
        logger.info("updating user with id {}", user);
        User currentUser = userService.findUserById(id);

        if(currentUser == null)
        {
            logger.info("User with id {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        currentUser.setUserId(user.getUserId());
        currentUser.setFirstName(user.getFirstName());
        currentUser.setLastName(user.getLastName());
        currentUser.setAddress(user.getAddress());
        currentUser.setCity(user.getCity());
        currentUser.setState(user.getState());
        currentUser.setZipcode(user.getZipcode());

        userService.updateUser(user, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "{id}")
    public void deleteUser(@PathVariable Integer id)
    {
        userService.deleteUser(id);
    }

}

