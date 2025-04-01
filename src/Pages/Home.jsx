import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
    let navigate = useNavigate();
    let [city, setCity] = useState(["Surat", "Mumbai", "Ahmedabad", "Baroda"]);
    let [hobby, setHobby] = useState([]);
    let [image, setImage] = useState(null);

    const [formdata, setFormdata] = useState(() => {
        const data = localStorage.getItem("formdata");
        return data ? JSON.parse(data) : { name: "", email: "", password: "", gender: "", hobby: [], city: "", newImage: "" };
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        
        if (name === "newImage") {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setFormdata({ ...formdata, newImage: reader.result });
            }
            reader.readAsDataURL(file);
        }

        if (name === "hobby") {
            let ho = [...hobby];
            if (e.target.checked) {
                ho.push(e.target.value);
            } else {
                ho = ho.filter((v) => v !== e.target.value);
            }
            setHobby(ho);
            setFormdata({ ...formdata, hobby: ho });
        } else if (name === "city") {
            setFormdata({ ...formdata, city: value });
        } else {
            setFormdata({ ...formdata, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingData = JSON.parse(localStorage.getItem("formdataList") || "[]");
        const updatedData = [...existingData, formdata];
        localStorage.setItem("formdataList", JSON.stringify(updatedData));
        
        setFormdata({ name: "", email: "", password: "", gender: "", hobby: [], city: "", newImage: "" });
        setHobby([]);
        setCity([]);
        toast.success("Record Inserted Successfully");
        navigate("/show");
    };

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Home Page</h1>
            <form method='post' onSubmit={handleSubmit}>
                <table border={1} align='center'>
                    <tr>
                        <td>Name :</td>
                        <td>
                            <input
                                type='text'
                                placeholder='Enter Your Name'
                                name='name'
                                value={formdata.name}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Email :</td>
                        <td>
                            <input
                                type='email'
                                placeholder='Enter Your Email'
                                name='email'
                                value={formdata.email}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Password :</td>
                        <td>
                            <input
                                type='password'
                                placeholder='Enter Your Pass'
                                name='password'
                                value={formdata.password}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Select Gender :</td>
                        <td>
                            <input
                                type="radio"
                                name='gender'
                                value="male"
                                onChange={handleChange}
                                checked={formdata.gender === "male"}
                            />Male
                            <input
                                type="radio"
                                name='gender'
                                value="female"
                                onChange={handleChange}
                                checked={formdata.gender === "female"}
                            />Female
                        </td>
                    </tr>

                    <tr>
                        <td>Hobby</td>
                        <td>
                            <input
                                type="checkbox"
                                name='hobby'
                                value="Writing"
                                onChange={handleChange}
                                checked={hobby.includes("Writing")}
                            />Writing
                            <input
                                type="checkbox"
                                name='hobby'
                                value="Coding"
                                onChange={handleChange}
                                checked={hobby.includes("Coding")}
                            />Coding
                            <input
                                type="checkbox"
                                name='hobby'
                                value="Reading"
                                onChange={handleChange}
                                checked={hobby.includes("Reading")}
                            />Reading
                        </td>
                    </tr>

                    <tr>
                        <td>Select City</td>
                        <td>
                            <select name="city" onChange={handleChange} value={formdata.city}>
                                <option value="">--select city--</option>
                                {city.map((v, i) => (
                                    <option key={i} value={v}>{v}</option>
                                ))}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Upload Image</td>
                        <td>
                            <input type="file" name='newImage' onChange={handleChange} />
                            {image && <img src={image} height="100" alt="Preview" />}
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <button type='submit'>Submit</button>
                        </td>
                    </tr>
                </table>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Home;
