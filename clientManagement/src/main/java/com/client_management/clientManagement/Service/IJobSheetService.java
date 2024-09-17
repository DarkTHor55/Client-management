package com.client_management.clientManagement.Service;

import com.client_management.clientManagement.Model.JobSheet;
import com.client_management.clientManagement.Request.JobsheetRequest;

import java.io.IOException;
import java.util.List;

public interface IJobSheetService {
    JobSheet createJobSheet(final JobsheetRequest jobSheet)throws IOException;
    List<JobSheet> allJobSheets();
    JobSheet updateJobSheet(final long clientId,final JobsheetRequest jobSheet)throws IOException ;
    boolean deleteJobSheet(final long clientId);
    JobSheet getJobSheetById(final long clientId);
}
