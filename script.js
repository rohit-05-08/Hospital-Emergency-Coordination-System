
// =============================================
// CARECONNECT - HOSPITAL EMERGENCY COORDINATION
// MAIN JAVASCRIPT FILE
// =============================================


// 1. HOSPITAL BED INFORMATION

const beds = Array.from(
    { length: 12 },
    (_, index) => `B-${String(index + 1).padStart(2, "0")}`
);


// 2. SAMPLE PATIENT RECORDS
// All records below are fictional.

const samplePatients = [

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
        bedId: "B-01",
        createdAt: Date.now() - 4000
    },

    {
        id: "HEC002",
        name: "Aman Verma",
        age: 32,
        contact: "9876543211",
        emergencyType: "Injury",
        symptoms: "Arm injury",
        priority: "Medium",
        department: "Orthopedics",
        status: "Waiting",
        bedId: null,
        createdAt: Date.now() - 3000
    },

    {
        id: "HEC003",
        name: "Priya Singh",
        age: 21,
        contact: "9876543212",
        emergencyType: "Fever",
        symptoms: "High fever",
        priority: "Low",
        department: "General",
        status: "Discharged",
        bedId: null,
        createdAt: Date.now() - 2000
    },

    {
        id: "HEC004",
        name: "Karan Kumar",
        age: 45,
        contact: "9876543213",
        emergencyType: "Heart Problem",
        symptoms: "Chest discomfort",
        priority: "Critical",
        department: "Cardiology",
        status: "Under Treatment",
        bedId: "B-02",
        createdAt: Date.now() - 1000
    }

];


// 3. LOAD PATIENT RECORDS

function loadPatients() {

    try {

        const savedData = localStorage.getItem("careconnectPatients");

        if (savedData === null) {
            return [...samplePatients];
        }

        const parsedData = JSON.parse(savedData);

        if (!Array.isArray(parsedData)) {
            return [...samplePatients];
        }

        return parsedData;

    } catch (error) {

        console.error("Error loading patient records:", error);

        return [...samplePatients];

    }

}


let patients = loadPatients();


// 4. SAVE PATIENT RECORDS

function savePatients() {

    try {

        localStorage.setItem(
            "careconnectPatients",
            JSON.stringify(patients)
        );

        return true;

    } catch (error) {

        console.error("Error saving patient records:", error);

        showToast("Unable to save records in this browser.");

        return false;

    }

}


// 5. GENERATE UNIQUE PATIENT ID

function generatePatientID() {

    let newID;

    do {

        newID = "HEC" + Date.now() +
            Math.floor(Math.random() * 1000);

    } while (
        patients.some(patient => patient.id === newID)
    );

    return newID;

}


// 6. CHECK AVAILABLE BEDS

function getAvailableBeds() {

    return beds.filter(bed => {

        return !patients.some(patient =>
            patient.bedId === bed &&
            patient.status !== "Discharged"
        );

    });

}


// 7. CHECK OCCUPIED BEDS

function getOccupiedBeds() {

    return beds.filter(bed =>
        !getAvailableBeds().includes(bed)
    );

}


// 8. UPDATE DASHBOARD STATISTICS

function updateDashboard() {

    const activePatients = patients.filter(
        patient => patient.status !== "Discharged"
    );

    const total = patients.length;

    const critical = activePatients.filter(
        patient => patient.priority === "Critical"
    ).length;

    const treatment = patients.filter(
        patient => patient.status === "Under Treatment"
    ).length;

    const available = getAvailableBeds().length;


    document.getElementById("totalPatients").textContent = total;

    document.getElementById("criticalPatients").textContent = critical;

    document.getElementById("availableBeds").textContent = available;

    document.getElementById("treatmentPatients").textContent = treatment;


    // PRIORITY COUNTS

    const criticalCount = activePatients.filter(
        patient => patient.priority === "Critical"
    ).length;

    const mediumCount = activePatients.filter(
        patient => patient.priority === "Medium"
    ).length;

    const lowCount = activePatients.filter(
        patient => patient.priority === "Low"
    ).length;


    document.getElementById("criticalCount").textContent = criticalCount;

    document.getElementById("mediumCount").textContent = mediumCount;

    document.getElementById("lowCount").textContent = lowCount;


    // PRIORITY PROGRESS BARS

    const maxCount = Math.max(
        criticalCount,
        mediumCount,
        lowCount,
        1
    );

    document.getElementById("criticalBar").style.width =
        (criticalCount / maxCount * 100) + "%";

    document.getElementById("mediumBar").style.width =
        (mediumCount / maxCount * 100) + "%";

    document.getElementById("lowBar").style.width =
        (lowCount / maxCount * 100) + "%";

}


// 9. CREATE TABLE CELL

function createCell(value) {

    const cell = document.createElement("td");

    cell.textContent = value ?? "—";

    return cell;

}


