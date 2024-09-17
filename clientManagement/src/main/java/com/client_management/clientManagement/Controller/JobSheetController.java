package com.client_management.clientManagement.Controller;

import com.client_management.clientManagement.Model.JobSheet;
import com.client_management.clientManagement.Request.JobsheetRequest;
import com.client_management.clientManagement.Response.JobSheetResponse;
import com.client_management.clientManagement.Service.Impl.JobSheetServiceImpl;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/jobsheet")
@RequiredArgsConstructor
public class JobSheetController {
    public final JobSheetServiceImpl jobSheetService;

    @PostMapping
    public ResponseEntity<JobSheetResponse> createJobSheet(final @ModelAttribute JobsheetRequest jobSheetRequest) throws IOException {
        JobSheet jobSheet = jobSheetService.createJobSheet(jobSheetRequest);
        if (Objects.isNull(jobSheet)){
            return new ResponseEntity<>(JobSheetResponse.builder().status(false).message("Job Sheet Not Created").build(), HttpStatus.BAD_REQUEST);
        }
    return new ResponseEntity<>(JobSheetResponse.builder().status(true).message("Job Sheet Created").build(), HttpStatus.CREATED);
    }
    @GetMapping()
    public ResponseEntity<List<JobSheet>> getAllJobSheets() {
        List<JobSheet>ls=jobSheetService.allJobSheets();
        if(Objects.isNull(ls)){
            return new ResponseEntity<>(new ArrayList<>(),HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ls, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<JobSheet> getJobSheetById(final @PathVariable("id")long clientId) {
        JobSheet jobSheet = jobSheetService.getJobSheetById(clientId);
        if (Objects.isNull(jobSheet)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(jobSheet, HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<JobSheetResponse> updateJobSheet(final @PathVariable("id") long clientId, final @ModelAttribute JobsheetRequest jobSheetRequest)throws IOException  {
        JobSheet updatedJobSheet = jobSheetService.updateJobSheet(clientId, jobSheetRequest);
        if (Objects.isNull(updatedJobSheet)){
            return new ResponseEntity<>(JobSheetResponse.builder().status(false).message("Job Sheet Not Updated").build(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(JobSheetResponse.builder().status(true).message("Job Sheet Updated").build(), HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteJobSheet(final @PathVariable("id") long clientId){
        boolean isDeleted = jobSheetService.deleteJobSheet(clientId);
        if (!isDeleted){
            return new ResponseEntity<>("Job Sheet Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Job Sheet Deleted", HttpStatus.OK);
    }

}
