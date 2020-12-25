package com.akromo.spring_boot_mvc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@ComponentScan(basePackages={"com.akromo"})
@EnableJpaRepositories(basePackages="com.akromo.dao")
@EnableTransactionManagement
@EntityScan(basePackages="com.akromo.models")
@SpringBootApplication
public class SpringBootMvcApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootMvcApplication.class, args);
    }
}