// 10. CREATE PRIORITY LABEL

function createPriorityLabel(priority) {

    const label = document.createElement("span");

    label.className =
        "priority " + priority.toLowerCase();

    label.textContent = priority;

    return label;

}


// 11. CREATE STATUS LABEL

function createStatusLabel(status) {

    const label = document.createElement("span");

    label.className = "status-label";

    if (status === "Waiting") {

        label.classList.add("status-waiting");

    } else if (status === "Under Treatment") {

        label.classList.add("status-treatment");

    } else {

        label.classList.add("status-discharged");

    }

    label.textContent = status;

    return label;

}


// 12. DISPLAY RECENT PATIENTS

function displayRecentPatients() {

    const table = document.getElementById("recentPatientsTable");

    table.innerHTML = "";

    const recentPatients = [...patients]
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5);


    if (recentPatients.length === 0) {

        const row = document.createElement("tr");

        const cell = createCell("No patient records available.");

        cell.colSpan = 6;

        cell.className = "empty-message";

        row.appendChild(cell);

        table.appendChild(row);

        return;

    }


    recentPatients.forEach(patient => {

        const row = document.createElement("tr");

        row.appendChild(createCell(patient.id));

        row.appendChild(createCell(patient.name));

        row.appendChild(createCell(patient.age));


        const priorityCell = document.createElement("td");

        priorityCell.appendChild(
            createPriorityLabel(patient.priority)
        );

        row.appendChild(priorityCell);


        row.appendChild(createCell(patient.department));


        const statusCell = document.createElement("td");

        statusCell.appendChild(
            createStatusLabel(patient.status)
        );

        row.appendChild(statusCell);

        table.appendChild(row);

    });

}


// 13. DISPLAY ALL PATIENTS

function displayPatients() {

    const table = document.getElementById("patientTable");

    table.innerHTML = "";


    const search = document.getElementById("searchPatient")
        .value.toLowerCase().trim();

    const priorityFilter =
        document.getElementById("filterPriority").value;

    const statusFilter =
        document.getElementById("filterStatus").value;


    const filteredPatients = patients.filter(patient => {

        const matchesSearch =
            patient.name.toLowerCase().includes(search) ||
            patient.id.toLowerCase().includes(search);

        const matchesPriority =
            !priorityFilter ||
            patient.priority === priorityFilter;

        const matchesStatus =
            !statusFilter ||
            patient.status === statusFilter;

        return matchesSearch &&
            matchesPriority &&
            matchesStatus;

    });


    filteredPatients.forEach(patient => {

        const row = document.createElement("tr");


        // PATIENT INFORMATION

        row.appendChild(createCell(patient.id));

        row.appendChild(createCell(patient.name));

        row.appendChild(createCell(patient.age));


        // PRIORITY

        const priorityCell = document.createElement("td");

        priorityCell.appendChild(
            createPriorityLabel(patient.priority)
        );

        row.appendChild(priorityCell);


        row.appendChild(createCell(patient.department));


        // BED SELECTION

        const bedCell = document.createElement("td");

        const bedSelect = document.createElement("select");

        bedSelect.className = "action-select";

        bedSelect.dataset.action = "bed";

        bedSelect.dataset.id = patient.id;


        const currentBedOption = document.createElement("option");

        currentBedOption.value = "";

        currentBedOption.textContent =
            patient.bedId ? patient.bedId : "Select bed";

        currentBedOption.selected = true;

        bedSelect.appendChild(currentBedOption);


        // Include currently allocated bed and all free beds.

        const possibleBeds = getAvailableBeds();

        if (
            patient.bedId &&
            !possibleBeds.includes(patient.bedId)
        ) {
            possibleBeds.unshift(patient.bedId);
        }


        possibleBeds.forEach(bed => {

            const option = document.createElement("option");

            option.value = bed;

            option.textContent = bed;

            bedSelect.appendChild(option);

        });


        bedSelect.disabled = patient.status === "Discharged";

        bedCell.appendChild(bedSelect);

        row.appendChild(bedCell);


        // STATUS SELECTION

        const statusCell = document.createElement("td");

        const statusSelect = document.createElement("select");

        statusSelect.className = "action-select";

        statusSelect.dataset.action = "status";

        statusSelect.dataset.id = patient.id;


        ["Waiting", "Under Treatment", "Discharged"]
            .forEach(status => {

                const option = document.createElement("option");

                option.value = status;

                option.textContent = status;

                if (patient.status === status) {
                    option.selected = true;
                }

                statusSelect.appendChild(option);

            });


        statusCell.appendChild(statusSelect);

        row.appendChild(statusCell);


        // ACTION BUTTONS

        const actionCell = document.createElement("td");

        const allocateButton = document.createElement("button");

        allocateButton.textContent =
            patient.bedId ? "Allocated" : "Allocate";

        allocateButton.className = "action-button";

        allocateButton.dataset.action = "allocate";

        allocateButton.dataset.id = patient.id;

        allocateButton.disabled =
            patient.status === "Discharged" ||
            Boolean(patient.bedId);

        actionCell.appendChild(allocateButton);


        const dischargeButton = document.createElement("button");

        dischargeButton.textContent = "Discharge";

        dischargeButton.className = "action-button danger";

        dischargeButton.dataset.action = "discharge";

        dischargeButton.dataset.id = patient.id;

        dischargeButton.disabled =
            patient.status === "Discharged";

        actionCell.appendChild(dischargeButton);


        row.appendChild(actionCell);

        table.appendChild(row);

    });


    document.getElementById("patientCount").textContent =
        "Showing " + filteredPatients.length +
        " of " + patients.length + " patients";


    if (filteredPatients.length === 0) {

        const row = document.createElement("tr");

        const cell = createCell(
            "No matching patient records found."
        );

        cell.colSpan = 8;

        cell.className = "empty-message";

        row.appendChild(cell);

        table.appendChild(row);

    }

}


