import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Column } from 'primereact/column';
import { Dialog } from "primereact/dialog";
import { FaSearch } from "react-icons/fa";
import UserForm from './UserForm';
import axios from "axios"
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserList = () => {
    const toast = useRef(null);
    const [users, setUsers] = useState([])
    const [dialogueOpen, setOpenDialogue] = useState(false)
    const [editDialogueOpen, setOpenEditDialogue] = useState(false)
    const [globalFilter, setGlobalFilter] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null);

    const onOpenUserDailog = () => {
        setOpenDialogue(true)
    }

    const onHideDialogue = () => {
        setOpenDialogue(false)
    }

    const onHideEditDialogue=()=>{
        setOpenEditDialogue(false)
    }

    const renderHeader = () => (
        <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Users List</h2>
            <div>
                <Button className="btn btn-primary" onClick={onOpenUserDailog}>+ Add User</Button>
            </div>

            <div className="search-bar">
                <form className="search-form d-flex align-items-center">
                    <input type="text" name="query" autoComplete="off" placeholder="Search" title="Enter search keyword" onInput={(e) => setGlobalFilter(e.target.value)} />
                    <button disabled={true}>
                        <FaSearch />
                    </button>
                </form>
            </div>

        </div>
    );

    useEffect(() => {
        getUsers()
    }, [])


    const getUsers = () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    };

    const onEditUser=(rowData)=>{
        setOpenEditDialogue(true)
        setSelectedUser(rowData);
    }

    const onDelete=()=>{

    }

    const actionBodyTemplate = (rowData) => {
        return <center>
            <span>
                <AiOutlineEdit title="Edit" onClick={() => onEditUser(rowData)}  style={{ color: 'green', fontSize: '25px', cursor: 'pointer', marginLeft: '15px' }} />
                <AiOutlineDelete title="Delete" onClick={() => onDelete(rowData.id)} style={{ color: 'red', fontSize: '25px', cursor: 'pointer', marginLeft: '15px' }} />
            </span>
        </center>;
    }

    return (
        <div className='m-2 p-5' style={{ backgroundColor: "whiteSmoke", height: "100vh" }}>
            <Toast ref={toast} />
            <DataTable value={users} paginator className="p-datatable" showGridlines rows={8} header={renderHeader()} paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" dataKey="id"
                rowHover filterDisplay="menu" globalFilter={globalFilter} globalFilterFields={['name', 'username', 'email', 'website']} emptyMessage="No Records found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} user entries">
                <Column field="name" header="Name" headerStyle={{ backgroundColor: '#e0e0e0', border: '1px solid #ccc' }} bodyStyle={{ border: '1px solid #ccc' }} />
                <Column field="email" header="Email" headerStyle={{ backgroundColor: '#e0e0e0', border: '1px solid #ccc' }} bodyStyle={{ border: '1px solid #ccc' }} />
                <Column field="website" header="Webiste" headerStyle={{ backgroundColor: '#e0e0e0', border: '1px solid #ccc' }} bodyStyle={{ border: '1px solid #ccc' }} />
                <Column field="phone" header="Mobile Number" headerStyle={{ backgroundColor: '#e0e0e0', border: '1px solid #ccc' }} bodyStyle={{ border: '1px solid #ccc' }} />
                <Column body={actionBodyTemplate} header="Actions" headerStyle={{ backgroundColor: '#e0e0e0', border: '1px solid #ccc' }} bodyStyle={{ border: '1px solid #ccc' }} />

            </DataTable>

            < Dialog visible={dialogueOpen} style={{ width: '40vw' }} onHide={onHideDialogue} header={<h2>ADD USER</h2>} >
                <UserForm onClose={onHideDialogue} />
            </Dialog>

            < Dialog visible={editDialogueOpen} style={{ width: '40vw' }} onHide={onHideEditDialogue} header={<h2>UPDATE USER</h2>} >
                <UserForm  user={selectedUser} onClose={onHideEditDialogue}/>
            </Dialog>

        </div>
    )
}
export default UserList;