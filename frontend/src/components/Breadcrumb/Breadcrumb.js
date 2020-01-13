import React, {useEffect, useState} from 'react';
import './Breadcrumb.scss';

const Breadcrumb = props => {
    const [category, setCategories] = useState(null)

    useEffect(() => {
        if(props.data !== null){
            setCategories(props.data)
        }
        
    }, [props.data]);

    const BreadcrumbList = props => {
        if(category.path_from_root){
            return  category.path_from_root.map((item, index) => {
                return <li key={index}><span>{item.name}</span></li>
            })
        } else {
            return  <li><span>{category.name}</span></li>
        }  
    }

    if(category) {
        return <div className="Breadcrumb">
                    <div className="container">
                        <ul><BreadcrumbList /></ul>
                    </div>
                </div>
    } else{
        return null;
    }

}

export default Breadcrumb;