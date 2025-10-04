import Navbar from "../components/Navbar";

function FormsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-20 px-6 sm:px-12">
        <section className="max-w-5xl mx-auto bg-white rounded-md shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800">FORMS ~</h1>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-24">
            <div className="border border-gray-200 rounded p-4 bg-white">
              <h3 className="font-semibold">B.tech Form</h3>
              <p className="text-sm text-gray-500 mt-2">Placeholder for B.tech form details</p>
            </div>

            <div className="border border-gray-200 rounded p-4 bg-white">
              <h3 className="font-semibold">M.tech Form</h3>
              <p className="text-sm text-gray-500 mt-2">Placeholder for M.tech form details</p>
            </div>

              <div className="border border-gray-200 rounded p-4 bg-white">
              <h3 className="font-semibold">PhD Form</h3>
              <p className="text-sm text-gray-500 mt-2">Placeholder for PhD form details</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FormsPage;
