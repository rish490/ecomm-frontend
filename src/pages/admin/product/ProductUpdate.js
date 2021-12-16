import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct, getProductsByCount } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { getProduct,updateProduct } from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { triggerFocus } from "antd/lib/input/Input";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],  
  color: "",
  brand: "",
};
const ProductUpdate = ({match,history}) => {
  const [values, setValues] = useState(initialState);
  const [categories,setCategories]=useState([]);
  const [subOptions,setSubOptions]=useState([]);
  const [arrayOfSubs,setArrayOfSubIds]=useState([]);
  const [selectedCategory,setSelectedCategory]=useState("");
  const [loading, setLoading] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));
const {slug}=match.params;
 useEffect(()=>{
   loadProduct();
   loadCategories();
 },[])
 const loadProduct=()=>{
   getProduct(slug)
   .then((p)=>{
    //console.log("single product",p);
   //step 1 load single product
     setValues({...values,...p.data});
     //step 2 load single product category subs
     getCategorySubs(p.data.category._id).then((res)=>{
       setSubOptions(res.data);
     });
     //step 3 prepare array of sub ids to show as default sub values in antd select 
     let arr=[];
     p.data.subs.map((s)=>{
       arr.push(s._id);
     })
     console.log("ARR",arr);
     setArrayOfSubIds((prev)=>arr); //required for antd select to work  
   });
 }
 const loadCategories = () =>
    getCategories().then((c) => {
      console.log(c.data);
      setCategories(c.data);
    } );

const handleSubmit=(e)=>{
  e.preventDefault();
  setLoading(true);
  values.subs=arrayOfSubs;
  values.category=selectedCategory?selectedCategory:values.category;
  updateProduct(slug,values,user.token)
  .then((res)=>{
    setLoading(false);
    toast.success(`${res.data.title} has been updated`);
    history.push("/admin/products");

  })
  .catch((err)=>{
    console.log(err);
    setLoading(false);
    toast.error(err.response.data.err);

  });

};
const handleChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value });
};
const handleCategoryChange = (e) => {
  e.preventDefault();
  console.log("CLICKED CATEGORY", e.target.value);
  setValues({ ...values, subs: []});
  setSelectedCategory(e.target.value);
  getCategorySubs(e.target.value).then((res) => {
    console.log("SUB OPTIONS ON CATEGORY CLICK", res);
    setSubOptions(res.data);
  });
  console.log("EXISTING CATEGORY values.category",values.category);
//if user clicks back to the original category show its sub categories in default 
if(values.category._id===e.target.value){
  loadProduct();
}
else{
setArrayOfSubIds([]);
}
};
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
        {loading?(
          <LoadingOutlined className="text-danger h1" />
        ):(
          <h4>Product Update</h4>
        )}
        {JSON.stringify(values)}
        <h4>Product update</h4>
        <div className="p-3">
        <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
            </div>
        <ProductUpdateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setValues={setValues}
        values={values} 
        handleCategoryChange={handleCategoryChange}
        categories={categories}
        subOptions={subOptions}
        arrayOfSubs={arrayOfSubs}
        setArrayOfSubIds={setArrayOfSubIds}
        selectedCategory={selectedCategory}
        />
          <hr />

         
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
