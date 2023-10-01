import { Button, Form, Input, Layout, Modal, Select } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Swal from 'sweetalert2';
const { Option } = Select;


const FormPage = ({ showStudentForm, setShowStudentForm, getStudentData, onEdit, editData }) => {

    // const [showStudentForm, setShowStudentForm] = useState()
    const [formData, setFormData] = useState({
        RollNo: '',
        FirstName: '',
        LastName: '',
        Address: '',
        Subject: '',
        Gender: 'male',
        Photo: ''
    })

    useEffect(() => {
        if(editData) {
            debugger
            setFormData((prev) => {
                return({
                    ...prev,
                    RollNo: editData?.RollNo,
                    FirstName: '',
                    LastName: '',
                    Address: '',
                    Subject: '',
                    Gender: 'male',
                    Photo: ''
                })
            })
            setFormData(editData)
        }
    }, [editData])

    const handleChange = (e) => {
        debugger
        let value = e.target.value.toUpperCase()
        setFormData((prev) => {
            return({
                ...prev,
                [e.target.name]: value
            })
        })
    }

    const onFinish = async () => {
        try {
            debugger

            if(formData._id) {
                const response = await axios.put(`http://localhost:2000/updatestudentdata/${formData._id}`, formData, {});
                console.log('Response from backend:', response.data);
                if(response.data.status === "success") {
                  Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.data.msg,
                  });
                } else {
                  Swal.fire({
                    icon: 'Error',
                    title: 'Error!',
                    text: response.data.msg,
                  });
                }
                setShowStudentForm(false);
                getStudentData();
            } else {
                const response = await axios.post(`http://localhost:2000/poststudentdata`, formData, {})
                console.log('Response from backend:', response.data);
                if(response.data.status==="success") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: response.data.msg,
                    });
                } else {
                    Swal.fire({
                        icon: 'Error',
                        title: 'Error!',
                        text: response.data.msg,
                    });
                }
                setShowStudentForm(false);
                getStudentData()
            }

        } catch (error) {
            Swal.fire({
                icon: 'Error',
                title: 'Error!',
                text: error,
            });
        }
    }

    return (
        <>
            <Layout>
                <Modal
                    width={800}
                    title='Student form' 
                    visible={showStudentForm}
                    onCancel={() => setShowStudentForm(false)}
                    footer={false}
                >
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item label='Roll No:' name='RollNo'>
                            <Input
                                type="text"
                                name='RollNo'
                                value={formData?.RollNo} 
                                onChange={handleChange}
                                // placeholder="Roll No"
                            />  
                        </Form.Item>
                        <Form.Item label='First Name:' name='FirstName'>
                            <Input 
                                type="text" 
                                name='FirstName'
                                value={formData?.FirstName} 
                                onChange={handleChange}
                                // placeholder="First Name"
                            />
                        </Form.Item>
                        <Form.Item label='Last Name:' name='LastName'>
                            <Input 
                                type="text"
                                name='LastName'
                                value={formData?.LastName} 
                                onChange={handleChange}
                                // placeholder="Last Name"
                            />
                        </Form.Item>
                        <Form.Item label='Address:' name='Address'>
                            <Input 
                                type="text"
                                name='Address'
                                value={formData?.Address} 
                                onChange={handleChange}
                                // placeholder="Address"
                            />
                        </Form.Item>
                        <Form.Item label='Subject:' name='Subject'>
                            <Input 
                                type="text"
                                name='Subject'
                                value={formData?.Subject} 
                                onChange={handleChange}
                                // placeholder="Subject"
                            />
                        </Form.Item>
                        <Form.Item label='Gender:' name='Gender'>
                            <Select defaultValue="male" value={formData?.Gender} onChange={handleChange}>
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label='Photo:' name='Photo'>
                            <Input 
                                type="file"
                                name='Photo'
                                value={formData?.Photo} 
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <div>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">save</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
            </Layout>
        </>
    )
}

export default FormPage
