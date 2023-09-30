import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

export interface AuthDetails {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AttribValue {
  attribute: string;
  value: any;
}

export interface OCRUploadData {
  userId:       string;
  email:        string;
  doc_type:     string;
  file:         File;
  format:       string;
}