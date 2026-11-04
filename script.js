
const defaultDonors = [
    {
        name: "Ahmed Khan",
        blood: "O+",
        city: "Karachi",
        phone: "03001234567"
    },
    {
        name: "Sara Ali",
        blood: "A+",
        city: "Lahore",
        phone: "03001234568"
    },
    {
        name: "Usman Ahmed",
        blood: "B+",
        city: "Karachi",
        phone: "03001234569"
    },
    {
        name: "Fatima Noor",
        blood: "AB+",
        city: "Islamabad",
        phone: "03001234560"
    },
    {
        name: "Hassan Raza",
        blood: "O-",
        city: "Lahore",
        phone: "03001234561"
    },
    {
        name: "Ayesha Malik",
        blood: "B-",
        city: "Karachi",
        phone: "03001234562"
    }
];

let donors;

try {
    donors = JSON.parse(
        localStorage.getItem("bloodDonors")
    );

    if (!Array.isArray(donors)) {
        donors = [...defaultDonors];
    }
} catch {
    donors = [...defaultDonors];
}

function saveDonors() {
    localStorage.setItem(
        "bloodDonors",
        JSON.stringify(donors)
    );
}

function renderDonors(list = donors) {
    const donorList = document.getElementById("donorList");
    const noResults = document.getElementById("noResults");

    donorList.replaceChildren();

    noResults.hidden = list.length > 0;

    list.forEach(donor => {
        const card = document.createElement("article");
        card.className = "donor-card";

        const group = document.createElement("div");
        group.className = "blood-group";
        group.textContent = donor.blood;

        const name = document.createElement("h3");
        name.textContent = donor.name;

        const city = document.createElement("p");
        city.textContent = "📍 " + donor.city;

        const phone = document.createElement("p");
        phone.textContent = "📞 " + donor.phone;

        card.append(group, name, city, phone);
        donorList.appendChild(card);
    });

    document.getElementById("donorCount").textContent =
        donors.length;
}

function searchDonors() {
    const blood = document.getElementById("bloodFilter").value;
    const city = document.getElementById("cityFilter")
        .value.trim().toLowerCase();

    const filtered = donors.filter(donor => {
        return (
            (!blood || donor.blood === blood) &&
            (!city || donor.city.toLowerCase().includes(city))
        );
    });

    renderDonors(filtered);
}

document.getElementById("bloodFilter")
    .addEventListener("change", searchDonors);

document.getElementById("cityFilter")
    .addEventListener("input", searchDonors);

// Donor registration

document.getElementById("donorForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const blood = document.getElementById("blood").value;
        const city = document.getElementById("city").value.trim();

        const message = document.getElementById("message");

        if (!name || !phone || !blood || !city) {
            message.style.color = "red";
            message.textContent = "Please complete all fields.";
            return;
        }

        const newDonor = {
            name,
            phone,
            blood,
            city
        };

        donors.push(newDonor);
        saveDonors();

        message.style.color = "green";
        message.textContent =
            "Registration successful! Thank you for joining.";

        this.reset();

        renderDonors();
    });

renderDonors();
