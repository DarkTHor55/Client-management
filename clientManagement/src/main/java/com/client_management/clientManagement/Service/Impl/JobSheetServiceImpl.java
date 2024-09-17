package com.client_management.clientManagement.Service.Impl;

import com.client_management.clientManagement.Repository.JobSheetRepository;
import com.client_management.clientManagement.Model.JobSheet;
import com.client_management.clientManagement.Request.JobsheetRequest;
import com.client_management.clientManagement.Service.IJobSheetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class JobSheetServiceImpl implements IJobSheetService {
    private  final JobSheetRepository jobSheetRepository;
    @Override
    public JobSheet createJobSheet(final JobsheetRequest jobSheet) throws IOException {
        byte[] imgDoc=jobSheet.getInventoryImgDoc().getBytes();
        return jobSheetRepository.save(JobSheet.builder()
                .clientName(jobSheet.getClientName())
                .contactInfo(jobSheet.getContactInfo())
                .receiveDate(jobSheet.getReceiveDate())
                .inventoryReceive(jobSheet.getInventoryReceive())
                .inventoryImgDoc(imgDoc)
                .reportIssue(jobSheet.getReportIssue())
                .clientNotes(jobSheet.getClientNotes())
                .assignedTechnician(jobSheet.getAssignedTechnician())
                .deadline(jobSheet.getDeadline())
                .price(jobSheet.getPrice())
                .status(jobSheet.getStatus())
                .build());
    }

    @Override
    public List<JobSheet> allJobSheets() {
        return jobSheetRepository.findAll();
    }

    @Override
    public JobSheet updateJobSheet(final long clientId ,final JobsheetRequest jobSheet)throws IOException  {
        JobSheet job=jobSheetRepository.findById(clientId).orElse(null);
        if(Objects.isNull(job)){
            return null;
        }else{
            job.setClientName(jobSheet.getClientName());
            job.setContactInfo(jobSheet.getContactInfo());
            job.setReceiveDate(jobSheet.getReceiveDate());
            job.setInventoryReceive(jobSheet.getInventoryReceive());
            job.setInventoryImgDoc(jobSheet.getInventoryImgDoc().getBytes());
            job.setReportIssue(jobSheet.getReportIssue());
            job.setClientNotes(jobSheet.getClientNotes());
            job.setAssignedTechnician(jobSheet.getAssignedTechnician());
            job.setDeadline(jobSheet.getDeadline());
            job.setPrice(jobSheet.getPrice());
            job.setStatus(jobSheet.getStatus());
            return jobSheetRepository.save(job);
        }
    }

    @Override
    public boolean deleteJobSheet(final long clientId) {
        JobSheet jobSheet = jobSheetRepository.findById(clientId).orElse(null);
        if (Objects.isNull(jobSheet)) {
            return false;
        }
        jobSheetRepository.delete(jobSheet);
        return true;
    }

    @Override
    public JobSheet getJobSheetById(final long clientId) {
        return jobSheetRepository.findById(clientId).orElse(null);
    }
}
