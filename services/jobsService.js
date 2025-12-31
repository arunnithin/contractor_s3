import { API_BASE_URL, getHeaders, apiRequest } from './config';

/**
 * Get all assigned jobs for the contractor
 */
export const getJobs = async () => {
  return await apiRequest('/contractor/jobs');
};

/**
 * Get contractor profile information
 */
export const getProfile = async () => {
  return await apiRequest('/contractor/profile');
};

/**
 * Get job statistics
 */
export const getStats = async () => {
  return await apiRequest('/contractor/stats');
};

/**
 * Update job status
 * @param {string} jobId - The job ID to update
 * @param {string} status - New status: 'assigned', 'in_progress', 'completed', 'verified'
 * @param {string} notes - Optional notes about the status change
 */
export const updateJobStatus = async (jobId, status, notes = '') => {
  return await apiRequest(`/contractor/jobs/${jobId}/status`, {
    method: 'PATCH',
    body: { status, notes },
  });
};

/**
 * Accept a job (change status to in_progress)
 */
export const acceptJob = async (jobId) => {
  return await updateJobStatus(jobId, 'in_progress', 'Job accepted by contractor');
};

/**
 * Reject a job - deletes the assignment from backend
 * @param {string} jobId - The job ID to reject
 * @param {string} reason - Reason for rejection
 */
export const rejectJob = async (jobId, reason = '') => {
  return await apiRequest(`/contractor/jobs/${jobId}`, {
    method: 'DELETE',
    body: { reason },
  });
};

/**
 * Start work on a job
 */
export const startWork = async (jobId, preWorkPhotoUrl = null) => {
  const notes = preWorkPhotoUrl 
    ? `Work started. Pre-work photo: ${preWorkPhotoUrl}`
    : 'Work started';
  return await updateJobStatus(jobId, 'in_progress', notes);
};

/**
 * Complete a job
 * @param {string} jobId - The job ID
 * @param {string} postWorkPhotoUrl - URL of the post-work photo
 * @param {string} notes - Completion notes
 */
export const completeJob = async (jobId, postWorkPhotoUrl = null, notes = '') => {
  const completionNotes = postWorkPhotoUrl 
    ? `Work completed. Post-work photo: ${postWorkPhotoUrl}. ${notes}`
    : `Work completed. ${notes}`;
  return await updateJobStatus(jobId, 'completed', completionNotes);
};

/**
 * Upload work photo (pre or post work)
 * @param {string} jobId - The job ID
 * @param {string} photoUri - Local URI of the photo
 * @param {string} type - 'pre' or 'post'
 */
export const uploadWorkPhoto = async (jobId, photoUri, type = 'pre') => {
  try {
    const headers = await getHeaders();
    
    // Create form data for file upload
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      type: 'image/jpeg',
      name: `${type}_work_${jobId}_${Date.now()}.jpg`,
    });
    formData.append('jobId', jobId);
    formData.append('photoType', type);

    const response = await fetch(`${API_BASE_URL}/contractor/jobs/${jobId}/photo`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Photo upload failed');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Photo upload error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get single job details
 */
export const getJobDetails = async (jobId) => {
  // First get all jobs then find the specific one
  // Or implement a dedicated endpoint if available
  const result = await getJobs();
  if (result.success && result.data.jobs) {
    const job = result.data.jobs.find(j => j.id === parseInt(jobId) || j.id === jobId);
    if (job) {
      return { success: true, data: { job } };
    }
    return { success: false, error: 'Job not found' };
  }
  return result;
};

/**
 * Transform backend job data to app format
 */
export const transformJobToTask = (job) => {
  const dueDateObj = job?.due_date ? new Date(job.due_date) : null;
  const dueDateText = dueDateObj && !Number.isNaN(dueDateObj.getTime())
    ? dueDateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return {
    id: `JOB-${job.id}`,
    dbId: job.id,
    date: new Date(job.assigned_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    time: new Date(job.assigned_at).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    dueDate: dueDateText,
    dueDateRaw: job?.due_date || null,
    preWorkPhotoUrl: job?.pre_work_photo_url || null,
    postWorkPhotoUrl: job?.post_work_photo_url || null,
    latitude: job.latitude,
    longitude: job.longitude,
    location: job.grid_id || 'Location pending',
    priority: getSeverityPriority(job.highest_severity),
    status: transformStatus(job.status),
    accepted: job.status !== 'assigned',
    totalPotholes: job.total_potholes || 0,
    totalPatchy: job.total_patchy || 0,
    notes: job.notes || '',
    aggregatedLocationId: job.aggregated_location_id,
    // For screens that expect these keys
    preWorkPhoto: job?.pre_work_photo_url || null,
    postWorkPhoto: job?.post_work_photo_url || null,
  };
};

/**
 * Convert severity to priority label
 */
const getSeverityPriority = (severity) => {
  switch (severity?.toLowerCase()) {
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
    default:
      return 'Low';
  }
};

/**
 * Transform backend status to app status
 */
const transformStatus = (status) => {
  switch (status?.toLowerCase()) {
    case 'assigned':
      return 'Assigned';
    case 'in_progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'verified':
      return 'Verified';
    default:
      return 'Assigned';
  }
};