// 14. PATIENT REGISTRATION

const registrationForm =
    document.getElementById("registrationForm");


registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name = document.getElementById("patientName")
        .value.trim();

    const age = Number(
        document.getElementById("patientAge").value
    );

    const contact = document.getElementById("patientContact")
        .value.trim();

    const emergencyType = document.getElementById("emergencyType")
        .value;

    const priority = document.getElementById("patientPriority")
        .value;

    const department = document.getElementById("patientDepartment")
        .value;

    const symptoms = document.getElementById("patientSymptoms")
        .value.trim();


    // INPUT VALIDATION

    if (
        !name ||
        !Number.isInteger(age) ||
        age < 1 ||
        age > 120 ||
        !/^[0-9]{10}$/.test(contact) ||
        !emergencyType ||
        !priority ||
        !department ||
        !symptoms
    ) {

        showToast("Please enter valid information in all fields.");

        return;

    }


    // CREATE NEW PATIENT OBJECT

    const newPatient = {

        id: generatePatientID(),

        name: name,

        age: age,

        contact: contact,

        emergencyType: emergencyType,

        symptoms: symptoms,

        priority: priority,

        department: department,

        status: "Waiting",

        bedId: null,

        createdAt: Date.now()

    };


    patients.push(newPatient);


    if (!savePatients()) {

        patients.pop();

        return;

    }


    registrationForm.reset();

    refreshApplication();

    showToast(
        "Patient registered successfully: " + newPatient.id
    );

    showSection("patients");

});


// 15. ALLOCATE HOSPITAL BED

function allocateBed(patientID, bedID) {

    const patient = patients.find(
        item => item.id === patientID
    );

    if (!patient) {

        showToast("Patient record not found.");

        return;

    }

    if (patient.status === "Discharged") {

        showToast("Cannot allocate a bed to a discharged patient.");

        return;

    }

    if (patient.bedId) {

        showToast("This patient already has an allocated bed.");

        return;

    }

    if (!getAvailableBeds().includes(bedID)) {

        showToast("This bed is not available.");

        return;

    }


    const previousBed = patient.bedId;

    patient.bedId = bedID;


    if (!savePatients()) {

        patient.bedId = previousBed;

        return;

    }


    refreshApplication();

    showToast("Bed " + bedID + " allocated successfully.");

}


// 16. UPDATE PATIENT TREATMENT STATUS

function updatePatientStatus(patientID, newStatus) {

    const patient = patients.find(
        item => item.id === patientID
    );

    if (!patient) {

        showToast("Patient record not found.");

        return;

    }


    const previousStatus = patient.status;

    const previousBed = patient.bedId;


    // Treatment requires an allocated bed.

    if (
        newStatus === "Under Treatment" &&
        !patient.bedId
    ) {

        showToast("Please allocate a bed before treatment.");

        displayPatients();

        return;

    }


    // Discharge releases the allocated bed.

    if (newStatus === "Discharged") {

        patient.bedId = null;

    }


    patient.status = newStatus;


    if (!savePatients()) {

        patient.status = previousStatus;

        patient.bedId = previousBed;

        return;

    }


    refreshApplication();

    showToast("Patient status updated successfully.");

}


// 17. HANDLE PATIENT TABLE ACTIONS

document.getElementById("patientTable")
    .addEventListener("change", function(event) {

        const action = event.target.dataset.action;

        const patientID = event.target.dataset.id;


        if (action === "status") {

            updatePatientStatus(
                patientID,
                event.target.value
            );

        }

    });


