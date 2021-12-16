import React from "react";
import {Card} from "antd";
import laptop from "../../images/laptop.jpg"
import { EditOutlined,DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const {Meta} =Card;
const AdminProductCard=({product,handleRemove})=>{
    const{title,description,images,slug}=product;

return ( 
<Card cover={<img src={images.length?images[0].url:laptop} style={{ height: "150px", objectFit: "cover" }}
          className="m-2"/>}
          actions={[
          <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning"/>
          </Link>,
          <DeleteOutlined 
          onClick={()=>handleRemove(slug)} className="text-danger"
          />]}
           >
    <Meta title={title} description={`${description&&description.substring(0,50)}...`}/>
</Card>

)};
export default AdminProductCard;