package com.garcia.lus.puttconnect.service;

import com.garcia.lus.puttconnect.domain.Rental;
import com.garcia.lus.puttconnect.repo.RentalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by luisgarcia on 6/23/17.
 */


@Service
public class RentalService
{
    @Autowired
    private RentalRepo rentalRepo;


    public  List<Rental> getAllRentalsByUserId(Integer userId)
    {
        List<Rental> rentals = new ArrayList<>();
        rentalRepo.findByUserId(userId).forEach(rentals::add);
        return rentals;
    }

    public List<Rental> getAllRentals()
    {
        List<Rental> rentals = new ArrayList<>();
        rentals = (List<Rental>) rentalRepo.findAll();
        return rentals;
    }



    public Rental getRentalById(Integer id)
    {
        return rentalRepo.findOne(id);
    }

    public void addRental(Rental rental)
    {
        rentalRepo.save(rental);
    }

    public void updateRental(Rental rental)
    {
        rentalRepo.save(rental);
    }

    public void deleteRental(Integer id)
    {
        rentalRepo.delete(id);
    }

    public boolean exists(Rental rental)
    {
        return getRentalById(rental.getItemId()) != null;
    }
}