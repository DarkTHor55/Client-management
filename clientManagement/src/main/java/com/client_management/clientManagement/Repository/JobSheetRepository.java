package com.client_management.clientManagement.Repository;

import com.client_management.clientManagement.Model.JobSheet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobSheetRepository extends JpaRepository<JobSheet,Long> {
}
