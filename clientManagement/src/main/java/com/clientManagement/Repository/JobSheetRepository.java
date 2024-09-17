package com.clientManagement.Repository;

import com.clientManagement.Model.JobSheet;
import org.springframework.data.jpa.repository.JpaRepository;


public interface JobSheetRepository extends JpaRepository<JobSheet,Long> {
}
