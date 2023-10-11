import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OCRUploadData } from "src/app/shared/entity/entity";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) { }

  pdfAccessibilityCheck(file: File, email: string, userId: string) {
    let headers = new HttpHeaders({
      "Access-Control-Allow-Origin" : "*",
      "Accept": "*/*",
      "Content-Type": "multipart/form-data"
    });

    let formData: any = new FormData();
    formData.append('email', email);
    formData.append('file', file);
    formData.append('userId', userId);
    try {
      this.http.post(`${environment.pythonServer}/autotag_pdf2`, formData).subscribe({next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }});
    }
    catch(err) {      
      console.log(err);
    }
  }

  getPDFResultsByUserId(userId: string) {
    const url = environment.baseUrl + '/autotag/user/' + userId + '/pdf';
    return this.http.get(url);
  }

  pdfAccessibilityCheckOCR(uploadData: OCRUploadData) {
    let headers = new HttpHeaders({
      "Access-Control-Allow-Origin" : "*",
      "Accept": "*/*",
      "Content-Type": "multipart/form-data"
    });

    let formData: any = new FormData();
    formData.append('userId', uploadData.userId);
    formData.append('email', uploadData.email);
    formData.append('doc_type', uploadData.doc_type);
    formData.append('file', uploadData.file);
    formData.append('format', uploadData.format);
    try {
      this.http.post(`${environment.pythonServer}/autotag_pdf_ocr`, formData).subscribe({next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }});
    }
    catch(err) {      
      console.log(err);
    }
  }

  checkS3ObjectPresence(url: string, id: string, email: string) {
    const body = {
      id: id,
      url: url,
      email: email,
    }
    return this.http.post(`${environment.pythonServer}/check_s3_object_presence`, body)
  }
}
