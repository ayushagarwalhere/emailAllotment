import InutPlace from "./inputPlace";

function InfoCard(){
    return(
        <div className="bg-gray-100 shadow-md p-6 sm:p-10 rounded-2xl mx-auto max-w-[700px] mt-1 flex flex-col items-center">
           
            <h2 className="font-bold text-black text-xl mb-6 sm:w-[400px] text-center">Your Information</h2>
            <div className="space-y-4 w-full px-4  ">
                <InutPlace placeholder="Name">Name</InutPlace>
                <InutPlace placeholder="Branch">Branch</InutPlace>
                <InutPlace placeholder="Roll Number">Roll Number</InutPlace>
                <InutPlace placeholder="Email">Input Place</InutPlace>
                <InutPlace placeholder="Phone Number">Phone Number</InutPlace>
            </div>
            <button className="mt-6 bg-gray-800 text-white font-semibold py-3 px-3 rounded-lg items-center justify-center hover:bg-gray-900 ">
                Fill form to generate request 
            </button>
        </div>
    )
}
export default InfoCard