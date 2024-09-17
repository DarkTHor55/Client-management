package com.client_management.clientManagement.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Table(name = "job_sheet")
public class JobSheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clientId;
    private String clientName;
    private String contactInfo;
    private LocalDate receiveDate;
    private String inventoryReceive;
    @Column(length = 999999)
    private byte[] inventoryImgDoc;
    private String reportIssue;
    private String clientNotes;
    private String assignedTechnician;
    private LocalDate deadline;
    private double price;
    private String status;

}
