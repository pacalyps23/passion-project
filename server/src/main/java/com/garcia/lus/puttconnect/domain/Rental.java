package com.garcia.lus.puttconnect.domain;

import javax.persistence.*;

/**
 * Created by luisgarcia on 6/20/17.
 */

@Entity
public class Rental
{
//    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    int id;
    String title;
    String itemDescription;
    double itemAmount;

    @ManyToOne
    private User user;

    public Rental(int id, String title, String itemDescription, double itemAmount, Integer userID)
    {
        this.id = id;
        this.title = title;
        this.itemDescription = itemDescription;
        this.itemAmount = itemAmount;
        this.user = new User(userID, "", "", "", "", "", 0, "");
    }

    public Rental()
    {
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public int getItemId()
    {
        return id;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public void setItemId(int id)
    {
        this.id = id;
    }

    public String getItemDescription()
    {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription)
    {
        this.itemDescription = itemDescription;
    }

    public double getItemAmount()
    {
        return itemAmount;
    }

    public void setItemAmount(double itemAmount)
    {
        this.itemAmount = itemAmount;
    }
}