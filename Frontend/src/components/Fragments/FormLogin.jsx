import { useNavigate } from "react-router-dom"
import InputForm from "../Elements/Input/InputForm"
import Button from "../Elements/Buttons/Button"
const FormLogin = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        console.log('login clicked');
        const form = document.getElementById("login");
        const formData = new FormData(form);
        // Log formData entries
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }
        if (formData.get("email") === "admin@gmail.com" && formData.get("password") === "admin") {
            alert("login sebagai admin")
            navigate("/dashboard");
        } else {
            const data = {
                email: formData.get("email"),
                password: formData.get("password"),
            }
            fetch("http://localhost:3000/api/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => {
                if (!response.ok) {
                  // Tangani error berdasarkan status HTTP
                  return response.json().then((error) => {
                    throw new Error(error.message || 'Login failed');
                  });
                }
                return response.json();
              })
              .then((data) => {
                console.log("Success:", data);
                localStorage.setItem('userId', data.payload.data.id);
                navigate("/groq");
              })
              .catch((error) => {
                console.error("Error:", error);
                alert(error.message + "!! Periksa kembali email dan password anda, atau Register dahulu jika belum memiliki akun"); // Tampilkan pesan error kepada pengguna
              });
        }
    }
    return (
        <form action="" id="login">
            <InputForm label="Email" type="email" placeholder="example@gmail.com" name= "email"/>
            <InputForm label="Password" type="password" placeholder="********" name= "password"/>
            <Button variant="bg-blue-500 hover:bg-blue-700 w-full" onClick={handleLogin}>Login</Button>
          </form>
    )
}
export default FormLogin