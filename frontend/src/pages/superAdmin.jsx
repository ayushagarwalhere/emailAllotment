import AdminForm from "../components/adminForm";  
import NavbarSuperAdmin from "../components/superAdminNavbar";

function SuperAdmin() {
    return(
        <>
            <NavbarSuperAdmin/>
            <h1 className="mt-20 font-bold text-3xl">This is superadmin route </h1>
        </>

    )
}

export default SuperAdmin