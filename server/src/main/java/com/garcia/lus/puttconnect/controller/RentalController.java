package com.garcia.lus.puttconnect.controller;

import com.garcia.lus.puttconnect.domain.Rental;
import com.garcia.lus.puttconnect.domain.User;
import com.garcia.lus.puttconnect.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import java.util.List;


/**
 * Created by luisgarcia on 6/23/17.
 */

@CrossOrigin("http://localhost:8100")
@RestController
public class RentalController
{
    public  static final void main(String[] data)
    {
        System.out.println('h');
    }

    @Autowired
    private RentalService rentalService;
    private final Logger log = LoggerFactory.getLogger(RentalController.class);

    @RequestMapping("/users/{userId}/rentals")
    public ResponseEntity<List<Rental>> getAllRentalsByUserId(@PathVariable Integer userId)
    {
        log.info("Getting all rentals by user");
        List<Rental> rentals = rentalService.getAllRentalsByUserId(userId);
        if(rentals == null || rentals.isEmpty())
        {
            log.info("no rentals found");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }

    @RequestMapping("/users/{userID}/rentals/{id}")
    public ResponseEntity<Rental> getRentalById(@PathVariable Integer id)
    {
        log.info("Getting rentals with id #{}", id);
        Rental rentals = rentalService.getRentalById(id);
        if(rentals == null)
        {
            log.info("no rentals found");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }


    @RequestMapping("/users/rentals")
    public ResponseEntity<List<Rental>> getAllRentals()
    {
        log.info("Getting all rentals");
        List<Rental> rentals = rentalService.getAllRentals();
        if(rentals == null || rentals.isEmpty())
        {
            log.info("no rentals found");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/users/{userId}/rentals")
    public ResponseEntity<Void> addRental(@RequestBody Rental rental, @PathVariable Integer userId)
    {
        log.info("creating new rental: {}", rental);
        rental.setUser(new User(userId, "", "", "", "", "", 00000, "", ""));
        rentalService.addRental(rental);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{userId}/rentals/{id}")
    public ResponseEntity<Void> updateRental(@RequestBody Rental rental, @PathVariable Integer userId, @PathVariable Integer id)
    {
        Rental current = rentalService.getRentalById(id);
        current.setTitle(rental.getTitle());
        current.setItemDescription(rental.getItemDescription());
        current.setItemAmount(rental.getItemAmount());
        log.info("updating rental: {}", rental.getItemId());
        rental.setUser(new User(userId, "", "", "", "", "", 00000, "", ""));
        rentalService.updateRental(current);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{userId}/rentals/{id}")
    public ResponseEntity<Void> deleteRental(@PathVariable Integer id)
    {
        log.info("deleting rental # {}", id );
        Rental rental = rentalService.getRentalById(id);
        if(rental == null)
        {
            log.info("unable to delete. Rental # {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else
        {
            rentalService.deleteRental(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }



}