document.getElementById("patientTable")
    .addEventListener("click", function(event) {

        const button = event.target.closest("button");

        if (!button) {
            return;
        }


        const action = button.dataset.action;

        const patientID = button.dataset.id;

        const patient = patients.find(
            item => item.id === patientID
        );

        if (!patient) {
            return;
        }


        // BED ALLOCATION

        if (action === "allocate") {

            const row = button.closest("tr");

            const bedSelect = row.querySelector(
                'select[data-action="bed"]'
            );

            const selectedBed = bedSelect.value;


            if (!selectedBed) {

                showToast("Please select an available bed.");

                return;

            }


            allocateBed(patientID, selectedBed);

        }


        // PATIENT DISCHARGE

        if (action === "discharge") {

            const confirmation = confirm(
                "Are you sure you want to discharge " +
                patient.name + "?"
            );


            if (confirmation) {

                updatePatientStatus(
                    patientID,
                    "Discharged"
                );

            }

        }

    });


// 18. DISPLAY BED MANAGEMENT

function displayBeds() {

    const grid = document.getElementById("bedGrid");

    grid.innerHTML = "";


    const available = getAvailableBeds();

    const occupied = getOccupiedBeds();


    beds.forEach(bed => {

        const patient = patients.find(
            item =>
                item.bedId === bed &&
                item.status !== "Discharged"
        );

        const isAvailable = available.includes(bed);

        const card = document.createElement("div");

        card.className = "bed-card " +
            (isAvailable ? "available" : "occupied");


        const heading = document.createElement("strong");

        heading.textContent = bed;


        const description = document.createElement("span");

        description.textContent = isAvailable
            ? "Available"
            : "Occupied by " + patient.name;


        card.appendChild(heading);

        card.appendChild(description);

        grid.appendChild(card);

    });


    document.getElementById("totalBedCount").textContent =
        beds.length;

    document.getElementById("occupiedBedCount").textContent =
        occupied.length;

    document.getElementById("freeBedCount").textContent =
        available.length;

}


// 19. DISPLAY DEPARTMENT INFORMATION

function displayDepartments() {

    const grid = document.getElementById("departmentGrid");

    grid.innerHTML = "";


    const departments = [
        "Emergency",
        "Cardiology",
        "Orthopedics",
        "General",
        "Neurology"
    ];


    departments.forEach(department => {

        const count = patients.filter(patient =>

            patient.department === department &&
            patient.status !== "Discharged"

        ).length;


        const card = document.createElement("div");

        card.className = "department-card";


        const heading = document.createElement("h4");

        heading.textContent = department;


        const number = document.createElement("strong");

        number.textContent = count;


        const description = document.createElement("p");

        description.textContent = "Active patients assigned";


        card.appendChild(heading);

        card.appendChild(number);

        card.appendChild(description);

        grid.appendChild(card);

    });

}


// 20. SEARCH AND FILTER

document.getElementById("searchPatient")
    .addEventListener("input", displayPatients);


document.getElementById("filterPriority")
    .addEventListener("change", displayPatients);


document.getElementById("filterStatus")
    .addEventListener("change", displayPatients);


document.getElementById("clearFilters")
    .addEventListener("click", function() {

        document.getElementById("searchPatient").value = "";

        document.getElementById("filterPriority").value = "";

        document.getElementById("filterStatus").value = "";

        displayPatients();

    });


// 21. PAGE NAVIGATION

function showSection(sectionID) {

    const sections = document.querySelectorAll(".page-section");


    sections.forEach(section => {

        section.classList.remove("active");

    });


    const selectedSection = document.getElementById(sectionID);

    if (!selectedSection) {
        return;
    }

    selectedSection.classList.add("active");


    const links = document.querySelectorAll(".nav-link");


    links.forEach(link => {

        link.classList.remove("active");

        if (link.dataset.section === sectionID) {

            link.classList.add("active");

        }

    });


    const titles = {

        dashboard: "Emergency Dashboard",

        registration: "Patient Registration",

        patients: "Patient Management",

        beds: "Bed Management",

        departments: "Department Overview"

    };


    document.getElementById("pageTitle").textContent =
        titles[sectionID];


    window.location.hash = sectionID;

}


document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        showSection(this.dataset.section);

    });

});


// 22. NOTIFICATION MESSAGE

let toastTimer;


function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// 23. REFRESH ALL APPLICATION SECTIONS

function refreshApplication() {

    updateDashboard();

    displayRecentPatients();

    displayPatients();

    displayBeds();

    displayDepartments();

}


// 24. INITIALIZE APPLICATION

function initializeApplication() {

    refreshApplication();


    const initialSection =
        window.location.hash.substring(1);


    const allowedSections = [

        "dashboard",

        "registration",

        "patients",

        "beds",

        "departments"

    ];


    showSection(

        allowedSections.includes(initialSection)
            ? initialSection
            : "dashboard"

    );


    console.log(
        "CareConnect Emergency Care Coordination System loaded."
    );

}


// START APPLICATION

initializeApplication();

