package com.jobportal.entity;

import java.time.LocalDateTime;
import java.util.Base64;

import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.ApplicationStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "job_applicants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Applicant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long applicantId;
	private String name;
	private String email;
	private Long phone;
	private String website;

	@Lob
	@Column(columnDefinition = "LONGBLOB")
	private byte[] resume;

	@Column(columnDefinition = "TEXT")
	private String coverLetter;

	private LocalDateTime timestamp;

	@Enumerated(EnumType.STRING)
	private ApplicationStatus applicationStatus;

	private LocalDateTime interviewTime;

	public ApplicantDTO toDTO() {
		return new ApplicantDTO(
				this.getApplicantId(),
				this.getName(),
				this.getEmail(),
				this.getPhone(),
				this.getWebsite(),
				this.getResume() != null ? Base64.getEncoder().encodeToString(this.getResume()) : null,
				this.getCoverLetter(),
				this.getTimestamp(),
				this.getApplicationStatus(),
				this.interviewTime);
	}
}
