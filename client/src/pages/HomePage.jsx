import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Button, Col, Modal, Row, Space, Table, message } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import FormPage from "./FormPage";

const HomePage = () => {

    const [showStudentForm, setShowStudentForm] = useState()
    const [ studentData, setStudentData ] = useState([])
    const [editData, setEditData] = useState(null);
    // const [deleteData, setDeleteData] = useState(null);

    const getStudentData = async () => {
        try {
            const response = await axios.get("http://localhost:2000/getstudentdata", ) 
            console.log("API Response:", response.data.data);
            setStudentData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    console.log('studentData', studentData)

    useEffect(() => {
        getStudentData()
    }, [])

    const handleEdit = (record) => {
        setEditData(record);
        setShowStudentForm(true);
    };
    
    const handleDelete = (record) => {
        // Handle delete action here, e.g., show a confirmation modal before deletion
        console.log('Delete:', record);
        Modal.confirm({
            title: 'Confirm Deletion',
            icon: <ExclamationCircleOutlined />,
            content: `Are you sure you want to delete student ${record.FirstName} ${record.LastName}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    const response = await axios.delete(`http://localhost:2000/deletestudentdata/${record._id}`);
                    console.log('Response from backend:', response.data);
                    if (response.data.status === "success") {
                        message.success('Student deleted successfully');
                        getStudentData(); // Refresh the student data after deletion
                    } else {
                        message.error('Failed to delete student');
                    }
                } catch (error) {
                    console.error(error);
                    message.error('An error occurred while deleting the student');
                }
            },
        });
    };

    const columns = [
        {
            title: "RollNo",
            dataIndex: "RollNo",
            key: "RollNo",
        },
        {
            title: 'Photo',
            dataIndex: 'Photo', 
            key: 'Photo',
            render: (Photo) => (
              <img src={Photo} alt="User Photo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            ),
        },
        {
            title: "FirstName",
            dataIndex: "FirstName",
            key: "FirstName" ,
        },
        {
            title: "LastName",
            dataIndex: "LastName",
            key: "LastName",
        },
        {
            title: "Address",
            dataIndex: "Address",
            key: "Address",
        },
        {
            title: "Subject",
            dataIndex: "Subject",
            key: "Subject",
        },
        {
            title: "Gender",
            dataIndex: "Gender",
            key: "Gender",
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <EditOutlined
                  onClick={() => handleEdit(record)} 
                  style={{ cursor: 'pointer' }}
                />
                <DeleteOutlined
                  onClick={() => handleDelete(record)} 
                  style={{ color: 'red', cursor: 'pointer' }}
                />
              </Space>
            ),
          },
       
    ]

    return ( 
        <>
            <p>Homepage where all student data show</p>
            <Button
                onClick={() => {
                    setEditData(null)
                    setShowStudentForm(true)
                }
                }
                type="primary"
            > +
            </Button>
            <Table
                columns={columns}
                dataSource={studentData}
            />
            {
                showStudentForm && (
                    <FormPage
                        showStudentForm={true} 
                        setShowStudentForm={setShowStudentForm} 
                        getStudentData={getStudentData}
                        onEdit={handleEdit}
                        editData={editData}
                        // deleteData={deleteData}
                    />
                )
            }
            
        </>
     );
}
 
export default HomePage;