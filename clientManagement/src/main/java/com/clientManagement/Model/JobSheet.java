package com.clientManagement.Model;

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
    private byte[] inventoryImgDoc;
    private String reportIssue;
    private String clientNotes;
    private String assignedTechnician;
    private LocalDate deadline;
    private double price;
    private String status;

}
