
# CareConnect - Emergency Care Coordination System

## Project Information

- Project Title: Hospital Emergency Coordination System
- Application Name: CareConnect
- Team Name: WebTrio
- Course Code: CSE326
- Team Size: 3 Students
- Technologies: HTML5, CSS3, JavaScript
- Data Storage: Browser localStorage

## 1. Project Overview

CareConnect is a web-based Hospital Emergency Coordination System developed to demonstrate the organization and management of emergency patient information.

The application provides a centralized interface to monitor patient registration, triage priority, bed availability, department assignment and treatment status.

The main objective is to demonstrate how a digital coordination interface can help organize emergency healthcare information and hospital resources.

## 2. Project Objectives

1. Develop a centralized emergency dashboard.
2. Register emergency patients digitally.
3. Classify patients according to triage priority.
4. Allocate and release hospital beds.
5. Assign patients to hospital departments.
6. Update patient treatment status.
7. Search and filter patient records.
8. Store patient records using browser localStorage.

## 3. Main Features

### Emergency Dashboard
- Total patient records
- Critical patient count
- Available hospital beds
- Patients under treatment
- Triage priority overview
- Recent patient records

### Patient Registration
- Patient name
- Age
- Contact number
- Emergency type
- Symptoms and description
- Triage priority
- Department assignment
- Automatic patient ID

### Patient Management
- View patient records
- Search by patient name
- Search by patient ID
- Filter by priority
- Filter by treatment status
- Update patient status
- Discharge patients

### Bed Management
- 12 demonstration beds
- Available bed display
- Occupied bed display
- Bed allocation
- Automatic bed release after discharge
- Prevention of double allocation

### Department Management
- Emergency
- Cardiology
- Orthopedics
- General
- Neurology

### Data Storage
- Patient records saved using localStorage
- Records retained after browser refresh
- Dashboard statistics updated after changes

## 4. Technologies Used

### HTML5
Used to develop the website structure, forms, navigation, tables and dashboard sections.

### CSS3
Used for website styling, responsive layouts, colors, cards and navigation.

### JavaScript
Used for registration, validation, patient management, bed allocation, search, filters and dashboard calculations.

### localStorage
Used to save patient information in the browser.

## 5. Project Structure

    Hospital-Emergency-Coordination-System/

        index.html
        style.css
        script.js
        README.md

## 6. How to Run the Project

1. Install Visual Studio Code.
2. Open the project folder in VS Code.
3. Ensure all four files are present.
4. Open index.html in a web browser.
5. Navigate using the sidebar.

You can also install the Live Server extension.

Right-click index.html and select "Open with Live Server".

No additional package installation is required.

## 7. Sample Data

The application initially includes fictional sample patient records.

Example:

Patient ID: HEC001
Name: Rahul Sharma
Age: 25
Priority: Critical
Department: Emergency
Status: Under Treatment
Bed: B-01

All initial patient information is fictional.

## 8. Data Model

Each patient is represented by a JavaScript object.

Example:

    {
        id: "HEC001",
        name: "Rahul Sharma",
        age: 25,
        contact: "9876543210",
        emergencyType: "Accident",
        symptoms: "Leg injury",
        priority: "Critical",
        department: "Emergency",
        status: "Under Treatment",
        bedId: "B-01"
    }

The application stores patient information as JSON in browser localStorage under:

    careconnectPatients

## 9. Testing Checklist

- Register a new patient.
- Verify automatic patient ID generation.
- Test invalid age.
- Test invalid contact number.
- Check triage priority selection.
- Allocate an available bed.
- Try allocating an occupied bed.
- Update patient status.
- Discharge a patient.
- Verify bed release after discharge.
- Search using patient name.
- Search using patient ID.
- Filter by priority.
- Filter by status.
- Refresh browser and verify saved records.
- Test the website on a mobile screen.

## 10. Team Contributions

### Member 1 - Patient Registration and Triage

Responsibilities:

- Registration form
- Input validation
- Automatic patient ID generation
- Emergency type selection
- Triage priority

### Member 2 - Bed and Department Management

Responsibilities:

- Bed availability
- Bed allocation
- Bed release
- Department assignment
- Treatment status management

### Member 3 - Dashboard and Integration

Responsibilities:

- Dashboard interface
- Patient statistics
- Search and filtering
- localStorage integration
- GitHub and deployment coordination

All team members should understand the complete project.

## 11. Limitations

1. The application uses browser localStorage.
2. Patient records are stored locally.
3. Different computers do not share patient records.
4. The application does not use a central hospital database.
5. It does not provide secure authentication.
6. It does not provide real-time multi-user synchronization.
7. It is an academic demonstration and not a real clinical system.

## 12. Future Scope

- Backend database integration
- Secure login and access control
- Real-time hospital department updates
- Advanced patient reporting
- Notification system
- Database backups
- Improved resource management

## 13. GitHub Setup

1. Create a GitHub account.
2. Create a repository named:

   Hospital-Emergency-Coordination-System

3. Upload index.html.
4. Upload style.css.
5. Upload script.js.
6. Upload README.md.
7. Verify that the repository is accessible.
8. Copy the repository URL for submission.

## 14. Deployment

The website can be deployed using:

- GitHub Pages
- Netlify

After deployment:

1. Open the deployed website.
2. Test patient registration.
3. Test bed allocation.
4. Test patient status updates.
5. Test search and filters.
6. Refresh the browser.
7. Verify that records remain saved.
8. Copy the deployed website URL.

Note: Browser localStorage is specific to the browser and website origin. Records are not automatically synchronized between users.

## 15. Video Presentation

The team presentation should include:

1. Project introduction
2. Problem statement
3. Project objectives
4. Technologies used
5. Dashboard demonstration
6. Patient registration demonstration
7. Triage priority demonstration
8. Bed allocation demonstration
9. Patient status updates
10. Search and filtering
11. Individual team contributions
12. Conclusion

All three team members must participate.

## 16. Academic Integrity

All team members should understand, test and explain the source code.

The application should be presented honestly as an academic healthcare coordination demonstration.

---

Project Title: Hospital Emergency Coordination System

Application Name: CareConnect

Team Name: WebTrio

Course Code: CSE326

