import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import SecondaryLayout from "../layout/SecondaryLayout";
import Error from "../pages/404/Error";
import Sales from "../pages/Sales/Sales";
import ForgetPassword from "../pages/authentication/ForgetPassword";
import Login from "../pages/authentication/Login";
import ResetPassword from "../pages/authentication/ResetPassword";
import Signup from "../pages/authentication/Signup";
import BuySupplies from "../pages/buySupplies/BuySupplies";
import Categories from "../pages/categories/Categories";
import Customer from "../pages/customer/Customer";
import Expenses from "../pages/expenses/Expenses";
import BuySuppliesForm from "../pages/forms/BuySuppliesForm";
import BuySuppliesView from "../pages/forms/BuySuppliesView";
import CategoryForm from "../pages/forms/CategoryForm";
import CustomerForm from "../pages/forms/CustomerForm";
import EditProfile from "../pages/forms/EditProfile";
import ExpensesForm from "../pages/forms/ExpensesForm";
import InventoryForm from "../pages/forms/InventoryForm";
import InventoryUpdateForm from "../pages/forms/InventoryUpdateForm";
import MoneyOwedForm from "../pages/forms/MoneyOwedForm";
import ProductsForm from "../pages/forms/ProductsForm";
import SalesForm from "../pages/forms/SalesForm";
import StoreForm from "../pages/forms/StoreForm";
import SupplierForm from "../pages/forms/SupplierForm";
import UnitForm from "../pages/forms/UnitForm";
import Home from "../pages/home/Home";
import Inventory from "../pages/inventory/Inventory";
import Money from "../pages/money/Money";
import Products from "../pages/products/Products";
import Profile from "../pages/profile/Profile";
import Store from "../pages/store/Store";
import StoreDetails from "../pages/store/StoreDetails";
import StoreFinancial from "../pages/store/StoreFinancial";
import Suppliers from "../pages/supplier/Suppliers";
import Unit from "../pages/unit/Unit";
import PrivateRouter from "./PrivateRouter";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <Layout></Layout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/customer",
        element: <Customer></Customer>,
      },
      {
        path: "/expenses",
        element: <Expenses></Expenses>,
      },
      {
        path: "/inventory",
        element: <Inventory></Inventory>,
      },
      {
        path: "/moneyOwed",
        element: <Money></Money>,
      },
      {
        path: "/sales",
        element: <Sales></Sales>,
      },
      {
        path: "/stores-settings",
        element: <Store></Store>,
      },
      {
        path: "/suppliers",
        element: <Suppliers></Suppliers>,
      },
      {
        path: "/supplies",
        element: <BuySupplies></BuySupplies>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/inventory-add",
        element: <InventoryForm></InventoryForm>,
      },
      {
        path: "/inventory-edit",
        element: <InventoryUpdateForm></InventoryUpdateForm>,
      },
      {
        path: "/sales-add",
        element: <SalesForm></SalesForm>,
      },
      {
        path: "/sales-edit",
        element: <SalesForm></SalesForm>,
      },
      {
        path: "/customer-add",
        element: <CustomerForm></CustomerForm>,
      },
      {
        path: "/customer-edit",
        element: <CustomerForm></CustomerForm>,
      },
      {
        path: "/expenses-add",
        element: <ExpensesForm></ExpensesForm>,
      },
      {
        path: "/expenses-edit",
        element: <ExpensesForm></ExpensesForm>,
      },
      {
        path: "/moneyOwed-add",
        element: <MoneyOwedForm></MoneyOwedForm>,
      },
      {
        path: "/moneyOwed-edit",
        element: <MoneyOwedForm></MoneyOwedForm>,
      },
      {
        path: "/store-add",
        element: <StoreForm></StoreForm>,
      },
      {
        path: "/store-details",
        element: <StoreDetails></StoreDetails>,
      },
      {
        path: "/supplier-add",
        element: <SupplierForm></SupplierForm>,
      },
      {
        path: "/supplier-edit",
        element: <SupplierForm></SupplierForm>,
      },
      {
        path: "/categories",
        element: <Categories></Categories>,
      },
      {
        path: "/category-add",
        element: <CategoryForm></CategoryForm>,
      },
      {
        path: "/category-edit",
        element: <CategoryForm></CategoryForm>,
      },
      {
        path: "/unit",
        element: <Unit></Unit>,
      },
      {
        path: "/unit-add",
        element: <UnitForm></UnitForm>,
      },
      {
        path: "/unit-edit",
        element: <UnitForm></UnitForm>,
      },
      {
        path: "/products-add",
        element: <ProductsForm></ProductsForm>,
      },
      {
        path: "/products-edit",
        element: <ProductsForm></ProductsForm>,
      },
      {
        path: "/supplies-add",
        element: <BuySuppliesForm></BuySuppliesForm>,
      },
      {
        path: "/supplies-details",
        element: <BuySuppliesView></BuySuppliesView>,
      },
      {
        path: "/stores-financial",
        element: <StoreFinancial></StoreFinancial>,
      },
      // {
      //   path: "/store-details",
      //   element: <StoreDetails></StoreDetails>,
      // },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRouter>
        <SecondaryLayout></SecondaryLayout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/edit-profile",
        element: <EditProfile></EditProfile>,
      },
    ],
  },
  // {
  //   path: "/register",
  //   element: <Register></Register>,
  // },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword></ForgetPassword>,
  },
  {
    path: "/eyJhbGciOiJIUzI1NiIsInR5/:email",
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);
