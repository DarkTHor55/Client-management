package com.client_management.clientManagement;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public class jobsheetRequest {

    @NotBlank(message = "Client name is mandatory")
    private String clientName;

    @NotBlank(message = "Contact info is mandatory")
    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Invalid contact info")
    private String contactInfo;

    @NotNull(message = "Receive date is mandatory")
    private LocalDate receiveDate;

    @NotBlank(message = "Inventory received field cannot be blank")
    private String inventoryReceive;

    private byte[] inventoryImgDoc;

    @NotBlank(message = "Report issue cannot be blank")
    private String reportIssue;

    private String clientNotes;

    @NotBlank(message = "Assigned technician is mandatory")
    private String assignedTechnician;

    @NotNull(message = "Deadline is mandatory")
    private LocalDate deadline;

    @Positive(message = "Price must be positive")
    private double price;

    @NotBlank(message = "Status is mandatory")
    @Pattern(regexp = "^(Pending|In Progress|Completed|Cancelled)$", message = "Invalid status")
    private String status;

}
