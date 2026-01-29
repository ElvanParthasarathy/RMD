import { X } from 'lucide-react';

function BrochureModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full relative animate-in zoom-in-95 duration-300 overflow-hidden">
                {/* Header/Close */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 text-center">
                    {/* Image Map Area - Replaced with functional buttons/links for responsive design */}
                    <div className="mb-6">
                        <img
                            src="https://rmd.ac.in/images/rmd2025.jpg"
                            alt="RMD 2025"
                            className="mx-auto rounded-lg max-h-[300px] object-contain"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                        {/*
                            Original HTML had an image map for Admission Enquiry and Pamphlets.
                            We will replicate these as buttons below the image for better UX.
                        */}
                        <div className="flex justify-center gap-4 mt-4 flex-wrap">
                            <a
                                href="https://www.rmkec.ac.in/admission2024/sendotp1.php"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                            >
                                Online Admission Enquiry
                            </a>
                            <a
                                href="https://rmd.ac.in/index.html#"
                                className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition"
                            >
                                Pamphlets
                            </a>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-xl font-bold text-[#C21541] mb-6 flex items-center justify-center gap-2">
                            DEPARTMENT-WISE BROCHURE
                            {/* <img src="https://rmd.ac.in/images/new.png" alt="New" className="h-8 w-8" /> */}
                            <span className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded animate-pulse">NEW</span>
                        </h3>

                        <div className="flex flex-wrap justify-center gap-3">
                            <a href="https://rmd.ac.in/Pamphlet/2023/CSE.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-cyan-500 text-white rounded font-bold hover:bg-cyan-600 shadow-md transition-transform hover:scale-105">CSE</a>
                            <a href="https://rmd.ac.in/Pamphlet/2023/ECE.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-500 text-white rounded font-bold hover:bg-green-600 shadow-md transition-transform hover:scale-105">ECE</a>
                            <a href="https://rmd.ac.in/Pamphlet/2023/IT.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-yellow-500 text-white rounded font-bold hover:bg-yellow-600 shadow-md transition-transform hover:scale-105">IT</a>
                            <a href="https://rmd.ac.in/Pamphlet/2023/AIML.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-red-500 text-white rounded font-bold hover:bg-red-600 shadow-md transition-transform hover:scale-105">AIML</a>
                            <a href="https://rmd.ac.in/Pamphlet/2023/CSBS.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-cyan-600 text-white rounded font-bold hover:bg-cyan-700 shadow-md transition-transform hover:scale-105">CSBS</a>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BrochureModal;
