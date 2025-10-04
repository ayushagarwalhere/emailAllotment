import Navbar1 from "../components/navbarAdmin1";
import NavbarAdmin from "../components/navbarAdmin1";

function AdminPage() {
  const adminName = "ADMIN-NAME"; 

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />

      <main className="pt-20 px-6 sm:px-12">
        <section className="max-w-4xl mx-auto bg-white rounded-md shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800">hey, {adminName}</h1>
          <p className="mt-4 text-gray-600">Welcome to the admin panel. Use the navigation above to manage students and forms.</p>
        </section>
      </main>
    </div>
  );
}

export default AdminPage;
