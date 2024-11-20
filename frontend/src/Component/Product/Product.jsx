import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import queryString from 'query-string'
import axios from "axios";


function Product() {
    const [products, setProducts] = useState([]);

    // Fetch products from API
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/products")
        .then((response) => {
          setProducts(response.data.products); // Assuming the API returns an array of products
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }, []);
    const handleDelete = (id)=>{
        axios.delete(`http://localhost:5000/api/products/${id}`)
       .then((response) => {
            console.log(response);
            alert("Product was deleted successfully");
            window.location.reload(); // Tải lại trang
       })
       .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
    
    return (
        <div className="page-wrapper" style={{  width:"100%" }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Products</h4>
                               

                                <Link to="/admin/products/create" className="btn btn-primary my-3">New create</Link>

                                <div className="table-responsive" style={{ overflow: 'scroll', height: '650px', width:"100%" }}>
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Image</th>
                                                <th>Describe</th>
                                                {/* <th>Producer</th> */}
                                                <th>Category</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                products && products.map((value, index) => (
                                                    <tr key={index}>
                                                        <td className="name">{value._id}</td>
                                                        <td className="name">{value.name}</td>
                                                        <td>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(value.price)+ ' VNĐ'}</td>
                                                        <td><img src={value.urlimg} alt="" style={{ width: '70px' }} /></td>
                                                        <td className="name" style={{ width: '40px' }}>{value.description}</td>
                                                        <td>{value.category}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Link to={`/admin/products/update/${value._id}`} className="btn btn-success mr-1">Update</Link>

                                                                <button type="button" style={{ cursor: 'pointer', color: 'white' }} onClick={() => handleDelete(value._id)}  className="btn btn-danger" >Delete</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;