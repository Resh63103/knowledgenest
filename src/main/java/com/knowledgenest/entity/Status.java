package com.knowledgenest.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "statuses")
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long statusId;

    private String status;

    @OneToMany(mappedBy = "status", cascade = CascadeType.ALL)
    private List<Book> books;

    // getter・setter
    public Long getStatusId() {
        return statusId;
    }
    public void setStatusId(Long statusId) {
        this.statusId = statusId;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}
