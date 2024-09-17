package com.client_management.clientManagement.Response;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobSheetResponse {
    private boolean status;
    private String message;
}
