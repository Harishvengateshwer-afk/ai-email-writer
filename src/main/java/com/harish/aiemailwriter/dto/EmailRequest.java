package com.harish.aiemailwriter.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailRequest {

    private String emailType;
    private String tone;
    private String details;
}