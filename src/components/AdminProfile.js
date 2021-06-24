import { BrowserRouter,Switch,Link,Route } from 'react-router-dom'
import AddProduct from './AddProduct'
import ViewProducts from './ViewProducts'


function AdminProfile(){
    return(
        <BrowserRouter>
        <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
                <Link to="/addproduct" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Add product</Link>
            </li>
            <li class="nav-item">
                <Link to="/viewproducts" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">View products</Link>
            </li>

        </ul>
        <Switch>
            <Route path="/addproduct">
                <AddProduct />
            </Route>
            <Route path="/viewproducts">
                <ViewProducts />
            </Route>
        </Switch>
        </BrowserRouter>
    )
}
export default AdminProfile;