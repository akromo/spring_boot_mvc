package com.akromo.dao;


import com.akromo.models.Role;
import com.akromo.models.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;


@Repository
public class UserDaoImp implements UserDao {

    @PersistenceContext(unitName = "entityManagerFactory")
    private EntityManager entityManager;

    @Override
    public void add(User user) {
        entityManager.persist(user);
    }

    @Override
    public User getUser(Long id) {
        User user = entityManager.find(User.class, id);
        return user;
    }

    @Override
    public User getUserByName(String name) {
        User user = (User) entityManager.createQuery("from User where username = :name")
                .setParameter("name", name).getSingleResult();
        return user;
    }

    @Override
    public void updateUser(User user) {
        User updatingUser = entityManager.find(User.class, user.getId());
        updatingUser.setEmail(user.getEmail());
        updatingUser.setUsername(user.getUsername());
        updatingUser.setPassword(user.getPassword());
        updatingUser.setRoles(user.getRoles());
    }

    @Override
    public void remove(long id) {
        entityManager.createQuery("DELETE from User where id = :id").setParameter("id", id).executeUpdate();
    }

    @Override
    public List<User> listUsers() {
        Query query = entityManager.createQuery("from User");
        List<User> users = query.getResultList();
        return users;
    }

    @Override
    public List<Role> getAllRoles() {
        Query query = entityManager.createQuery("from Role");
        List<Role> roles = query.getResultList();
        return roles;
    }

    @Override
    public Role getRoleByName(String name) {
        Role role = (Role) entityManager.createQuery("from Role where name = :name")
                .setParameter("name", name).getSingleResult();
        return role;
    }
}
