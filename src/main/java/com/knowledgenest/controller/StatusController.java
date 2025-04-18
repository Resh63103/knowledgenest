package com.knowledgenest.controller;

import com.knowledgenest.entity.Status;
import com.knowledgenest.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/statuses")
public class StatusController {

    @Autowired
    private StatusRepository statusRepository;

    @GetMapping
    public List<Status> getAllStatuses() {
        return statusRepository.findAll();
    }

    @PostMapping
    public Status createStatus(@RequestBody Status status) {
        return statusRepository.save(status);
    }
}
