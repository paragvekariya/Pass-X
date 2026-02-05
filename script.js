const secretKey = "MySecretKey123";  
let tb = document.querySelector("table");

function loadData() {
    let data = localStorage.getItem("passwords");

    if (data == null || JSON.parse(data).length === 0) {
        tb.innerHTML += "<tr><td colspan='4'>No data to show</td></tr>";
    } else {
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            let decryptedPassword = CryptoJS.AES.decrypt(element.password, secretKey).toString(CryptoJS.enc.Utf8);
            str += `<tr>
                <td>${element.website}</td>
                <td>${element.username}</td>
                <td>${decryptedPassword}</td>
                <td><button onclick="deletePassword(${index})">Delete</button></td>
            </tr>`;
        }
        tb.innerHTML += str;
    }
}

document.querySelector(".btn").addEventListener("click", () => {
    let website = document.querySelector("input[name='website']");
    let username = document.querySelector("input[name='username']");
    let password = document.querySelector("input[name='password']");

    if (website.value === "" || username.value === "" || password.value === "") {
        alert("Please fill all fields.");
        return;
    }

    let encryptedPassword = CryptoJS.AES.encrypt(password.value, secretKey).toString();

    let passwords = localStorage.getItem("passwords");
    if (passwords == null) {
        let json = [];
        json.push({
            website: website.value,
            username: username.value,
            password: encryptedPassword,
        });
        localStorage.setItem("passwords", JSON.stringify(json));
    } else {
        let json = JSON.parse(passwords);
        json.push({
            website: website.value,
            username: username.value,
            password: encryptedPassword,
        });
        localStorage.setItem("passwords", JSON.stringify(json));
    }

    alert("Password saved successfully!");
    location.reload();
});

function deletePassword(index) {
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    passwords.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    location.reload();
}

function generatePassword() {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 12; i++){
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.querySelector("input[name='password']").value = password;
}

function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

loadData();
