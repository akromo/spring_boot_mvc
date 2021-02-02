package com.akromo.dao;


import com.akromo.models.Man;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Transactional
public class ManDAO {

    @PersistenceContext(unitName = "entityManagerFactory")
    private EntityManager em;

    public void saveMan(Man man) {
        em.persist(man);
    }
}
