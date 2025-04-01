import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



function Home() {
    let navigate = useNavigate();
    let [city, setCity] = useState(["Surat", "Mumbai", "Ahmedabad", "Baroda"]);
    let [hobby, setHobby] = useState([]);
    let [image, setImage] = useState(null);

    const [formdata, setFormdata] = useState(() => {
        const data = localStorage.getItem("formdata");
        return data ? JSON.parse(data) : { name: "", email: "" , newImage: ""};
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name == "newImage") {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            }
            reader.readAsDataURL(file);
        }

        let ho = [...hobby];
        if (name == 'hobby') {
            if (e.target.checked) {
                ho.push(e.target.value)
            } else {
                ho = ho.filter((v, i) => v !== e.target.value);
            }
        }
        setHobby(ho);

        if (name == 'hobby') {
            setFormdata({ ...formdata, ["hobby"]: ho })
        } else {
            setFormdata({ ...formdata, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formdata.newImage = image;
        const existingData = JSON.parse(localStorage.getItem("formdataList") || "[]");
        const updatedData = [...existingData, formdata];
        localStorage.setItem("formdataList", JSON.stringify(updatedData));
        setFormdata({ name: "", email: "" });
        setHobby([]);
        setCity([]);
        toast.success("Record Inserted Successfully");
        navigate("/show");
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Home Page</h1>
            <form method='post' onSubmit={(e) => handleSubmit(e)}>
                <table border={1} align='center'>
                    <tr>
                        <td>
                            Name :
                        </td>
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
                        <td>
                            Email :
                        </td>
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
                        <td>
                            Password :
                        </td>
                        <td>
                            <input
                                type='password'
                                placeholder='Enter Your Pass'
                                name='password'
                                value={formdata.password ? formdata.password : ""}
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
                                checked={formdata.gender == "male" ? "checked" : ""}
                            />Male
                            <input
                                type="radio"
                                name='gender'
                                value="female"
                                onChange={handleChange}
                                checked={formdata.gender == "female" ? "checked" : ""}
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
                                checked={hobby.includes("Writing") ? "checked" : ""}
                            />Writing
                            <input
                                type="checkbox"
                                name='hobby'
                                value="Coding"
                                onChange={handleChange}
                                checked={hobby.includes("Coding") ? "checked" : ""}
                            />Coding
                            <input
                                type="checkbox"
                                name='hobby'
                                value="Reading"
                                onChange={handleChange}
                                checked={hobby.includes("Reading") ? "checked" : ""}
                            />Reading
                        </td>
                    </tr>

                    <tr>
                        <td>Select City</td>
                        <td>
                            <select name="city" onChange={(e) => handleChange(e)}>
                                <option value="">--select city--</option>
                                {city.map((v, i) => {
                                    return <option value={v}>{v}</option>;
                                })}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Select Image</td>
                        <td>
                            <input type="text" name='image' onChange={handleChange} />
                        </td>
                    </tr>

                    <tr>
                        <td>Upload Image</td>
                        <td>
                            <input type="file" name='newImage' onChange={handleChange} />
                            <img src={image} height="100" />
                        </td>
                    </tr>

                    <tr>
                        <td>

                        </td>
                        <td>
                            <button type='submit'>Submit</button>
                        </td>
                    </tr>
                </table>
            </form>
            <ToastContainer />
        </div>
    )

}

export default Home