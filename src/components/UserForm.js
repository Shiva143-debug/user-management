
import { InputText } from 'primereact/inputtext';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from "axios"

const UserForm = ({  user, onClose }) => {
    const toast = useRef(null);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', website: '', });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const validate = (formData) => {
        const errors = [];
        if (formData.name === "") {
            errors.push("Please Enter  Name");
        }
        else if (formData.phone === "") {
            errors.push("Please Enter Mobile Number");
        }
        else if (formData.email === "") {
            errors.push("Please Enter Email");
        }
        else if (formData.website === "") {
            errors.push("Please Enter Website");
        }
        return errors;
    }

    const handleSubmit = async (e) => {
        const errors = validate(formData);
        if (errors.length > 0) {
            toast.current.show(errors.map((msg) => ({ severity: "warn", summary: "Warning", detail: msg, life: 3000 })));
            return;
        } try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
            console.log(response.data);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'User Added successfully!', life: 10000, });
            setFormData({ name: '', phone: '', email: '', website: '' });
            // onClose();
        } catch (error) {
            console.error(error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving the data. Please try again.', life: 3000, });
        }

    };

    const onHideDialogue = () => {
        onClose()
    }

    return (
        <Card  className="card p-4" >
            <Toast ref={toast} />
            
            <div className='row '>
                <div className='col-4 mt-2'>
                    <p style={{ float: 'left', fontWeight: "bold" }}>Name<span style={{ color: "red" }} >*</span>:</p>
                </div>
                <div className='col-8 mb-2'>
                    <InputText name="name" value={formData.name} onChange={handleChange} placeholder='Enter Name' style={{ width: "400px" }} />
                </div>
            </div>

            <div className='row'>
                <div className='col-4 mt-2'>
                    <p style={{ float: 'left', fontWeight: "bold" }}>Email<span style={{ color: "red" }} >*</span>:</p>
                </div>
                <div className='col-8 mb-2'>
                    <InputText name="email" value={formData.email} onChange={handleChange} placeholder='Enter Email' style={{ width: "400px" }} />
                </div>
            </div>

            <div className='row'>
                <div className='col-4 mt-2'>
                    <p style={{ float: 'left', fontWeight: "bold" }}>Webiste<span style={{ color: "red" }} >*</span>:</p>
                </div>
                <div className='col-8 mb-2'>
                    <InputText name="website" value={formData.website} onChange={handleChange} placeholder='Enter Website' style={{ width: "400px" }} />
                </div>
            </div>

            <div className='row'>
                <div className='col-4 mt-2'>
                    <p style={{ float: 'left', fontWeight: "bold" }}>Mobile Number<span style={{ color: "red" }} >*</span>:</p>
                </div>
                <div className='col-8 mb-2'>
                    <InputText name="phone" value={formData.phone} onChange={handleChange} placeholder='Enter Mobile Number' style={{ width: "400px" }} />
                </div>
            </div>


            <div style={{ borderRadius: '25px' }} className='mt-3'>
                <Button variant="secondary" style={{ borderRadius: '25px', cursor: 'pointer', float: "left" }} onClick={onHideDialogue} >Close</Button>
                <Button variant="success" style={{ borderRadius: '25px', cursor: 'pointer', float: "right" }} onClick={handleSubmit}>Submit</Button>
            </div>
        </Card>

    );
};

export default UserForm;
