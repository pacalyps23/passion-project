package com.garcia.lus.puttconnect.domain;

import org.hibernate.event.internal.DefaultPersistOnFlushEventListener;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by luisgarcia on 6/20/17.
 */

@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String state;
    private int zipcode;
    private String email;
    private String pass;


    public User(Integer id, String firstName, String lastName, String address, String city, String state, int zipcode, String email, String pass)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.pass = pass;
    }


    public User()
    {
    }

    public Integer getUserId()
    {
        return id;
    }

    public void setUserId(Integer userId)
    {
        this.id = id;
    }

    public String getFirstName()
    {
        return firstName;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public String getLastName()
    {
        return lastName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public String getAddress()
    {
        return address;
    }

    public void setAddress(String address)
    {
        this.address = address;
    }

    public String getCity()
    {
        return city;
    }

    public void setCity(String city)
    {
        this.city = city;
    }

    public String getState()
    {
        return state;
    }

    public void setState(String state)
    {
        this.state = state;
    }

    public Integer getZipcode()
    {
        return zipcode;
    }

    public void setZipcode(Integer zipcode)
    {
        this.zipcode = zipcode;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getPass()
    {
        return pass;
    }

    public void setPass(String pass)
    {
        this.pass = pass;
    }
}

