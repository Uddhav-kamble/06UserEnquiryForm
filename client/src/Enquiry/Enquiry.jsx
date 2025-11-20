import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.js'
import { useEffect } from 'react';


function Enquiry() {

    let deleteRow = (delid) => {

        Swal.fire({
            title: "Do you want to Delete the Data?",
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/website/enquiry/delete/${delid}`)
                .then((res) => {
                    toast.success("Enquiry Deleted Successfully")
                    getAllenquiry()
                })
            } 
            
            else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

        // alert(delid)
    }


    let [enquiryList, setEnquiryList] = useState([])
    let [formData, setFormData] = useState({
            name:'',
            email:'',
            phone:'',
            message:'',
            _id:''
    })



    let saveEnquiry = (e) => {

        e.preventDefault()

        // Update
        if(formData._id){
            axios.put(`http://localhost:8000/api/website/enquiry/update/${formData._id}`, formData)
            .then((res) => {
                toast.success('Enquiry Updated Successfully')
                setFormData({
                    name:'',
                    email:'',
                    phone:'',
                    message:'',
                    _id:''
                })
                getAllenquiry()
            })
        }

        // Save
        else{
            axios.post("http://localhost:8000/api/website/enquiry/insert",formData)
            .then((res) => {
                console.log(res.data)
                toast.success("Enquiry Saved Successfully")

                setFormData({
                    name:'',
                    email:'',
                    phone:'',
                    message:''
                })
             
            })
        }
        getAllenquiry()
    }


    let getAllenquiry = () => {
        axios.get('http://localhost:8000/api/website/enquiry/view')
        .then((res) => {
            return res.data //finalData
        })
        .then((finalData) => {
            if(finalData.status){
                setEnquiryList(finalData.enquiryList) // enquiryList
            }
        })
    }


    let getValue = (e) => {
        let inputName = e.target.name   // name, email, phone, message
        let inputvalue = e.target.value
        let oldData = {...formData}

        oldData[inputName]=inputvalue
        setFormData(oldData)
    }

    useEffect(() => {
        getAllenquiry()
    },[])



    let editRow = (editid) => {
        axios.get(`http://localhost:8000/api/website/enquiry/single/${editid}`)
        .then((res) => {
            let data = res.data.enquiry
            setFormData(data)
            getAllenquiry()
        })
    }


  return (
    <div>
        <ToastContainer></ToastContainer>
        <h1 className='text-center'>User Enquiry</h1>
        <div className='d-flex'>
            
            <div className='mt-2 col-4 bg-dark-subtle'>
                <h5 className='mt-2 ms-2'>Enquiry Form</h5>
                <form onSubmit={saveEnquiry} className=" container col  text-dark ">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" value={formData.name} onChange={getValue} name='name' className="form-control" placeholder="UserName"></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" value={formData.email} onChange={getValue} name='email' className="form-control"  placeholder="name@example.com"></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="number" value={formData.phone} onChange={getValue} name='phone' className="form-control"  placeholder="Phone Number"></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea name='message' value={formData.message} onChange={getValue} className="form-control" rows="3"></textarea>
                    </div>
                    <div className="mb-3 text-center">
                        <button type="submit" class="btn btn-light">
                            {formData._id ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>

            {/* User Data */}
            <div className='mt-2 ms-4 col bg-dark-subtle '>
                <h5 className='ms-3 mt-2 mb-0'>Enquiry List</h5>
                <div className='col p-3'>
                    <table className=" table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">SR. NO.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone No.</th>
                                <th scope="col">Message</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                enquiryList.length>=1 ?
                                    enquiryList.map((item,index) => {
                                        return(<tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.message}</td>
                                                <td className='text-primary'>
                                                    <button  onClick={() => deleteRow(item._id)} type="button" class="btn btn-danger">Delete</button>
                                                </td>
                                                <td className='text-primary'>
                                                    <button  onClick={() => editRow(item._id)} type="button" class="btn btn-primary">Edit</button>
                                                </td>
                                               </tr>)
                                    })
                                :
                                <tr>
                                    <td>No Data Found</td>
                                </tr> 
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      
    </div>
  )

}
export default Enquiry